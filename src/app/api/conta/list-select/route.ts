import { AppConstants } from '@/lib/constants';
import { db } from '@/lib/db.server'
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const url = new URL(req.url);
    
    const page = Number(url.searchParams.get('page'));
    const limit = Number(url.searchParams.get('limit')) || AppConstants.NR_REGISTRO_POR_PAGINA * 2;
    const filter = url.searchParams.get('filter');

    const pageSkip = (page) ? (page / limit) + 1 : 0;
 
    try {
        const contas = await db.conta.findMany({
            select: {
                id: true,
                pessoa: true,
                tipo: true,
                descricao: true,
            },
            skip: pageSkip,
            take: limit,            
            where: {
                ...(filter ? {
                    OR : [
                        {descricao: { contains: filter, mode: 'insensitive' }},
                        //{cnpj_cpf: { startsWith: filter }},
                        //{municipio: { contains: filter, mode: 'insensitive' }},
                        //{uf: { equals: filter }},
                    ]
                } : {}),
            },            
            orderBy: {
                descricao: 'asc'
            },
        });
        return NextResponse.json(contas, { status: StatusCodes.OK });
    } catch (error) {
        return NextResponse.json({ message: 'Não foi possivel carregar os registros.'}, { status: StatusCodes.BAD_REQUEST});
    }
}