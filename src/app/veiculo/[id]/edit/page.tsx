'use client'

import ErrorMessage from '@/components/ErrorMessage';
import { IsEmptyList } from '@/components/IsEmptyList';
import { IsLoadingPanel } from '@/components/IsLoadingPanel';
import VeiculoFormPost from '@/components/veiculo/VeiculoFormPost'
import { VeiculoFormInput } from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

interface VeiculoEditPageProps {
    params: {
        id: string;
    }
}

const VeiculoEditPage: FC<VeiculoEditPageProps> = ({ params }) => {
    const { id } = params;

    const router = useRouter();
    const [naoEncontrado, setNaoEncontrado] = useState<boolean>(false);

    const { data: dataVeiculo, isLoading: isLoadingPessoa } = useQuery({
        queryKey: ['veiculo', id],
        queryFn: async () => {
            const response = await axios.get(`/api/veiculo/update/${id}`);
            if (!response.data) setNaoEncontrado(true);
            return response.data;
        }
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleEditVeiculo: SubmitHandler<VeiculoFormInput> = (data) => {
        updateVeiculo(data);
    }

    const { mutate: updateVeiculo, isLoading: isLoadVeiculo } = useMutation({
        mutationFn: (updateVeiculo: VeiculoFormInput) => {
            return axios.patch(`/api/veiculo/update/${id}`, updateVeiculo);
        },
        onError: (error: AxiosError) => {
            setErrorMessage(String(error.response?.data))
        },
        onSuccess: () => {
            router.push(`/veiculo/${id}`);
            router.refresh();
        }
    });

    return (
        <div>
            {naoEncontrado && <IsEmptyList message='Registro não encontrato.' />}

            {(dataVeiculo && isLoadVeiculo) && <IsLoadingPanel message='Carregando veículo...' />}

            {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')} />}

            {dataVeiculo &&
                <>
                    <h1 className='text-2xl my-4 font-bold text-left'>Pessoa: Editando registro</h1>
                    <VeiculoFormPost submit={handleEditVeiculo} isEditing={true} initialValue={dataVeiculo} id={id} />
                </>
            }
        </div>
    )
}

export default VeiculoEditPage