'use client'

import React, { FC } from 'react'
import * as masks from '@/lib/masks';
import { ContaDataView } from '@/types';

interface ContaCardDetailProps {
    conta: ContaDataView
}

const ContaCardDetail: FC<ContaCardDetailProps> = ({ conta }) => {
    return (
        <div className="card w-full bg-white shadow mb-5">
            <div className="card-body">
                <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-3 border-b pb-2'>
                    <div className='md:col-span-3'>
                        <div className='text-xs font-extralight'>Nome / Razão Social</div>
                        <div className='text-xl font-semibold overflow-hidden text-ellipsis'>{conta?.pessoa?.nome_razao}</div>
                    </div>
                    <div className='md:col-span-2'>
                        <div className='text-xs font-extralight'>CPF / CNPJ</div>
                        <div className='text-sm font-semibold overflow-hidden text-ellipsis'>{masks.cpfOrCnpjMask.mask(String(conta?.pessoa?.cnpj_cpf))}</div>
                    </div>
                    <div className='md:col-span-2'>
                        <div className='text-xs font-extralight'>Tipo </div>
                        <div className='text-sm font-semibold overflow-hidden text-ellipsis'>{conta?.tipo}</div>
                    </div>
                    <div className='md:col-span-1'>
                        <div className='text-xs font-extralight'>Ativo</div>
                        <div className='text-sm font-semibold overflow-hidden text-ellipsis'>{(conta?.ativo) ? 'Sim ' : 'Não'}</div>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-3 py-2 px-2'>
                    <div className='md:col-span-8'>
                        <div className='text-xs font-extralight'>Descrição</div>
                        <div className='text-sm font-semibold overflow-hidden text-ellipsis'>{conta?.descricao}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContaCardDetail