import { db } from '@/lib/db.server'
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {

    const body = await req.json();

    const existsCnpjCpf = await db.pessoa.findUnique({
        where: {
            cnpj_cpf: body.cnpj_cpf
        }
    });

    if (existsCnpjCpf) {
        return NextResponse.json({message: 'CNPJ/CPF já cadastrado.'}, { status: StatusCodes.BAD_REQUEST});
    }

    try {        

        const pessoa = await db.pessoa.create({
            data: {
                nome_razao: body.nome_razao,
                cnpj_cpf: body.cnpj_cpf,
                ie_rg: body.ie_rg,
                cep: body.cep,
                endereco: body.endereco,
                bairro: body.bairro,
                numero: body.numero,
                municipio: body.municipio,
                uf: body.uf,
                telefone: body.telefone,
                celular: body.celular,
                email: body.email,
                observacoes: body.observacoes,
                ativo: body.ativo
            }
        });

        return NextResponse.json(pessoa, { status: 200});
    } catch (error) {
        return NextResponse.json({ message: 'Não foi possivel criar o registro.' }, { status: StatusCodes.BAD_REQUEST});
    }
}