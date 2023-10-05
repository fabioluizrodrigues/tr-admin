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

    const existsPlaca = await db.veiculo.findFirst({
        where: {
            placa: String(body.placa).trim(),
            id: { notIn: [params.id] }            
        }
    });

    if (existsPlaca) {
        return NextResponse.json('Placa já cadastrada.', { status: StatusCodes.BAD_REQUEST});
    }

    try {
        await db.veiculo.update({
            where: {
                id: params.id
            },
            data: {
                placa: body.placa,
                renavam: body.renavam,
                nr_eixos: Number(body.nr_eixos),
                ano_fabrica: Number(body.ano_fabrica),
                ano_modelo: Number(body.ano_modelo),
                ano_exercicio: Number(body.ano_exercicio),
                marca: body.marca,
                modelo: body.modelo,
                cor: body.cor,
                observacoes: body.observacoes,
                ativo: body.ativo
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