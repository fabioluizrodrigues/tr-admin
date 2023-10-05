import { AppConstants } from '@/lib/constants';
import { db } from '@/lib/db.server'
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const url = new URL(req.url);
    
    const page = Number(url.searchParams.get('page'));
    const limit = Number(url.searchParams.get('limit')) || AppConstants.NR_REGISTRO_POR_PAGINA;
    const filter = url.searchParams.get('filter');

    const pageSkip = (page) ? (page / limit) + 1 : 0;
 
    try {
        const pessoas = await db.pessoa.findMany({
            skip: pageSkip,
            take: limit,            
            where: {
                ...(filter ? {
                    OR : [
                        {nome_razao: { contains: filter, mode: 'insensitive' }},
                        {cnpj_cpf: { startsWith: filter }},
                        {municipio: { contains: filter, mode: 'insensitive' }},
                        {uf: { equals: filter }},
                    ]
                } : {}),
            },            
            orderBy: {
                createdAt: 'desc'
            },
        });

        const countPessoas = await db.pessoa.count({
            where: {
                ...(filter ? {
                    OR : [
                        {nome_razao: { contains: filter, mode: 'insensitive' }},
                        {cnpj_cpf: { startsWith: filter }},
                        {municipio: { contains: filter, mode: 'insensitive' }},
                        {uf: { equals: filter }},
                    ]
                } : {}),
            },
        })

        return NextResponse.json({
            pessoas,
            total: countPessoas
        }, { 
            status: StatusCodes.OK
        });
    } catch (error) {
        return NextResponse.json({ message: 'Não foi possivel carregar os registros.'}, { status: StatusCodes.BAD_REQUEST});
    }
}