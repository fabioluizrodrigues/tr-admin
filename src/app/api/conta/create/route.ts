import { db } from '@/lib/db.server'
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {

    const body = await req.json();

    try {        

        const conta = await db.conta.create({
            data: {
                pessoa_id: body.pessoa_id,
                tipo: body.tipo,
                descricao: body.descricao,
                ativo: body.ativo
            }
        });

        return NextResponse.json(conta, { status: 200});
    } catch (error) {
        return NextResponse.json({ message: 'Não foi possivel criar o registro.'}, { status: StatusCodes.BAD_REQUEST});
    }
}