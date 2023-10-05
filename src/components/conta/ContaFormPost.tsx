'use client'

import { ContaFormInput } from '@/types'
import { FC } from 'react'
import { useForm, SubmitHandler, Controller, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, Save } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { ContaSchema } from '@/schemas/ContaSchema';
import { ContaTipo, FLAG_SIM_NAO, Pessoa } from '@prisma/client';
import SelectPessoa from '../pessoa/SelectPessoa';

interface ContaFormPostProps {
    submit: SubmitHandler<ContaFormInput>;
    isEditing: boolean;
    initialValue?: ContaFormInput;
    id?: string;
}

export interface PessoaOption {
    readonly value: string;
    readonly label: string;
}

const ContaFormPost: FC<ContaFormPostProps> = ({ submit, isEditing, initialValue, id }) => {

    const router = useRouter();

    const contaForm = useForm<ContaFormInput>({
        resolver: zodResolver(ContaSchema),
        defaultValues: isEditing ? {
            ...initialValue,
            // cnpj_cpf: masks.cpfOrCnpjMask.maskDefault(String(initialValue?.cnpj_cpf)),
            // cep: masks.cepMask.maskDefault(String(initialValue?.cep)),
            // telefone: masks.phoneMask.maskDefault(String(initialValue?.telefone)),
            // celular: masks.phoneMask.maskDefault(String(initialValue?.celular)),
        } : {}
    });

    const { register, handleSubmit, formState: { errors }, getValues } = contaForm;

    function handleCancelButton(): void {
        if (isEditing) {
            router.back();
        } else {
            router.push('/conta');
        }
    }

    return (
        <FormProvider {...contaForm}>
            <form onSubmit={handleSubmit(submit)}>
                <div className='grid md:grid-cols-8 lg:grid-cols-8 gap-2 card w-full bg-white shadow px-5 py-2'>

                    <div className="form-control w-full md:col-span-6">
                        <label className="label">
                            <span className="label-text">Pessoa</span>
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>

                        <SelectPessoa name='pessoa_id' isediting={isEditing} />

                        <label className="label">
                            {errors.pessoa_id && <span className="label-text-alt text-red-500">{errors.pessoa_id.message}</span>}
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>

                    <div className="form-control w-full md:col-span-2">
                        <label className="label">
                            <span className="label-text">Tipo</span>
                            {/* <span className="label-text-alt">Top Right label</span> */}
                        </label>

                        <select
                            {...register('tipo')}
                            className="select select-bordered"
                        >
                            <option value="">Selecione...</option>
                            <option value={ContaTipo.CAIXA}>Caixa Operação</option>
                            <option value={ContaTipo.ADMIN}>Administração</option>
                        </select>


                        <label className="label">
                            {errors.tipo && <span className="label-text-alt text-red-500">{errors.tipo.message}</span>}
                            {/* <span className="label-text-alt">Bottom Right label</span> */}
                        </label>
                    </div>

                    <div className="form-control w-full md:col-span-6">
                        <label className="label">
                            <span className="label-text">Descrição</span>
                            {/* <span className="label-text-alt">Top Right label</span> */}
                        </label>
                        <input
                            type="text"
                            {...register('descricao')}
                            placeholder=""
                            className="input input-bordered w-full"
                        />
                        <label className="label">
                            {errors.descricao && <span className="label-text-alt text-red-500">{errors.descricao.message}</span>}
                            {/* <span className="label-text-alt">Bottom Right label</span> */}
                        </label>
                    </div>

                    <div className="form-control w-full md:col-span-2">
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

            </form >
        </FormProvider>
    )
}

export default ContaFormPost