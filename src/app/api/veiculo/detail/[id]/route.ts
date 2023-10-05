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
        const veiculo = await db.veiculo.findFirst({
            where:{
                id: params.id
            }
        });
        return NextResponse.json(veiculo, { status: StatusCodes.OK});
    } catch (error) {
        return NextResponse.json({ message: 'Não foi possivel carregar o registro.'}, { status: StatusCodes.BAD_REQUEST});
    }
}