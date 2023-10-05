'use client'

import { IsEmptyList } from '@/components/IsEmptyList';
import { IsLoadingPanel } from '@/components/IsLoadingPanel';
import Paginator from '@/components/Paginator';
import ContaCard from '@/components/conta/ContaCardList';
import { AppConstants } from '@/lib/constants';
import { ContaDataView } from '@/types';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

const LIMIT = AppConstants.NR_REGISTRO_POR_PAGINA;
const ESTADO_INICIAL_TOTAL_DE_CONTAS: number = -1;

export default function ContaListPage() {

  const [contas, setContas] = useState<ContaDataView[]>([]);
  const [totalContas, setTotalContas] = useState<number>(ESTADO_INICIAL_TOTAL_DE_CONTAS);
  const [offset, setOffSet] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [text, setText] = useState('');
  const [debouncedText] = useDebounce(text, 700);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/conta/list', {
      params: {
        page: offset,
        limit: LIMIT,
        filter: debouncedText
      }
    }).then(function (response) {
      setContas(response.data.contas);
      setTotalContas(response.data.total)
      setIsLoading(false);
    })

  }, [debouncedText, offset])

  return (
    <div>
      <div className='flex flex-row items-center justify-between text-2xl font-semibold mb-2 '>
        <div>
          <h2>Lista de Contas</h2>
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
          <Link href='/conta/create' className='btn btn-primary btn-outline btn-sm'>
            Criar Conta
          </Link>
        </div>
      </div>

      {isLoading && <IsLoadingPanel message='Carregando contas...' />}

      {(totalContas > 0) &&
        <div className='flex flex-col gap-2'>
          {contas.map(conta => (
            <ContaCard key={conta.id} conta={conta} />
          ))}
        </div>
      }

      {(totalContas > 0) &&
        <div className='flex flex-col items-center'>
          <Paginator
            limit={LIMIT}
            total={totalContas}
            offset={offset}
            setOffSet={setOffSet}
          />
        </div>
      }

      {(totalContas === 0) && <IsEmptyList />}

    </div >
  )
}
