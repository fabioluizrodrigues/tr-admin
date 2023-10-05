'use client'

import ErrorMessage from '@/components/ErrorMessage';
import { IsEmptyList } from '@/components/IsEmptyList';
import { IsLoadingPanel } from '@/components/IsLoadingPanel';
import PessoaCardDetail from '@/components/pessoa/PessoaCardDetail'
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react'

interface PessoaDetailPageProps {
    params: {
        id: string;
    }
}

const PessoaDetailPage: FC<PessoaDetailPageProps> = ({ params }) => {
    const { id } = params;

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [naoEncontrado, setNaoEncontrado] = useState<boolean>(false);

    const { mutate: deletePessoa } = useMutation({
        mutationFn: async () => {
            return axios.delete(`/api/pessoa/delete/${id}`);
        },
        onError: (error: AxiosError) => {
            setErrorMessage(String(error.response?.data))
        },
        onSuccess: () => {
            router.push('/pessoa');
            router.refresh();
        }
    });

    const { data: dataPessoa, isLoading: isLoadingPessoa, isError } = useQuery({
        queryKey: ['pessoa', id],
        queryFn: async () => {
            const response = await axios.get(`/api/pessoa/detail/${id}`);
            if (!response.data) setNaoEncontrado(true);
            return response.data;
        }
    });

    return (
        <div>
            {naoEncontrado && <IsEmptyList message='Registro não encontrato.' />}

            {dataPessoa && isLoadingPessoa && <IsLoadingPanel message='Carregando pessoa...' />}

            {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')} />}

            {dataPessoa &&
                <>
                    <div className='flex flex-row items-center justify-between text-2xl font-semibold mb-3 mt-4'>
                        <div>
                            <h2>Pessoa: Detalhe</h2>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <button
                                onClick={() => { window.confirm("Deseja realmente excluir este registro?") ? deletePessoa() : null }}
                                className='btn btn-error btn-outline btn-sm'
                            >
                                Excluir
                            </button>
                            <span>&nbsp;</span>
                            <Link href={`/pessoa/${id}/edit`} prefetch={true} className='btn btn-primary btn-outline btn-sm'>Editar</Link>
                            <Link href='/pessoa' prefetch={true} className='btn btn-outline btn-sm'>Voltar</Link>
                        </div>
                    </div>
                    <PessoaCardDetail pessoa={dataPessoa} />
                </>
            }
        </div>
    )
}

export default PessoaDetailPage