'use client'

import { IsEmptyList } from '@/components/IsEmptyList';
import { IsLoadingPanel } from '@/components/IsLoadingPanel';
import Paginator from '@/components/Paginator';
import FreteCard from '@/components/frete/FreteCardList'
import { AppConstants } from '@/lib/constants';
import { FreteFormInput } from '@/types';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

const LIMIT = AppConstants.NR_REGISTRO_POR_PAGINA;
const ESTADO_INICIAL_TOTAL_DE_FRETES: number = -1;

export default function FreteListPage() {

  const [fretes, setFretes] = useState<FreteFormInput[]>([]);
  const [totalFretes, setTotalFretes] = useState<number>(ESTADO_INICIAL_TOTAL_DE_FRETES);
  const [offset, setOffSet] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [text, setText] = useState('');
  const [debouncedText] = useDebounce(text, 700);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/frete/list', {
      params: {
        page: offset,
        limit: LIMIT,
        filter: debouncedText
      }
    }).then(function (response) {
      setFretes(response.data.fretes);
      setTotalFretes(response.data.total)
      setIsLoading(false);
    })

  }, [debouncedText, offset])

  return (
    <div>
      <div className='flex flex-row items-center justify-between text-2xl font-semibold mb-2 '>
        <div>
          <h2>Lista de Fretes</h2>
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
          <Link href='/frete/create' className='btn btn-primary btn-outline btn-sm'>
            Criar Frete
          </Link>
        </div>
      </div>

      {isLoading && <IsLoadingPanel message='Carregando fretes...' />}

      {(totalFretes > 0) &&
        <div className='flex flex-col gap-2'>
          {fretes.map(frete => (
            <FreteCard key={frete.id} frete={frete} />
          ))}
        </div>
      }

      {(totalFretes > 0) &&
        <div className='flex flex-col items-center'>
          <Paginator
            limit={LIMIT}
            total={totalFretes}
            offset={offset}
            setOffSet={setOffSet}
          />
        </div>
      }

      {(totalFretes === 0) && <IsEmptyList />}

    </div >
  )
}
