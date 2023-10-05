'use client'

import ErrorMessage from '@/components/ErrorMessage';
import { IsEmptyList } from '@/components/IsEmptyList';
import { IsLoadingPanel } from '@/components/IsLoadingPanel';
import ContaCardDetail from '@/components/conta/ContaCardDetail';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react'

interface ContaDetailPageProps {
    params: {
        id: string;
    }
}

const ContaDetailPage: FC<ContaDetailPageProps> = ({ params }) => {
    const { id } = params;

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [naoEncontrado, setNaoEncontrado] = useState<boolean>(false);

    const { mutate: deletePessoa } = useMutation({
        mutationFn: async () => {
            return axios.delete(`/api/conta/delete/${id}`);
        },
        onError: (error: AxiosError) => {
            setErrorMessage(String(error.response?.data))
        },
        onSuccess: () => {
            router.push('/conta');
            router.refresh();
        }
    });

    const { data: dataConta, isLoading: isLoadingConta } = useQuery({
        queryKey: ['conta', id],
        queryFn: async () => {
            const response = await axios.get(`/api/conta/detail/${id}`);
            if (!response.data) setNaoEncontrado(true);
            return response.data;
        }
    });

    return (
        <div>
            {naoEncontrado && <IsEmptyList message='Registro não encontrato.' />}

            {dataConta && isLoadingConta && <IsLoadingPanel message='Carregando conta...' />}

            {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')} />}

            {dataConta &&
                <>
                    <div className='flex flex-row items-center justify-between text-2xl font-semibold mb-3 mt-4'>
                        <div>
                            <h2>Conta: Detalhe</h2>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <button
                                onClick={() => { window.confirm("Deseja realmente excluir este registro?") ? deletePessoa() : null }}
                                className='btn btn-error btn-outline btn-sm'
                            >
                                Excluir
                            </button>
                            <span>&nbsp;</span>
                            <Link href={`/conta/${id}/edit`} prefetch={true} className='btn btn-primary btn-outline btn-sm'>Editar</Link>
                            <Link href='/conta' prefetch={true} className='btn btn-outline btn-sm'>Voltar</Link>
                        </div>
                    </div>
                    <ContaCardDetail conta={dataConta} />
                </>
            }
        </div>
    )
}

export default ContaDetailPage