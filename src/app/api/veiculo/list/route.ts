import { AppConstants } from '@/lib/constants';
import { db } from '@/lib/db.server'
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const url = new URL(req.url);
   
    const page = Number(url.searchParams.get('page'));
    const limit = Number(url.searchParams.get('limit')) || AppConstants.NR_REGISTRO_POR_PAGINA;
    const filter = String(url.searchParams.get('filter'));

    const pageSkip = (page) ? (page / limit) + 1 : 0;
 
    try {
        const veiculos = await db.veiculo.findMany({
            skip: pageSkip,
            take: limit,            
            where: {
                ...(filter ? {
                    OR : [
                        {placa: { contains: filter, mode: 'insensitive' }},
                        {renavam: { startsWith: filter }},
                        {marca: { contains: filter, mode: 'insensitive' }},
                        {modelo: { contains: filter, mode: 'insensitive' }},
                    ]
                } : {}),
            },            
            orderBy: {
                createdAt: 'desc'
            },
        });

        const countVeiculos = await db.veiculo.count({
            where: {
                ...(filter ? {
                    OR : [
                        {placa: { contains: filter, mode: 'insensitive' }},
                        {renavam: { startsWith: filter }},
                        {marca: { contains: filter, mode: 'insensitive' }},
                        {modelo: { contains: filter, mode: 'insensitive' }},
                    ]
                } : {}),
            },
        })

        return NextResponse.json({
            veiculos,
            total: countVeiculos
        }, { 
            status: StatusCodes.OK
        });
    } catch (error) {
        return NextResponse.json({ message: 'Não foi possivel carregar os registros.'}, { status: StatusCodes.BAD_REQUEST});
    }
}