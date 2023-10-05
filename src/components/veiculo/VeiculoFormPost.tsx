'use client'

import { VeiculoFormInput } from '@/types'
import { FC } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { VeiculoSchema } from '@/schemas/VeiculoSchema'
import * as masks from '@/lib/masks';
import { ChevronLeft, Save } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { FLAG_SIM_NAO } from '@prisma/client';


interface VeiculoFormPostProps {
    submit: SubmitHandler<VeiculoFormInput>;
    isEditing: boolean;
    initialValue?: VeiculoFormInput;
    id?: string;
}

const VeiculoFormPost: FC<VeiculoFormPostProps> = ({ submit, isEditing, initialValue, id }) => {

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<VeiculoFormInput>({
        resolver: zodResolver(VeiculoSchema),
        defaultValues: isEditing ? {
            ...initialValue,
            placa: masks.placaMask.maskDefault(String(initialValue?.placa)),
        } : {}
    });

    function handleCancelButton(): void {
        if (isEditing) {
            router.back();
        } else {
            router.push('/veiculo');
        }
    }

    return (
        <form onSubmit={handleSubmit(submit)} className=''>
            <div className='grid md:grid-cols-8 lg:grid-cols-8 gap-2 card w-full bg-white shadow px-5 py-2'>

                <div className="form-control w-full md:col-span-2">
                    <label className="label">
                        <span className="label-text">Placa</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <input
                        type="text"
                        {...register('placa')}
                        placeholder=""
                        className="input input-bordered w-full "
                        onChange={masks.placaMask.onChange}
                    />
                    <label className="label">
                        {errors.placa && <span className="label-text-alt text-red-500">{errors.placa.message}</span>}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </label>
                </div>

                <div className="form-control w-full md:col-span-2">
                    <label className="label">
                        <span className="label-text">Renavam</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <input
                        type="text"
                        {...register('renavam')}
                        placeholder=""
                        className="input input-bordered w-full"
                    />
                    <label className="label">
                        {errors.renavam && <span className="label-text-alt text-red-500">{errors.renavam.message}</span>}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </label>
                </div>

                <div className="form-control w-full md:col-span-1">
                    <label className="label">
                        <span className="label-text">Qtde Eixos</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <input
                        type="text"
                        {...register('nr_eixos')}
                        placeholder=""
                        className="input input-bordered w-full"
                    />
                    <label className="label">
                        {errors.nr_eixos && <span className="label-text-alt text-red-500">{errors.nr_eixos.message}</span>}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </label>
                </div>

                <div className="form-control w-full md:col-span-1">
                    <label className="label">
                        <span className="label-text">Ano Fabrica</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        {...register('ano_fabrica')}
                        className="input input-bordered w-full"
                    />
                    <label className="label">
                        {errors.ano_fabrica && <span className="label-text-alt text-red-500">{errors.ano_fabrica.message}</span>}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </label>
                </div>

                <div className="form-control w-full  md:col-span-1">
                    <label className="label">
                        <span className="label-text">Ano Modelo</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <input
                        type="text"
                        {...register('ano_modelo')}
                        placeholder=""
                        className="input input-bordered w-full"
                    />
                    <label className="label">
                        {errors.ano_modelo && <span className="label-text-alt text-red-500">{errors.ano_modelo.message}</span>}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </label>
                </div>

                <div className="form-control w-full  md:col-span-1">
                    <label className="label">
                        <span className="label-text">Ano Exercício</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <input
                        type="text"
                        {...register('ano_exercicio')}
                        placeholder=""
                        className="input input-bordered w-full"
                    />
                    <label className="label">
                        {errors.ano_exercicio && <span className="label-text-alt text-red-500">{errors.ano_exercicio.message}</span>}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </label>
                </div>


                <div className="form-control w-full md:col-span-2">
                    <label className="label">
                        <span className="label-text">Cor</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <input
                        type="text"
                        {...register('cor')}
                        placeholder=""
                        className="input input-bordered w-full"
                    />
                    <label className="label">
                        {errors.cor && <span className="label-text-alt text-red-500">{errors.cor.message}</span>}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </label>
                </div>

                <div className="form-control w-full md:col-span-3">
                    <label className="label">
                        <span className="label-text">Marca</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <input
                        type="text"
                        {...register('marca')}
                        placeholder=""
                        className="input input-bordered w-full"
                    />
                    <label className="label">
                        {errors.marca && <span className="label-text-alt text-red-500">{errors.marca.message}</span>}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </label>
                </div>

                <div className="form-control w-full md:col-span-3">
                    <label className="label">
                        <span className="label-text">Modelo</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <input
                        type="text"
                        {...register('modelo')}
                        placeholder=""
                        className="input input-bordered w-full"
                    />
                    <label className="label">
                        {errors.modelo && <span className="label-text-alt text-red-500">{errors.modelo.message}</span>}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </label>
                </div>

                <div className="form-control w-full  md:col-span-3"></div>

                <div className="form-control w-full md:col-span-7">
                    <label className="label">
                        <span className="label-text">Observações</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <input
                        type="text"
                        {...register('observacoes')}
                        placeholder=""
                        className="input input-bordered w-full"
                    />
                    <label className="label">
                        {errors.observacoes && <span className="label-text-alt text-red-500">{errors.observacoes.message}</span>}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </label>
                </div>

                <div className="form-control w-full md:col-span-1">
                    <label className="label">
                        <span className="label-text">Ativo</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <select
                        {...register('ativo')}
                        className="select select-bordered"
                    >
                        <option value={FLAG_SIM_NAO.SIM}>Sim</option>
                        <option value={FLAG_SIM_NAO.NAO}>Não</option>
                    </select>
                    <label className="label">
                        {errors.ativo && <span className="label-text-alt text-red-500">{errors.ativo.message}</span>}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </label>
                </div>

            </div>

            <div className='flex flex-row gap-3 w-full  py-4'>
                <button type='submit' className='btn btn-primary'>
                    <Save />{isEditing ? 'Salvar alteração' : 'Salvar novo registro'}
                </button>
                <button onClick={() => handleCancelButton()} className='btn'>
                    <ChevronLeft />Cancelar
                </button>
            </div>

        </form>


    )
}

export default VeiculoFormPost