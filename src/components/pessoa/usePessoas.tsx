'use client'

import { useEffect, useState } from "react";

export interface IPessoa {
    id: string;
    nome_razao: string;
    cnpj_cpf: string;
}

export const usePessoas = () => {
    const [pessoas, setPessoas] = useState<IPessoa[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/pessoa/list")
            .then((response) => response.json())
            .then((data) => setPessoas(data.pessoas));
    }, []);

    return {
        pessoas
    };
};