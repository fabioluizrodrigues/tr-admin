'use client'

import ErrorMessage from '@/components/ErrorMessage';
import { IsEmptyList } from '@/components/IsEmptyList';
import { IsLoadingPanel } from '@/components/IsLoadingPanel';
import PessoaFormPost from '@/components/pessoa/PessoaFormPost'
import { PessoaFormInput } from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

interface PessoaEditPageProps {
    params: {
        id: string;
    }
}

const PessoaEditPage: FC<PessoaEditPageProps> = ({ params }) => {
    const { id } = params;

    const router = useRouter();
    const [naoEncontrado, setNaoEncontrado] = useState<boolean>(false);

    const { data: dataPessoa, isLoading: isLoadingPessoa } = useQuery({
        queryKey: ['pessoa', id],
        queryFn: async () => {
            const response = await axios.get(`/api/pessoa/update/${id}`);
            if (!response.data) setNaoEncontrado(true);
            return response.data;
        }
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleEditPessoa: SubmitHandler<PessoaFormInput> = (data) => {
        updatePessoa(data);
    }

    const { mutate: updatePessoa, isLoading: isLoad } = useMutation({
        mutationFn: (updatePessoa: PessoaFormInput) => {
            return axios.patch(`/api/pessoa/update/${id}`, updatePessoa);
        },
        onError: (error: AxiosError) => {
            setErrorMessage(String(error.response?.data))
        },
        onSuccess: () => {
            router.push(`/pessoa/${id}`);
            router.refresh();
        }
    });

    return (
        <div>
            {naoEncontrado && <IsEmptyList message='Registro não encontrato.' />}

            {(dataPessoa && isLoadingPessoa) && <IsLoadingPanel message='Carregando pessoa...' />}

            {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')} />}

            {dataPessoa &&
                <>
                    <h1 className='text-2xl my-4 font-bold text-left'>Pessoa: Editando registro</h1>
                    <PessoaFormPost submit={handleEditPessoa} isEditing={true} initialValue={dataPessoa} id={id} />
                </>
            }
        </div>
    )
}

export default PessoaEditPage