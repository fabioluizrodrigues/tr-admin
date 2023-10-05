import { isValidCNPJ, isValidMobilePhone, isValidCPF, isValidCEP, getStates, isValidPhone } from '@brazilian-utils/brazilian-utils';
import { z } from 'zod';
import * as masks from "@/lib/masks";
import { FLAG_SIM_NAO } from '@prisma/client';

export const PessoaSchema = z.object({
    nome_razao: z.string()
        .nonempty('Informe o nome ou razão social')
        .transform(name => {
            return name.trim().split(' ').map(word => {
                return word[0].toLocaleUpperCase().concat(word.substring(1).toLocaleLowerCase())
            }).join(' ')
        }),
    cnpj_cpf: z.string()
        .refine(value => isValidCNPJ(value) || isValidCPF(value), 'CNPJ/CPF inválido.')
        .transform<String>(masks.cpfOrCnpjMask.transform)
        .optional()
        .or(z.literal('')),
    ie_rg: z.string(),
    cep: z.string()
        .refine(value => isValidCEP(value), 'CEP inválido.')
        .transform<String>(masks.cepMask.transform)
        .optional()
        .or(z.literal('')),
    endereco: z.string()
        .nonempty('Informe o endereço.'),
    bairro: z.string()
        .nonempty('Informe o bairro.'),
    numero: z.string()
        .nonempty('Informe o número.'),
    municipio: z.string()
        .nonempty('Informe o município.'),
    uf: z.string()
        .nonempty('Informe o estado(uf).'),
    telefone: z.string()
        .refine(value => isValidPhone(value), 'Telefone inválido.')
        .transform<String>(masks.phoneMask.transform)
        .optional()
        .or(z.literal('')),
    celular: z.string()
        .nonempty('Informe o celular')
        .refine(value => isValidMobilePhone(value), 'Celular inválido')
        .transform<String>(masks.phoneMask.transform)
        .optional()
        .or(z.literal('')),
    email: z.string()
        .email()
        .toLowerCase()
        .optional()
        .or(z.literal('')),
    observacoes: z.string().optional(),
    ativo: z.enum([FLAG_SIM_NAO.SIM, FLAG_SIM_NAO.NAO]),
});