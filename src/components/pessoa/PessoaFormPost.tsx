'use client'
import { PessoaFormInput } from '@/types'
import { FC } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { PessoaSchema } from '@/schemas/PessoaSchema'
import { getStates } from '@brazilian-utils/brazilian-utils';
import * as masks from '@/lib/masks';
import { ChevronLeft, Save } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { FLAG_SIM_NAO } from '@prisma/client';


interface PessoaFormPostProps {
    submit: SubmitHandler<PessoaFormInput>;
    isEditing: boolean;
    initialValue?: PessoaFormInput;
    id?: string;
}

const PessoaFormPost: FC<PessoaFormPostProps> = ({ submit, isEditing, initialValue, id }) => {

    const router = useRouter();
    const estados = getStates();

    const { register, handleSubmit, formState: { errors } } = useForm<PessoaFormInput>({
        resolver: zodResolver(PessoaSchema),
        defaultValues: isEditing ? {
            ...initialValue,
            cnpj_cpf: masks.cpfOrCnpjMask.maskDefault(String(initialValue?.cnpj_cpf)),
            cep: masks.cepMask.maskDefault(String(initialValue?.cep)),
            telefone: masks.phoneMask.maskDefault(String(initialValue?.telefone)),
            celular: masks.phoneMask.maskDefault(String(initialValue?.celular)),
        } : {}
    });

    function handleCancelButton(): void {
        if (isEditing) {
            router.back();
        } else {
            router.push('/pessoa');
        }
    }

    return (
        <form onSubmit={handleSubmit(submit)} className=''>
            <div className='grid md:grid-cols-8 lg:grid-cols-8 gap-2 card w-full bg-white shadow px-5 py-2'>

                <div className="form-control w-full md:col-span-4">
                    <label className="label">
                        <span className="label-text">Nome / Razão Social</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <input
                        type="text"
                        {...register('nome_razao')}
                        placeholder=""
                        className="input input-bordered w-full "
                    />
                    <label className="label">
                        {errors.nome_razao && <span className="label-text-alt text-red-500">{errors.nome_razao.message}</span>}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </label>
                </div>

                <div className="form-control w-full md:col-span-2">
                    <label className="label">
                        <span className="label-text">CPF / CNPJ</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <input
                        type="text"
                        {...register('cnpj_cpf')}
                        placeholder=""
                        className="input input-bordered w-full"
                        onChange={masks.cpfOrCnpjMask.onChange}
                    />
                    <label className="label">
                        {errors.cnpj_cpf && <span className="label-text-alt text-red-500">{errors.cnpj_cpf.message}</span>}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </label>
                </div>

                <div className="form-control w-full md:col-span-2">
                    <label className="label">
                        <span className="label-text">RG / IE</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <input
                        type="text"
                        {...register('ie_rg')}
                        placeholder=""
                        className="input input-bordered w-full"
                    />
                    <label className="label">
                        {errors.ie_rg && <span className="label-text-alt text-red-500">{errors.ie_rg.message}</span>}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </label>
                </div>

                <div className="form-control w-full md:col-span-2">
                    <label className="label">
                        <span className="label-text">CEP</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        {...register('cep')}
                        className="input input-bordered w-full"
                        onChange={masks.cepMask.onChange}
                    />
                    <label className="label">
                        {errors.cep && <span className="label-text-alt text-red-500">{errors.cep.message}</span>}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </label>
                </div>

                <div className="form-control w-full  md:col-span-4">
                    <label className="label">
                        <span className="label-text">Endereço</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <input
                        type="text"
                        {...register('endereco')}
                        placeholder=""
                        className="input input-bordered w-full"
                    />
                    <label className="label">
                        {errors.endereco && <span className="label-text-alt text-red-500">{errors.endereco.message}</span>}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </label>
                </div>

                <div className="form-control w-full  md:col-span-2">
                    <label className="label">
                        <span className="label-text">Número</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <input
                        type="text"
                        {...register('numero')}
                        placeholder=""
                        className="input input-bordered w-full"
                    />
                    <label className="label">
                        {errors.numero && <span className="label-text-alt text-red-500">{errors.numero.message}</span>}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </label>
                </div>

                <div className="form-control w-full md:col-span-3">
                    <label className="label">
                        <span className="label-text">Bairro</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <input
                        type="text"
                        {...register('bairro')}
                        placeholder=""
                        className="input input-bordered w-full"
                    />
                    <label className="label">
                        {errors.bairro && <span className="label-text-alt text-red-500">{errors.bairro.message}</span>}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </label>
                </div>

                <div className="form-control w-full md:col-span-3">
                    <label className="label">
                        <span className="label-text">Município</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <input
                        type="text"
                        {...register('municipio')}
                        placeholder=""
                        className="input input-bordered w-full"
                    />
                    <label className="label">
                        {errors.municipio && <span className="label-text-alt text-red-500">{errors.municipio.message}</span>}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </label>
                </div>

                <div className="form-control w-full md:col-span-2">
                    <label className="label">
                        <span className="label-text">UF/Estado</span>
                        {/* <span className="label-text-alt">Alt label</span> */}
                    </label>
                    <select
                        {...register('uf')}
                        className="select select-bordered"
                    >
                        <option value="">Selecione...</option>
                        {estados.map(item => (
                            <option key={item.code} value={item.code}>{item.name}</option>
                        ))}
                    </select>
                    <label className="label">
                        {errors.uf && <span className="label-text-alt text-red-500">{errors.uf.message}</span>}
                        {/* <span className="label-text-alt">Alt label</span> */}
                    </label>
                </div>

                <div className="form-control w-full md:col-span-2">
                    <label className="label">
                        <span className="label-text">Telefone</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <input
                        type="text"
                        {...register('telefone')}
                        placeholder=""
                        className="input input-bordered w-full"
                        onChange={masks.phoneMask.onChange}
                    />
                    <label className="label">
                        {errors.telefone && <span className="label-text-alt text-red-500">{errors.telefone.message}</span>}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </label>
                </div>

                <div className="form-control w-full md:col-span-2">
                    <label className="label">
                        <span className="label-text">Celular</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <input
                        type="text"
                        {...register('celular')}
                        placeholder=""
                        className="input input-bordered w-full"
                        onChange={masks.phoneMask.onChange}
                    />
                    <label className="label">
                        {errors.celular && <span className="label-text-alt text-red-500">{errors.celular.message}</span>}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </label>
                </div>

                <div className="form-control w-full md:col-span-4">
                    <label className="label">
                        <span className="label-text">E-Mail</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <input
                        type="text"
                        {...register('email')}
                        placeholder=""
                        className="input input-bordered w-full"
                    />
                    <label className="label">
                        {errors.email && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </label>
                </div>

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

export default PessoaFormPost