'use client'

import ErrorMessage from '@/components/ErrorMessage';
import { IsEmptyList } from '@/components/IsEmptyList';
import { IsLoadingPanel } from '@/components/IsLoadingPanel';
import ContaFormPost from '@/components/conta/ContaFormPost'
import { ContaFormInput } from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

interface ContaEditPageProps {
    params: {
        id: string;
    }
}

const ContaEditPage: FC<ContaEditPageProps> = ({ params }) => {
    const { id } = params;

    const router = useRouter();
    const [naoEncontrado, setNaoEncontrado] = useState<boolean>(false);

    const { data: dataConta, isLoading: isLoadingConta } = useQuery({
        queryKey: ['conta', id],
        queryFn: async () => {
            const response = await axios.get(`/api/conta/update/${id}`);
            if (!response.data) setNaoEncontrado(true);
            return response.data;
        }
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleEditPessoa: SubmitHandler<ContaFormInput> = (data) => {
        updateConta(data);
    }

    const { mutate: updateConta, isLoading: isLoad } = useMutation({
        mutationFn: (updateConta: ContaFormInput) => {
            return axios.patch(`/api/conta/update/${id}`, updateConta);
        },
        onError: (error: AxiosError) => {
            setErrorMessage(String(error.response?.data))
        },
        onSuccess: () => {
            router.push(`/conta/${id}`);
            router.refresh();
        }
    });

    return (
        <div>
            {naoEncontrado && <IsEmptyList message='Registro não encontrato.' />}

            {(dataConta && isLoadingConta) && <IsLoadingPanel message='Carregando conta...' />}

            {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')} />}

            {dataConta &&
                <>
                    <h1 className='text-2xl my-4 font-bold text-left'>Conta: Editando registro</h1>
                    <ContaFormPost submit={handleEditPessoa} isEditing={true} initialValue={dataConta} id={id} />
                </>
            }
        </div>
    )
}
export default ContaEditPage;