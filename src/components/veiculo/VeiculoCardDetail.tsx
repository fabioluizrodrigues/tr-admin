'use client'

import React, { FC } from 'react'
import { VeiculoFormInput } from '@/types';

interface VeiculoCardDetailProps {
    veiculo: VeiculoFormInput
}

const VeiculoCardDetail: FC<VeiculoCardDetailProps> = ({ veiculo }) => {
    return (
        <div className="card w-full bg-white shadow mb-5">
            <div className="card-body">

                <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-3 border-b pb-2'>
                    <div className='md:col-span-1'>
                        <div className='text-xs font-extralight'>Placa</div>
                        <div className='text-xl font-semibold overflow-hidden text-ellipsis'>{veiculo?.placa}</div>
                    </div>
                    <div className='md:col-span-1'>
                        <div className='text-xs font-extralight'>Renavam</div>
                        <div className='text-sm font-semibold overflow-hidden text-ellipsis'>{veiculo?.renavam}</div>
                    </div>
                    <div className='md:col-span-1'>
                        <div className='text-xs'>Tipo</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{veiculo?.tipo}</div>
                    </div>
                    <div className='md:col-span-1'>
                        <div className='text-xs font-extralight'>Qtde Eixos</div>
                        <div className='text-sm font-semibold overflow-hidden text-ellipsis'>{veiculo?.nr_eixos}</div>
                    </div>
                    <div className='md:col-span-1'>
                        <div className='text-xs'>Ano Fabrica</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{veiculo?.ano_fabrica}</div>
                    </div>
                    <div className='md:col-span-1'>
                        <div className='text-xs'>Ano Modelo</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{veiculo?.ano_modelo}</div>
                    </div>
                    <div className='md:col-span-1'>
                        <div className='text-xs'>Ano Exercício</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{veiculo?.ano_exercicio}</div>
                    </div>
                    <div className='md:col-span-1'>
                        <div className='text-xs'>Cor</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{veiculo?.cor}</div>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-3 border-b pb-2'>
                    <div className='md:col-span-2'>
                        <div className='text-xs'>Marca</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{veiculo?.marca}</div>
                    </div>
                    <div className='md:col-span-2'>
                        <div className='text-xs'>Modelo</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{veiculo?.modelo}</div>
                    </div>
                    <div className='md:col-span-1'>
                        <div className='text-xs'>Ativo</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{veiculo?.ativo}</div>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-3 '>
                    <div className='md:col-span-8'>
                        <div className='text-xs'>Observações</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{veiculo?.observacoes}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VeiculoCardDetail