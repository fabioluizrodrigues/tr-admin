'use client'

import ErrorMessage from '@/components/ErrorMessage';
import VeiculoFormPost from '@/components/veiculo/VeiculoFormPost'
import { VeiculoFormInput } from '@/types';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

const VeiculoCreate = () => {
    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState('');

    const handleCreateVeiculo: SubmitHandler<VeiculoFormInput> = (data) => {
        createVeiculo(data)
    }

    const { mutate: createVeiculo, isLoading } = useMutation({
        mutationFn: (newPessoa: VeiculoFormInput) => {
            return axios.post('/api/veiculo/create', newPessoa);
        },
        onError: (error: AxiosError) => {
            setErrorMessage(String(error.response?.data))
        },
        onSuccess: (response: AxiosResponse) => {
            router.push(`/veiculo/${response.data.id}`);
        }
    });

    return (
        <div>
            {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')} />}
            <h1 className='text-2xl my-4 font-bold text-left'>Pessoa: Novo registro</h1>
            <VeiculoFormPost submit={handleCreateVeiculo} isEditing={false} />
        </div>
    )
}

export default VeiculoCreate