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
        const frete = await db.frete.findFirst({
            where:{
                id: params.id
            },
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
        });
        return NextResponse.json(frete, { status: StatusCodes.OK});
    } catch (error) {
        return NextResponse.json({ message: 'Não foi possivel carregar o registro.'}, { status: StatusCodes.BAD_REQUEST});
    }
}