'use client'

import { Pessoa } from '@prisma/client';
import axios from 'axios';
import { useRef, useState } from 'react';
import * as masks from '@/lib/masks';

export default function Home() {

  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const [pesquisa, setPesquisa] = useState<string>('');

  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  const loadPessoas = async () => {
    axios.get('/api/pessoa/list-select', { params: { filter: pesquisa } }).then(function (response) {
      setPessoas(response.data as Pessoa[]);
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
    }
  };

  return (
    <div className='flex join'>
      <input
        type="text"
        className='input input-primary input-ghost join-item w-40'
        onChange={e => setPesquisa(e.target.value)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      <select
        ref={selectRef}
        className="select select-success join-item w-full"
      >
        <option value=''></option>
        {pessoas.map(pessoa => (
          <option key={pessoa.id} value={pessoa.id}>
            {pessoa.nome_razao} - ({masks.cpfOrCnpjMask.mask(pessoa.cnpj_cpf)}) - {pessoa.municipio}/{pessoa.uf}
          </option>
        ))}
      </select>
    </div>
  );
}
