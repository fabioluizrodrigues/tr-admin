import { AppConstants } from '@/lib/constants';
import { db } from '@/lib/db.server'
import { equal } from 'assert';
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const url = new URL(req.url);
    
    const page = Number(url.searchParams.get('page'));
    const limit = Number(url.searchParams.get('limit')) || AppConstants.NR_REGISTRO_POR_PAGINA * 2;
    const filter = url.searchParams.get('filter');
    const pessoa_id = url.searchParams.get('pessoa_id');

    const pageSkip = (page) ? (page / limit) + 1 : 0;
 
    try {
        const pessoas = await db.pessoa.findMany({
            select: {
                id: true,
                nome_razao: true,
                cnpj_cpf: true,
                municipio: true,
                uf: true
            },
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
                ...(pessoa_id ? { id: { equals: pessoa_id}} : {})
            },            
            orderBy: {
                nome_razao: 'asc'
            },
        });
        return NextResponse.json(pessoas, { status: StatusCodes.OK });
    } catch (error) {
        return NextResponse.json({ message: 'Não foi possivel carregar os registros.'}, { status: StatusCodes.BAD_REQUEST});
    }
}