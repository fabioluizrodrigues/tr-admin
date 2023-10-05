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

    const existsCnpjCpf = await db.pessoa.findFirst({
        where: {
            cnpj_cpf: String(body.cnpj_cpf).trim(),
            id: { notIn: [params.id] }            
        }
    });

    if (existsCnpjCpf) {
        return NextResponse.json('CNPJ/CPF já cadastrado.', { status: StatusCodes.BAD_REQUEST});
    }

    try {
        await db.pessoa.update({
            where: {
                id: params.id
            },
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
        return NextResponse.json({ message: 'Atualizado com sucesso.'}, { status: StatusCodes.OK });
    } catch (error) {
        return NextResponse.json({ message: 'Não foi possível atualizar o registro.'}, { status: StatusCodes.BAD_REQUEST });
    }
}


export async function GET(req: Request, context: ContextProps) {
    const { params } = context;
    try {
        const pessoa = await db.pessoa.findFirst({
            where:{
                id: params.id
            }
        });
        return NextResponse.json(pessoa, { status: StatusCodes.OK});
    } catch (error) {
        return NextResponse.json({ message: 'Não foi possivel carregar o registro.'}, { status: StatusCodes.BAD_REQUEST});
    }
}