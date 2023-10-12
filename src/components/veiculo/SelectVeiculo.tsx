'use client'

import React, { useRef, useState } from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

interface IVeiculo {
    id: string;
    placa: string;
    tipo: string;
    nr_eixos: string;
}

interface ISelectVeiculoProps {
    name: string;
    isediting: boolean;
}

const SelectVeiculo: React.FC<ISelectVeiculoProps> = (props) => {

    const { register, setValue, getValues } = useFormContext()

    const inputRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);

    const [initialVeiculo, setInitialVeiculo] = useState<IVeiculo | undefined>(undefined);
    const [pesquisa, setPesquisa] = useState<string>('');
    const [veiculos, setVeiculos] = useState<IVeiculo[]>([]);

    const { error } = useQuery({
        queryKey: ['initialVeiculo',],
        queryFn: async () => {
            const veiculo_id = getValues('veiculo_id');
            const response = await axios.get(`/api/veiculo/list-select/${veiculo_id}`);
            setInitialVeiculo(response.data as IVeiculo);
            setVeiculos(current => [...current, response.data as IVeiculo]);
            return response.data;
        },
        enabled: (initialVeiculo === undefined && props.isediting)
    });

    const loadVeiculos = async () => {
        axios.get('/api/veiculo/list-select', { params: { filter: pesquisa } }).then(function (response) {
            setVeiculos(response.data as IVeiculo[]);
        });
    }

    const clearVeiculos = () => {
        setVeiculos([]);
    }

    const handleKeyDown = async (event: any) => {
        if (event.key === 'Enter') {
            await loadVeiculos();
            selectRef.current?.focus();
        }
        if (event.key === 'Escape') {
            clearVeiculos();
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
                className='input input-bordered join-item w-20'
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
                value={initialVeiculo?.id}
            >
                <option value=''></option>
                {veiculos.map(veiculo => (
                    <option key={veiculo.id} value={veiculo.id} >
                        {veiculo.placa} - {veiculo.tipo}
                    </option>
                ))}
            </select>
        </div>
    )
};

export default SelectVeiculo;