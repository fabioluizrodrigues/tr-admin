'use client'

import BackButton from '@/components/BackButton';
import ErrorMessage from '@/components/ErrorMessage';
import PessoaFormPost from '@/components/pessoa/PessoaFormPost'
import { PessoaFormInput } from '@/types';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

const PessoaCreate = () => {
    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState('');

    const handleCreatePessoa: SubmitHandler<PessoaFormInput> = (data) => {
        createPessoa(data)
    }

    const { mutate: createPessoa, isLoading } = useMutation({
        mutationFn: (newPessoa: PessoaFormInput) => {
            return axios.post('/api/pessoa/create', newPessoa);
        },
        onError: (error: AxiosError) => {
            setErrorMessage(String(error.response?.data))
        },
        onSuccess: (response: AxiosResponse) => {
            router.push(`/pessoa/${response.data.id}`);
        }
    });

    return (
        <div>
            {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')} />}
            <h1 className='text-2xl my-4 font-bold text-left'>Pessoa: Novo registro</h1>
            <PessoaFormPost submit={handleCreatePessoa} isEditing={false} />
        </div>
    )
}

export default PessoaCreate