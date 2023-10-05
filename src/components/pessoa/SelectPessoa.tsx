'use client'

import React, { useRef, useState } from "react";
import axios from 'axios';
import * as masks from '@/lib/masks';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

interface IPessoaProps {
    id: string;
    nome_razao: string;
    cnpj_cpf: string;
    municipio: string;
    uf: string;
}

interface ISelectPessoaProps {
    name: string;
    isediting: boolean;
}

const SelectPessoa: React.FC<ISelectPessoaProps> = (props) => {

    const { register, setValue, getValues } = useFormContext()

    const inputRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);

    const [initialPessoa, setInitialPessoa] = useState<IPessoaProps | undefined>(undefined);
    const [pesquisa, setPesquisa] = useState<string>('');
    const [pessoas, setPessoas] = useState<IPessoaProps[]>([]);

    const { error } = useQuery({
        queryKey: ['initialPessoa',],
        queryFn: async () => {
            const pessoaId = getValues('pessoa_id');
            const response = await axios.get(`/api/pessoa/list-select/${pessoaId}`);
            setInitialPessoa(response.data as IPessoaProps);
            setPessoas(current => [...current, response.data as IPessoaProps]);

            return response.data;
        },
        enabled: (initialPessoa === undefined && props.isediting)
    });

    const loadPessoas = async () => {
        axios.get('/api/pessoa/list-select', { params: { filter: pesquisa } }).then(function (response) {
            setPessoas(response.data as IPessoaProps[]);
        });
    }

    const clearPessoas = () => {
        setPessoas([]);
    }

    const handleKeyDown = async (event: any) => {
        if (event.key === 'Enter') {
            await loadPessoas();
            selectRef.current?.focus();
        }
        if (event.key === 'Escape') {
            clearPessoas();
            setValue('pessoa_id', '');
            inputRef.current?.focus();
        }
    };

    return (
        <div className='flex join'>
            <input
                type='text'
                className='input input-bordered join-item w-40'
                onChange={e => setPesquisa(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={inputRef}
                placeholder='Pesquisa...'
            />
            <input
                {...register(props.name)}
                type="hidden"
            />
            <select
                ref={selectRef}
                onChange={e => setValue('pessoa_id', e.target.value)}
                onKeyDown={handleKeyDown}
                className="select select-bordered join-item w-full"
                value={initialPessoa?.id}
            >
                <option value=''></option>
                {pessoas.map(pessoa => (
                    <option key={pessoa.id} value={pessoa.id} >
                        {pessoa.nome_razao} - ({masks.cpfOrCnpjMask.mask(String(pessoa.cnpj_cpf))}) - {pessoa.municipio}/{pessoa.uf}
                    </option>
                ))}
            </select>
        </div>
    )
};

export default SelectPessoa;