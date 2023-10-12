import { db } from '@/lib/db.server'
import { FreteSituacao } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {

    const body = await req.json();

    try {        

        const frete = await db.frete.create({
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

        return NextResponse.json(frete, { status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Não foi possivel criar o registro.'}, { status: StatusCodes.BAD_REQUEST});
    }
}