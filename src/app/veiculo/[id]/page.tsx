'use client'

import ErrorMessage from '@/components/ErrorMessage';
import { IsEmptyList } from '@/components/IsEmptyList';
import { IsLoadingPanel } from '@/components/IsLoadingPanel';
import VeiculoCardDetail from '@/components/veiculo/VeiculoCardDetail'
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react'

interface VeiculoDetailPageProps {
    params: {
        id: string;
    }
}

const VeiculoDetailPage: FC<VeiculoDetailPageProps> = ({ params }) => {
    const { id } = params;

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [naoEncontrado, setNaoEncontrado] = useState<boolean>(false);

    const { mutate: deleteVeiculo } = useMutation({
        mutationFn: async () => {
            return axios.delete(`/api/veiculo/delete/${id}`);
        },
        onError: (error: AxiosError) => {
            setErrorMessage(String(error.response?.data))
        },
        onSuccess: () => {
            router.push('/veiculo');
            router.refresh();
        }
    });

    const { data: dataVeiculo, isLoading: isLoadingVeiculo } = useQuery({
        queryKey: ['veiculo', id],
        queryFn: async () => {
            const response = await axios.get(`/api/veiculo/detail/${id}`);
            if (!response.data) setNaoEncontrado(true);
            return response.data;
        }
    });


    return (
        <div>
            {naoEncontrado && <IsEmptyList message='Registro não encontrato.' />}

            {dataVeiculo && isLoadingVeiculo && <IsLoadingPanel message='Carregando veículo...' />}

            {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')} />}

            {dataVeiculo &&
                <>
                    <div className='flex flex-row items-center justify-between text-2xl font-semibold mb-3 mt-4'>
                        <div>
                            <h2>Veículo: Detalhe</h2>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <button
                                onClick={() => { window.confirm("Deseja realmente excluir este registro?") ? deleteVeiculo() : null }}
                                className='btn btn-error btn-outline btn-sm'
                            >
                                Excluir
                            </button>
                            <span>&nbsp;</span>
                            <Link href={`/veiculo/${id}/edit`} prefetch={true} className='btn btn-primary btn-outline btn-sm'>Editar</Link>
                            <Link href='/veiculo' prefetch={true} className='btn btn-outline btn-sm'>Voltar</Link>
                        </div>
                    </div>
                    <VeiculoCardDetail veiculo={dataVeiculo} />
                </>
            }
        </div>


    )
}

export default VeiculoDetailPage