'use client'

import { IsEmptyList } from '@/components/IsEmptyList';
import { IsLoadingPanel } from '@/components/IsLoadingPanel';
import Paginator from '@/components/Paginator';
import VeiculoCard from '@/components/veiculo/VeiculoCardList'
import { AppConstants } from '@/lib/constants';
import { VeiculoFormInput } from '@/types';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

const LIMIT = AppConstants.NR_REGISTRO_POR_PAGINA;
const ESTADO_INICIAL_TOTAL_DE_VEICULOS: number = -1;

export default function VeiculoListPage() {

  const [veiculos, setVeiculos] = useState<VeiculoFormInput[]>([]);
  const [totalVeiculos, setTotalVeiculos] = useState<number>(ESTADO_INICIAL_TOTAL_DE_VEICULOS);
  const [offset, setOffSet] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [text, setText] = useState('');
  const [debouncedText] = useDebounce(text, 700);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/veiculo/list', {
      params: {
        page: offset,
        limit: LIMIT,
        filter: debouncedText
      }
    }).then(function (response) {
      setVeiculos(response.data.veiculos);
      setTotalVeiculos(response.data.total)
      setIsLoading(false);
    })

  }, [debouncedText, offset])

  return (
    <div>
      <div className='flex flex-row items-center justify-between text-2xl font-semibold mb-2 '>
        <div>
          <h2>Lista de Veículos</h2>
        </div>
        <div>
          <input
            type="text"
            placeholder='Pesquisar...'
            className='input input-bordered input-sm w-full'
            onChange={(e) => {
              setText(e.target.value);
              setOffSet(1);
            }}
          />
        </div>
        <div>
          <Link href='/veiculo/create' className='btn btn-primary btn-outline btn-sm'>
            Criar Veículo
          </Link>
        </div>
      </div>


      {isLoading && <IsLoadingPanel message='Carregando veículos...' />}

      {(totalVeiculos > 0) &&
        <div className='flex flex-col gap-2'>
          {veiculos.map(veiculo => (
            <VeiculoCard key={veiculo.id} veiculo={veiculo} />
          ))}
        </div>
      }

      {(totalVeiculos > 0) &&
        <div className='flex flex-col items-center'>
          <Paginator
            limit={LIMIT}
            total={totalVeiculos}
            offset={offset}
            setOffSet={setOffSet}
          />
        </div>
      }

      {(totalVeiculos === 0) && <IsEmptyList />}

    </div >
  )
}
