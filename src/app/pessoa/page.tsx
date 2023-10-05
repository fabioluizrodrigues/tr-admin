'use client'

import { IsEmptyList } from '@/components/IsEmptyList';
import { IsLoadingPanel } from '@/components/IsLoadingPanel';
import Paginator from '@/components/Paginator';
import PessoaCard from '@/components/pessoa/PessoaCardList'
import { AppConstants } from '@/lib/constants';
import { PessoaFormInput } from '@/types';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

const LIMIT = AppConstants.NR_REGISTRO_POR_PAGINA;
const ESTADO_INICIAL_TOTAL_DE_PESSOAS: number = -1;

export default function PessoaListPage() {

  const [pessoas, setPessoas] = useState<PessoaFormInput[]>([]);
  const [totalPessoas, setTotalPessoas] = useState<number>(ESTADO_INICIAL_TOTAL_DE_PESSOAS);
  const [offset, setOffSet] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [text, setText] = useState('');
  const [debouncedText] = useDebounce(text, 700);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/pessoa/list', {
      params: {
        page: offset,
        limit: LIMIT,
        filter: debouncedText
      }
    }).then(function (response) {
      setPessoas(response.data.pessoas);
      setTotalPessoas(response.data.total)
      setIsLoading(false);
    })

  }, [debouncedText, offset])

  return (
    <div>
      <div className='flex flex-row items-center justify-between text-2xl font-semibold mb-2 '>
        <div>
          <h2>Lista de Pessoas</h2>
        </div>
        <div>
          <input
            type="text"
            placeholder='Pesquisar...'
            className='input input-bordered input-sm w-full'
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>
        <div>
          <Link href='/pessoa/create' className='btn btn-primary btn-outline btn-sm'>
            Criar Pessoa
          </Link>
        </div>
      </div>

      {isLoading && <IsLoadingPanel message='Carregando pessoas...' />}

      {(totalPessoas > 0) &&
        <div className='flex flex-col gap-2'>
          {pessoas.map(pessoa => (
            <PessoaCard key={pessoa.id} pessoa={pessoa} />
          ))}
        </div>
      }

      {(totalPessoas > 0) &&
        <div className='flex flex-col items-center'>
          <Paginator
            limit={LIMIT}
            total={totalPessoas}
            offset={offset}
            setOffSet={setOffSet}
          />
        </div>
      }

      {(totalPessoas === 0) && <IsEmptyList />}

    </div >
  )
}
