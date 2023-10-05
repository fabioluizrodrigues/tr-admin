import { db } from '@/lib/db.server'
import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';

interface ContextProps {
    params: {
        id: string;
    }
}

export async function DELETE(req: Request, context: ContextProps) {
    try {
        const { params } = context;
        await db.conta.delete({
            where: {
                id: params.id
            }
        });
        return new Response(null, { status: StatusCodes.OK })
    } catch (error) {
        return NextResponse.json({ message: 'Não foi possível excluir o registro.'}, { status: StatusCodes.BAD_REQUEST });
    }
}