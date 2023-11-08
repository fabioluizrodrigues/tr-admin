'use client'

import { FreteFormInput } from '@/types'
import { FC } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FreteSchema } from '@/schemas/FreteSchema'
import * as masks from '@/lib/masks';
import { ChevronLeft, Save } from 'lucide-react'
import { useRouter } from 'next/navigation';
import SelectConta from '../conta/SelectConta';
import SelectPessoa from '../pessoa/SelectPessoa';
import SelectVeiculo from '../veiculo/SelectVeiculo';
import { FreteCalc, TFreteCalc } from '../../lib/frete-calculos';
import { formatCurrency } from '@brazilian-utils/brazilian-utils';

interface FreteFormPostProps {
    submit: SubmitHandler<FreteFormInput>;
    isEditing: boolean;
    initialValue?: FreteFormInput;
    id?: string;
}

const FreteFormPost: FC<FreteFormPostProps> = ({ submit, isEditing, initialValue, id }) => {

    const router = useRouter();

    const freteForm = useForm<FreteFormInput>({
        resolver: zodResolver(FreteSchema),
        defaultValues: isEditing ? {
            ...initialValue,
            // cnpj_cpf: masks.cpfOrCnpjMask.maskDefault(String(initialValue?.cnpj_cpf)),
            // cep: masks.cepMask.maskDefault(String(initialValue?.cep)),
            // telefone: masks.phoneMask.maskDefault(String(initialValue?.telefone)),
            // celular: masks.phoneMask.maskDefault(String(initialValue?.celular)),
        } : {}
    });

    const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = freteForm

    const handleCancelButton = () => {
        if (isEditing) {
            router.back();
        } else {
            router.push('/frete');
        }
    }

    const handleFreteCalculo = () => {
        let inputFreteCalc: TFreteCalc = {
            vlr_tarifa: masks.currencyMask.transform(getValues('vlr_tarifa')),
            peso_saida: masks.currencyMask.transform(getValues('peso_saida')),
            vlr_bruto: 0,
            vlr_pedagio: masks.currencyMask.transform(getValues('vlr_pedagio')),
            peso_chegada: masks.currencyMask.transform(getValues('peso_chegada')),
            vlr_quebra: masks.currencyMask.transform(getValues('vlr_quebra')),
            vlr_desconto: masks.currencyMask.transform(getValues('vlr_desconto')),
            vlr_liquido: 0,
            perc_comissao: masks.currencyMask.transform(getValues('perc_comissao')),
            vlr_comissao: 0,
        }

        let output = FreteCalc.calcula(inputFreteCalc);

        //output.vlr_bruto = masks.phoneMask.mask(String(output.vlr_bruto));

        console.log(output);

        setValue('vlr_bruto', output.vlr_bruto, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        });

        setValue('vlr_liquido', output.vlr_liquido, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        });

        setValue('vlr_comissao', output.vlr_comissao, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        });

    }

    const str_vlr_bruto = watch('vlr_bruto');
    const str_vlr_liquido = watch('vlr_liquido');
    const str_vlr_comissao = watch('vlr_comissao');

    return (
        <FormProvider {...freteForm}>
            <form onSubmit={handleSubmit(submit)}>

                <div className="grid md:grid-cols-12 lg:grid-cols-12 md:grid-rows-7 lg:grid-rows-7 gap-x-1 card-normal w-full bg-white shadow px-5 py-5">

                    {/* data_doc */}
                    <div className=" md:col-span-2">
                        <label className="label">
                            <span className="label-text">Data Doc.</span>
                        </label>
                        <input
                            type="text"
                            autoComplete='off'
                            {...register('data_doc')}
                            className="input input-bordered w-full"
                            onChange={masks.dateMask.onChange}
                        />
                        <label className="label">
                            {errors.data_doc && <span className="label-text-alt text-red-500">{errors.data_doc.message}</span>}
                        </label>
                    </div>

                    {/* cliente_id */}
                    <div className=" md:col-span-6 md:col-start-3">
                        <label className="label">
                            <span className="label-text">Cliente</span>
                        </label>

                        <SelectPessoa name='cliente_id' isediting={isEditing} />

                        <label className="label">
                            {errors.cliente_id && <span className="label-text-alt text-red-500">{errors.cliente_id.message}</span>}
                        </label>
                    </div>

                    {/* nr_doc */}
                    <div className=" md:col-span-2 md:col-start-9">
                        <div className=" col-span-2">
                            <label className="label">
                                <span className="label-text">Nr. Documento</span>
                            </label>
                            <input
                                type="text"
                                autoComplete='off'
                                {...register('nr_doc')}
                                className="input input-bordered w-full"
                            />
                            <label className="label">
                                {errors.nr_doc && <span className="label-text-alt text-red-500">{errors.nr_doc.message}</span>}
                            </label>
                        </div>
                    </div>

                    {/* nr_ordem */}
                    <div className=" md:col-span-2 md:col-start-11">
                        <div className=" col-span-2">
                            <label className="label">
                                <span className="label-text">Nr. Ordem</span>
                            </label>
                            <input
                                type="text"
                                autoComplete='off'
                                {...register('nr_ordem')}
                                className="input input-bordered w-full"
                            />
                            <label className="label">
                                {errors.nr_ordem && <span className="label-text-alt text-red-500">{errors.nr_ordem.message}</span>}
                            </label>
                        </div>
                    </div>

                    {/* local_embarque  */}
                    <div className=" md:col-span-6 md:row-start-2">
                        <div className=" col-span-2">
                            <label className="label">
                                <span className="label-text">Local de Embarque/Carregamento</span>
                            </label>
                            <input
                                type="text"
                                autoComplete='off'
                                {...register('local_embarque')}
                                className="input input-bordered w-full"
                            />
                            <label className="label">
                                {errors.local_embarque && <span className="label-text-alt text-red-500">{errors.local_embarque.message}</span>}
                            </label>
                        </div>
                    </div>

                    {/* local_descarga */}
                    <div className=" md:col-span-6 md:col-start-7 row-start-2">
                        <div className=" col-span-2">
                            <label className="label">
                                <span className="label-text">Local de Descarga/Descarregamento</span>
                            </label>
                            <input
                                type="text"
                                autoComplete='off'
                                {...register('local_descarga')}
                                className="input input-bordered w-full"
                            />
                            <label className="label">
                                {errors.local_descarga && <span className="label-text-alt text-red-500">{errors.local_descarga.message}</span>}
                            </label>
                        </div>
                    </div>

                    {/* cavalo_id */}
                    <div className=" md:col-span-6 md:row-start-3">
                        <label className="label">
                            <span className="label-text">Cavalo/Caminhão</span>
                        </label>

                        <SelectVeiculo name='cavalo_id' isediting={isEditing} />

                        <label className="label">
                            {errors.cavalo_id && <span className="label-text-alt text-red-500">{errors.cavalo_id.message}</span>}
                        </label>
                    </div>

                    {/* reboque1_id */}
                    <div className=" md:col-span-6 md:col-start-1 md:row-start-4">
                        <label className="label">
                            <span className="label-text">Reboque 1</span>
                        </label>

                        <SelectVeiculo name='reboque1_id' isediting={isEditing} />

                        <label className="label">
                            {errors.reboque1_id && <span className="label-text-alt text-red-500">{errors.reboque1_id.message}</span>}
                        </label>
                    </div>

                    {/* reboque2_id */}
                    <div className=" md:col-span-6 md:col-start-1 md:row-start-5">
                        <label className="label">
                            <span className="label-text">Reboque 2</span>
                        </label>

                        <SelectVeiculo name='reboque2_id' isediting={isEditing} />

                        <label className="label">
                            {errors.reboque2_id && <span className="label-text-alt text-red-500">{errors.reboque2_id.message}</span>}
                        </label>
                    </div>

                    {/* reboque3_id */}
                    <div className=" md:col-span-6 md:col-start-1 md:row-start-6">
                        <label className="label">
                            <span className="label-text">Reboque 3</span>
                        </label>

                        <SelectVeiculo name='reboque3_id' isediting={isEditing} />

                        <label className="label">
                            {errors.reboque3_id && <span className="label-text-alt text-red-500">{errors.reboque3_id.message}</span>}
                        </label>
                    </div>

                    {/* motorista_id */}
                    <div className=" md:col-span-6 md:col-start-1 md:row-start-7">
                        <label className="label">
                            <span className="label-text">Motorista</span>
                        </label>

                        <SelectPessoa name='motorista_id' isediting={isEditing} />

                        <label className="label">
                            {errors.motorista_id && <span className="label-text-alt text-red-500">{errors.motorista_id.message}</span>}
                        </label>
                    </div>

                    {/* vlr_tarifa */}
                    <div className=" md:col-span-2 md:col-start-7 md:row-start-3">
                        <label className="label">
                            <span className="label-text">Valor da Tarifa</span>
                        </label>
                        <input
                            type="text"
                            {...register('vlr_tarifa')}
                            autoComplete='off'
                            className="input input-bordered w-full"
                            onChange={masks.currencyMask.onChange}
                        />
                        <label className="label">
                            {errors.vlr_tarifa && <span className="label-text-alt text-red-500">{errors.vlr_tarifa.message}</span>}
                        </label>
                    </div>

                    {/* peso_saida */}
                    <div className="md:col-span-2 md:col-start-9 md:row-start-3">
                        <label className="label">
                            <span className="label-text">Peso Carregado</span>
                        </label>
                        <input
                            type="text"
                            {...register('peso_saida')}
                            autoComplete='off'
                            className="input input-bordered w-full"
                            onChange={masks.currencyMask.onChange}
                        />
                        <label className="label">
                            {errors.peso_saida && <span className="label-text-alt text-red-500">{errors.peso_saida.message}</span>}
                        </label>
                    </div>

                    {/* vlr_bruto */}
                    <div className="md:col-span-2 md:col-start-11 md:row-start-3">
                        <label className="label">
                            <span className="label-text">Valor Bruto</span>
                        </label>
                        <input type="hidden" {...register('vlr_bruto')} />
                        <input
                            type="text"
                            className="input input-disabled w-full"
                            disabled={true}
                            value={formatCurrency(str_vlr_bruto | 0)}
                        />
                        <label className="label">
                            {errors.vlr_bruto && <span className="label-text-alt text-red-500">{errors.vlr_bruto.message}</span>}
                        </label>
                    </div>

                    {/* vlr_pedagio */}
                    <div className="md:col-span-2 md:col-start-7 md:row-start-4">
                        <label className="label">
                            <span className="label-text">Valor do Pedágio</span>
                        </label>
                        <input
                            type="text"
                            {...register('vlr_pedagio')}
                            autoComplete='off'
                            className="input input-bordered w-full"
                            onChange={masks.currencyMask.onChange}
                        />
                        <label className="label">
                            {errors.vlr_pedagio && <span className="label-text-alt text-red-500">{errors.vlr_pedagio.message}</span>}
                        </label>
                    </div>

                    {/* peso_chegada */}
                    <div className="md:col-span-2 md:col-start-7 md:row-start-5">
                        <label className="label">
                            <span className="label-text">Peso Chegada</span>
                        </label>
                        <input
                            type="text"
                            {...register('peso_chegada')}
                            autoComplete='off'
                            className="input input-bordered w-full"
                            onChange={masks.currencyMask.onChange}
                        />
                        <label className="label">
                            {errors.peso_chegada && <span className="label-text-alt text-red-500">{errors.peso_chegada.message}</span>}
                        </label>
                    </div>

                    {/* vlr_quebra */}
                    <div className="md:col-span-2 md:col-start-9 md:row-start-5">
                        <label className="label">
                            <span className="label-text">Valor da Quebra</span>
                        </label>
                        <input
                            type="text"
                            {...register('vlr_quebra')}
                            autoComplete='off'
                            className="input input-bordered w-full"
                        />
                        <label className="label">
                            {errors.vlr_quebra && <span className="label-text-alt text-red-500">{errors.vlr_quebra.message}</span>}
                        </label>
                    </div>

                    {/* vlr_desconto */}
                    <div className="md:col-span-2 md:col-start-11 md:row-start-5">
                        <label className="label">
                            <span className="label-text">Valor do Desconto</span>
                        </label>
                        <input
                            type="text"
                            {...register('vlr_desconto')}
                            autoComplete='off'
                            className="input input-bordered w-full"
                        />
                        <label className="label">
                            {errors.vlr_desconto && <span className="label-text-alt text-red-500">{errors.vlr_desconto.message}</span>}
                        </label>
                    </div>

                    {/* vlr_liquido */}
                    <div className="md:col-span-2 md:col-start-7 md:row-start-6">
                        <label className="label">
                            <span className="label-text">Valor Líquido</span>
                        </label>
                        <input type="hidden" {...register('vlr_liquido')} />
                        <input
                            type="text"
                            className="input input-disabled w-full"
                            disabled={true}
                            value={formatCurrency(str_vlr_liquido | 0)}
                        />

                        <label className="label">
                            {errors.vlr_liquido && <span className="label-text-alt text-red-500">{errors.vlr_liquido.message}</span>}
                        </label>
                    </div>

                    {/* perc_comissao */}
                    <div className="md:col-span-2 md:col-start-9 md:row-start-6">
                        <label className="label">
                            <span className="label-text">Perc. Comissão (%)</span>
                        </label>
                        <input
                            type="text"
                            {...register('perc_comissao')}
                            autoComplete='off'
                            className="input input-bordered w-full"
                        />
                        <label className="label">
                            {errors.perc_comissao && <span className="label-text-alt text-red-500">{errors.perc_comissao.message}</span>}
                        </label>
                    </div>

                    {/* vlr_comissao */}
                    <div className="md:col-span-2 md:col-start-11 md:row-start-6">
                        <label className="label">
                            <span className="label-text">Valor de Comissão</span>
                        </label>
                        <input type="hidden" {...register('vlr_comissao')} />
                        <input
                            type="text"
                            className="input input-disabled w-full"
                            disabled={true}
                            value={formatCurrency(str_vlr_comissao | 0)}
                        />
                        <label className="label">
                            {errors.vlr_comissao && <span className="label-text-alt text-red-500">{errors.vlr_comissao.message}</span>}
                        </label>
                    </div>

                    {/* conta_id */}
                    <div className=" md:col-span-6 md:col-start-7 md:row-start-7">
                        <label className="label">
                            <span className="label-text">Conta Caixa</span>
                        </label>

                        <SelectConta name='conta_id' isediting={isEditing} />

                        <label className="label">
                            {errors.conta_id && <span className="label-text-alt text-red-500">{errors.conta_id.message}</span>}
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
            <button type='reset' onClick={() => handleFreteCalculo()} className='btn'>Calcular</button>
        </FormProvider>

    )
}

export default FreteFormPost