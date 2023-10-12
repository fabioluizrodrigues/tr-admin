import { AppConstants } from '@/lib/constants';
import { db } from '@/lib/db.server'
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const url = new URL(req.url);
   
    const page = Number(url.searchParams.get('page'))
    const limit = Number(url.searchParams.get('limit')) || AppConstants.NR_REGISTRO_POR_PAGINA;
    const filter = String(url.searchParams.get('filter'));

    const pageSkip = (page) ? (page / limit) + 1 : 0;
 
    try {
        const fretes = await db.frete.findMany({
            skip: pageSkip,
            take: limit,
            include: {
                motorista: {
                    select: {
                        id: true,
                        nome_razao: true,
                        cnpj_cpf: true
                    }
                },
                cavalo: { select: { placa: true }},
                reboque1: { select: { placa: true }},
                reboque2: { select: { placa: true }},
                reboque3: { select: { placa: true }},
                cliente: {
                    select: {
                        id: true,
                        nome_razao: true,
                        cnpj_cpf: true
                    }
                },
            },
            where: {
                motorista: {
                    ...(filter ? {
                        OR : [
                            {nome_razao: { contains: filter, mode: 'insensitive' }},
                            {cnpj_cpf: { startsWith: filter }},
                            {municipio: { contains: filter, mode: 'insensitive' }},
                            {uf: { equals: filter }},
                        ]
                    } : {}),
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
        });

        const countFretes = await db.frete.count({
            where: {
                motorista: {
                    ...(filter ? {
                        OR : [
                            {nome_razao: { contains: filter, mode: 'insensitive' }},
                            {cnpj_cpf: { startsWith: filter }},
                            {municipio: { contains: filter, mode: 'insensitive' }},
                            {uf: { equals: filter }},
                        ]
                    } : {}),
                }
            },
        })

        return NextResponse.json({
            fretes,
            total: countFretes
        }, { 
            status: StatusCodes.OK
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Não foi possivel carregar os registros xxx.'}, { status: StatusCodes.BAD_REQUEST});
    }
}