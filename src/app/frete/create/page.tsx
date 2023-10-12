'use client'

import ErrorMessage from '@/components/ErrorMessage';
import FreteFormPost from '@/components/frete/FreteFormPost'
import { FreteFormInput } from '@/types';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

const FreteCreate = () => {
    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState('');

    const handleCreateFrete: SubmitHandler<FreteFormInput> = (data) => {
        createFrete(data)
    }

    const { mutate: createFrete, isLoading } = useMutation({
        mutationFn: (newFrete: FreteFormInput) => {
            return axios.post('/api/frete/create', newFrete);
        },
        onError: (error: AxiosError) => {
            setErrorMessage(String(error.response?.data))
        },
        onSuccess: (response: AxiosResponse) => {
            router.push(`/frete/${response.data.id}`);
        }
    });

    return (
        <div>
            {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')} />}
            <h1 className='text-2xl my-4 font-bold text-left'>Frete: Novo registro</h1>
            <FreteFormPost submit={handleCreateFrete} isEditing={false} />
        </div>
    )
}

export default FreteCreate