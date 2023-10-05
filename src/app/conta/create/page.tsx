'use client'

import ErrorMessage from '@/components/ErrorMessage';
import ContaFormPost from '@/components/conta/ContaFormPost'
import { ContaFormInput } from '@/types';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

const ContaCreate = () => {
    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState('');

    const handleCreateConta: SubmitHandler<ContaFormInput> = (data) => {
        createConta(data)
    }

    const { mutate: createConta, isLoading } = useMutation({
        mutationFn: (newPessoa: ContaFormInput) => {
            return axios.post('/api/conta/create', newPessoa);
        },
        onError: (error: AxiosError) => {
            setErrorMessage(String(error.response?.data))
        },
        onSuccess: (response: AxiosResponse) => {
            router.push(`/conta/${response.data.id}`);
        }
    });

    return (
        <div>
            {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')} />}
            <h1 className='text-2xl my-4 font-bold text-left'>Conta: Novo registro</h1>
            <ContaFormPost submit={handleCreateConta} isEditing={false} />
        </div>
    )
}

export default ContaCreate