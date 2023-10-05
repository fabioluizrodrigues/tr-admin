'use client'

import React, { FC } from 'react'
import * as masks from '@/lib/masks';
import { PessoaFormInput } from '@/types';

interface PessoaCardDetailProps {
    pessoa: PessoaFormInput
}

const PessoaCardDetail: FC<PessoaCardDetailProps> = ({ pessoa }) => {
    return (
        <div className="card w-full bg-white shadow mb-5">
            <div className="card-body">

                <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-3 border-b pb-2'>
                    <div className='md:col-span-4'>
                        <div className='text-xs'>Nome / Razão Social</div>
                        <div className='text-xl font-semibold overflow-hidden text-ellipsis'>{pessoa?.nome_razao}</div>
                    </div>
                    <div className='md:col-span-2'>
                        <div className='text-xs'>CPF / CNPJ</div>
                        <div className='text-lg overflow-hidden text-ellipsis'>{masks.cpfOrCnpjMask.mask(String(pessoa?.cnpj_cpf))}</div>
                    </div>
                    <div className='md:col-span-2'>
                        <div className='text-xs'>RG / IE</div>
                        <div className='text-lg overflow-hidden text-ellipsis'>{pessoa?.ie_rg}</div>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-3 border-b pb-2'>
                    <div className='md:col-span-2'>
                        <div className='text-xs'>CEP</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{masks.cepMask.mask(String(pessoa?.cep))}</div>
                    </div>
                    <div className='md:col-span-4'>
                        <div className='text-xs'>Endereço</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{pessoa?.endereco}</div>
                    </div>
                    <div className='md:col-span-2'>
                        <div className='text-xs'>Número</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{pessoa?.numero}</div>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-3 border-b pb-2'>
                    <div className='md:col-span-3'>
                        <div className='text-xs'>Bairro</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{pessoa?.bairro}</div>
                    </div>
                    <div className='md:col-span-3'>
                        <div className='text-xs'>Município</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{pessoa?.municipio}</div>
                    </div>
                    <div className='md:col-span-2'>
                        <div className='text-xs'>Estado/UF</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{pessoa?.uf}</div>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-3 border-b pb-2'>
                    <div className='md:col-span-2'>
                        <div className='text-xs'>Telefone</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{masks.phoneMask.mask(String(pessoa?.telefone))}</div>
                    </div>
                    <div className='md:col-span-2'>
                        <div className='text-xs'>Celular</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{masks.phoneMask.mask(String(pessoa?.celular))}</div>
                    </div>
                    <div className='md:col-span-4'>
                        <div className='text-xs'>E-Mail</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{pessoa?.email}</div>
                    </div>

                </div>

                <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-3 border-b pb-2'>
                    <div className='md:col-span-7'>
                        <div className='text-xs'>Observações</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{pessoa?.observacoes}</div>
                    </div>
                    <div className='md:col-span-1'>
                        <div className='text-xs'>Ativo</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{pessoa?.ativo}</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PessoaCardDetail