import { z } from 'zod';
import { PessoaSchema } from '../schemas/PessoaSchema';
import { VeiculoSchema } from '@/schemas/VeiculoSchema';
import { ContaSchema } from '@/schemas/ContaSchema';

const id = z.object({ id: z.string() });
const nome_razao = z.object({ nome_razao: z.string() });
const cnpj_cpf = z.object({ cnpj_cpf: z.string() })

const newPessoaSchema = PessoaSchema.merge(id);
export type PessoaFormInput = z.infer<typeof newPessoaSchema>;

const newVeiculoSchema = VeiculoSchema.merge(id);
export type VeiculoFormInput = z.infer<typeof newVeiculoSchema>;

const newContaSchema = ContaSchema.merge(id);
export type ContaFormInput = z.infer<typeof newContaSchema>;

const newContaDataViewSchema = ContaSchema.merge(id).merge({ 
    id: id, 
    nome_razao: nome_razao,
    cnpj_cpf : cnpj_cpf
});
export type ContaDataView = z.infer<typeof newContaDataViewSchema>;
