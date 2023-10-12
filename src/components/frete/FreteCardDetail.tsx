'use client'

import React, { FC } from 'react'
import * as masks from '@/lib/masks';
import { FreteFormInput } from '@/types';

interface FreteCardDetailProps {
    frete: FreteFormInput
}

const FreteCardDetail: FC<FreteCardDetailProps> = ({ frete }) => {
    return (
        <div className="card w-full bg-white shadow mb-5">
            <div className="card-body">

                <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-3 border-b pb-2'>
                    <div className='md:col-span-4'>
                        <div className='text-xs'>Data Doc.</div>
                        <div className='text-xl font-semibold overflow-hidden text-ellipsis'>{masks.dateMask.mask(String(frete?.data_doc))}</div>
                    </div>
                    <div className='md:col-span-2'>
                        <div className='text-xs'>Conta</div>
                        <div className='text-lg overflow-hidden text-ellipsis'>{frete?.conta_id}</div>
                    </div>
                    <div className='md:col-span-2'>
                        <div className='text-xs'>Motorista</div>
                        <div className='text-lg overflow-hidden text-ellipsis'>{frete?.motorista_id}</div>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-3 border-b pb-2'>
                    <div className='md:col-span-2'>
                        <div className='text-xs'>Cavalo</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{frete?.cavalo_id}</div>
                    </div>
                    <div className='md:col-span-4'>
                        <div className='text-xs'>Reboque 1</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{frete?.reboque1_id}</div>
                    </div>
                    <div className='md:col-span-2'>
                        <div className='text-xs'>Reboque 2</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{frete?.reboque2_id}</div>
                    </div>
                    <div className='md:col-span-2'>
                        <div className='text-xs'>Reboque 3</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{frete?.reboque3_id}</div>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-3 border-b pb-2'>
                    <div className='md:col-span-1'>
                        <div className='text-xs'>Valor</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{masks.currencyMask.mask(String(frete?.vlr_tarifa))}</div>
                    </div>
                    <div className='md:col-span-1'>
                        <div className='text-xs'>Peso Saída</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{masks.currencyMask.mask(String(frete?.peso_saida))}</div>
                    </div>
                    <div className='md:col-span-1'>
                        <div className='text-xs'>Valor Bruto</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{masks.currencyMask.mask(String(frete?.vlr_bruto))}</div>
                    </div>
                    <div className='md:col-span-1'>
                        <div className='text-xs'>Valor Pedágio</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{masks.currencyMask.mask(String(frete?.vlr_pedagio))}</div>
                    </div>
                    <div className='md:col-span-1'>
                        <div className='text-xs'>Peso Chegada</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{masks.currencyMask.mask(String(frete?.peso_chegada))}</div>
                    </div>
                    <div className='md:col-span-1'>
                        <div className='text-xs'>Valor Quebra</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{masks.currencyMask.mask(String(frete?.vlr_quebra))}</div>
                    </div>
                    <div className='md:col-span-1'>
                        <div className='text-xs'>Valor Desconto</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{masks.currencyMask.mask(String(frete?.vlr_desconto))}</div>
                    </div>
                    <div className='md:col-span-1'>
                        <div className='text-xs'>Valor Liquido</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{masks.currencyMask.mask(String(frete?.vlr_liquido))}</div>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-3 border-b pb-2'>
                    <div className='md:col-span-1'>
                        <div className='text-xs'>Perc. Comissão</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{masks.currencyMask.mask(String(frete?.perc_comissao))}</div>
                    </div>
                    <div className='md:col-span-1'>
                        <div className='text-xs'>Valor Comissão</div>
                        <div className='text-base overflow-hidden text-ellipsis'>{masks.currencyMask.mask(String(frete?.vlr_comissao))}</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FreteCardDetail