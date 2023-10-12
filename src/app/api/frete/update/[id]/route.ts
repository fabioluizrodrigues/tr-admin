import { db } from '@/lib/db.server'
import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { FreteSituacao } from '@prisma/client';

interface ContextProps {
    params: {
        id: string;
    }
}

export async function PATCH(req: Request, context: ContextProps) {

    const { params } = context;
    const body = await req.json();

    try {
        await db.frete.update({
            where: {
                id: params.id
            },
            data: {
                data_doc: body.data_doc,
                nr_doc: body.nr_doc,
                nr_ordem: body.nr_ordem,
                conta_id: body.conta_id,
                motorista_id: body.motorista_id,
                cavalo_id: body.cavalo_id,
                reboque1_id: body.reboque1_id,
                reboque2_id: body.reboque2_id,
                reboque3_id: body.reboque3_id,
                cliente_id : body.cliente_id,
                local_embarque:  body. local_embarque,
                local_descarga:  body. local_descarga,
                vlr_tarifa: body.vlr_tarifa,
                peso_saida: body.peso_saida,
                vlr_bruto: body.vlr_bruto,
                vlr_pedagio: body.vlr_pedagio,
                peso_chegada: body.peso_chegada,
                vlr_quebra: body.vlr_quebra,
                vlr_desconto: body.vlr_desconto,
                vlr_liquido: body.vlr_liquido,
                perc_comissao: body.perc_comissao,
                vlr_comissao: body.vlr_comissao,
                situacao: FreteSituacao.ABERTO,
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
        const frete = await db.frete.findFirst({
            where:{
                id: params.id
            }
        });
        return NextResponse.json(frete, { status: StatusCodes.OK});
    } catch (error) {
        return NextResponse.json({ message: 'Não foi possivel carregar o registro.'}, { status: StatusCodes.BAD_REQUEST});
    }
}