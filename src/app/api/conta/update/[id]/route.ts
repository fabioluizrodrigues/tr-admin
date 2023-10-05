import { db } from '@/lib/db.server'
import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';

interface ContextProps {
    params: {
        id: string;
    }
}

export async function PATCH(req: Request, context: ContextProps) {

    const { params } = context;
    const body = await req.json();

    try {
        await db.conta.update({
            where: {
                id: params.id
            },
            data: {
                //pessoa_id: body.pessoa_id,
                tipo: body.tipo,
                descricao: String(body.descricao),
                ativo: Boolean(body.ativo)
            }
        });
        return NextResponse.json({ message: 'Atualizado com sucesso.'}, { status: StatusCodes.OK });
    } catch (error) {
        return NextResponse.json({ message: 'Não foi possível atualizar o registro.'}, { status: StatusCodes.BAD_REQUEST });
    }
}


export async function GET(req: Request, context: ContextProps) {
    const { params } = context;
    try {
        const conta = await db.conta.findFirst({
            where:{
                id: params.id
            }
        });
        return NextResponse.json(conta, { status: StatusCodes.OK});
    } catch (error) {
        return NextResponse.json({ message: 'Não foi possivel carregar o registro.'}, { status: StatusCodes.BAD_REQUEST});
    }
}