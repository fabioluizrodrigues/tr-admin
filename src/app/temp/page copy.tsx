'use client'

import axios from 'axios';
import AsyncSelect from 'react-select/async';

export interface PessoaOption {
  readonly value: string;
  readonly label: string;
}

const loadPessoaOptions = (inputValue: string, callback: (pessoas: PessoaOption[]) => void) => {
  axios.get('/api/pessoa/list-select', { params: { filter: inputValue } })
    .then(response => {
      const pessoas = response.data.map((item: any) => ({
        value: item.id,
        label: item.nome_razao
      }))
      callback(pessoas);
    });
}

export default function Home() {

  return (
    <div>

      <AsyncSelect
        //{...field}
        name='pessoa_id'
        isClearable
        defaultOptions
        loadOptions={loadPessoaOptions}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            padding: '5px'
          })
        }}
      />
    </div>
  );
}
