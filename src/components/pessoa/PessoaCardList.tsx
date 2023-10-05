import { PessoaFormInput } from '@/types'
import Link from 'next/link'
import React, { FC } from 'react'
import * as masks from '@/lib/masks';

interface PessoaCardProps {
    pessoa: PessoaFormInput
}

const PessoaCard: FC<PessoaCardProps> = ({ pessoa }) => {
    return (
        <div className="card-bordered car w-full bg-white shadow p-2 pb-1 hover:bg-neutral-50">
            <div className="">

                <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-3 border-b px-2'>
                    <div className='md:col-span-3'>
                        <div className='text-xs font-extralight'>Nome / Razão Social</div>
                        <div className='text-xl font-semibold overflow-hidden text-ellipsis'>{pessoa?.nome_razao}</div>
                    </div>
                    <div className='md:col-span-2'>
                        <div className='text-xs font-extralight'>CPF / CNPJ</div>
                        <div className='text-sm font-semibold overflow-hidden text-ellipsis'>{masks.cpfOrCnpjMask.mask(String(pessoa?.cnpj_cpf))}</div>
                    </div>
                    <div className='md:col-span-2'>
                        <div className='text-xs font-extralight'>RG / IE</div>
                        <div className='text-sm font-semibold overflow-hidden text-ellipsis'>{pessoa?.ie_rg}</div>
                    </div>
                    <div className="md:col-span-1">
                        <Link href={`/pessoa/${pessoa.id}`} className=' btn btn-sm btn-ghost'>
                            Detalhar...
                        </Link>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-3 py-2 px-2'>
                    <div className='md:col-span-2'>
                        <div className='text-xs font-extralight'>Telefone</div>
                        <div className='text-sm font-semibold overflow-hidden text-ellipsis'>{masks.phoneMask.mask(String(pessoa?.telefone))}</div>
                    </div>
                    <div className='md:col-span-2'>
                        <div className='text-xs font-extralight'>Celular</div>
                        <div className='text-sm font-semibold overflow-hidden text-ellipsis'>{masks.phoneMask.mask(String(pessoa?.celular))}</div>
                    </div>
                    <div className='md:col-span-4'>
                        <div className='text-xs font-extralight'>E-Mail</div>
                        <div className='text-sm font-semibold overflow-hidden text-ellipsis'>{pessoa?.email}</div>
                    </div>
                    <div className='md:col-span-4'>
                        <div className='text-xs font-extralight'>Município/UF</div>
                        <div className='text-sm font-semibold overflow-hidden text-ellipsis'>{pessoa?.municipio}/{pessoa?.uf}</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PessoaCard