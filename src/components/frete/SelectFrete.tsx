'use client'

import React, { useRef, useState } from "react";
import axios from 'axios';
import * as masks from '@/lib/masks';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

interface IPessoa {
    id: string;
    nome_razao: string;
    cnpj_cpf: string;
    municipio: string;
    uf: string;
}

interface ISelectFreteProps {
    name: string;
    isediting: boolean;
}

const SelectFrete: React.FC<ISelectFreteProps> = (props) => {

    const { register, setValue, getValues } = useFormContext()

    const inputRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);

    const [initialPessoa, setInitialPessoa] = useState<IPessoa | undefined>(undefined);
    const [pesquisa, setPesquisa] = useState<string>('');
    const [pessoas, setPessoas] = useState<IPessoa[]>([]);

    const { error } = useQuery({
        queryKey: ['initialPessoa',],
        queryFn: async () => {
            const pessoa_id = getValues('pessoa_id');
            const response = await axios.get(`/api/pessoa/list-select/${pessoa_id}`);
            setInitialPessoa(response.data as IPessoa);
            setPessoas(current => [...current, response.data as IPessoa]);

            return response.data;
        },
        enabled: (initialPessoa === undefined && props.isediting)
    });

    const loadPessoas = async () => {
        axios.get('/api/pessoa/list-select', { params: { filter: pesquisa } }).then(function (response) {
            setPessoas(response.data as IPessoa[]);
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
            setValue(props.name, '');
            inputRef.current?.focus();
        }
    };

    const handleSelectItem = (event: any) => {
        setValue(props.name, event.target.value, {
            shouldValidate: true,
            shouldTouch: true,
            shouldDirty: true
        });
    }

    return (
        <div className='flex join'>
            <input
                type='text'
                className='input input-bordered join-item w-28'
                onChange={e => setPesquisa(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={inputRef}
            />
            <input
                {...register(props.name)}
                type="hidden"
            />
            <select
                ref={selectRef}
                onChange={e => handleSelectItem(e)}
                onKeyDown={handleKeyDown}
                className="select select-bordered  join-item w-full"
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

export default SelectFrete;