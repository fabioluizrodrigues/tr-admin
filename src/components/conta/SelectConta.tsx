'use client'

import React, { useRef, useState } from "react";
import axios from 'axios';
import * as masks from '@/lib/masks';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import { ContaTipo, Pessoa } from '@prisma/client';

interface IConta {
    id: string;
    pessoa: Pessoa;
    tipo: ContaTipo;
    descricao: string;
}

interface ISelectContaProps {
    name: string;
    isediting: boolean;
}

const SelectConta: React.FC<ISelectContaProps> = (props) => {

    const { register, setValue, getValues } = useFormContext()

    const inputRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);

    const [initialConta, setInitialConta] = useState<IConta | undefined>(undefined);
    const [pesquisa, setPesquisa] = useState<string>('');
    const [contas, setContas] = useState<IConta[]>([]);

    const { error } = useQuery({
        queryKey: ['initialConta',],
        queryFn: async () => {
            const conta_id = getValues('conta_id');
            const response = await axios.get(`/api/conta/list-select/${conta_id}`);
            setInitialConta(response.data as IConta);
            setContas(current => [...current, response.data as IConta]);
            return response.data;
        },
        enabled: (initialConta === undefined && props.isediting)
    });

    const loadContas = async () => {
        axios.get('/api/conta/list-select', { params: { filter: pesquisa } }).then(function (response) {
            setContas(response.data as IConta[]);
        });
    }

    const clearContas = () => {
        setContas([]);
    }

    const handleSelectItem = (event: any) => {
        setValue(props.name, event.target.value, {
            shouldValidate: true,
            shouldTouch: true,
            shouldDirty: true
        });
    }

    const handleKeyDown = async (event: any) => {
        if (event.key === 'Enter') {
            await loadContas();
            selectRef.current?.focus();
        }
        if (event.key === 'Escape') {
            clearContas();
            setValue(props.name, '');
            inputRef.current?.focus();
        }
    };

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
                value={initialConta?.id}
            >
                <option value=''></option>
                {contas.map(conta => (
                    <option key={conta.id} value={conta.id} >
                        {conta.pessoa.nome_razao} - ({masks.cpfOrCnpjMask.mask(String(conta.pessoa.cnpj_cpf))}) - {conta.pessoa.municipio}/{conta.pessoa.uf}
                    </option>
                ))}
            </select>
        </div>
    )
};

export default SelectConta;