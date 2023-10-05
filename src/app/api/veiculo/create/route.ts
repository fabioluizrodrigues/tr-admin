import { db } from '@/lib/db.server'
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {

    const body = await req.json();

    const existsPlaca = await db.veiculo.findUnique({
        where: { placa: body.placa}
    });

    if (existsPlaca) {
        return NextResponse.json('Placa já cadastrada.', { status: StatusCodes.BAD_REQUEST});
    }

    try {        

        const veiculo = await db.veiculo.create({
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

        return NextResponse.json(veiculo, { status: 200});
    } catch (error) {
        return NextResponse.json({ message: 'Não foi possivel criar o registro.'}, { status: StatusCodes.BAD_REQUEST});
    }
}