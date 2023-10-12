import { db } from '@/lib/db.server'
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

interface ContextProps {
    params: {
        id: string;
    }
}

export async function GET(req: Request, context: ContextProps) {
    const { params } = context;
    try {
        const conta = await db.conta.findFirst({
            select: {
                id: true,
                tipo: true,
                descricao: true,
                pessoa: true,
            },
            where:{
                id: params.id
            }
        });
        return NextResponse.json(conta, { status: StatusCodes.OK});
    } catch (error) {
        return NextResponse.json({ message: 'Não foi possivel carregar o registro.'}, { status: StatusCodes.BAD_REQUEST});
    }
}