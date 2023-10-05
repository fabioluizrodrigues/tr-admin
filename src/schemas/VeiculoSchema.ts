import { isValidLicensePlate } from '@brazilian-utils/brazilian-utils';
import { z } from 'zod';
import * as masks from "@/lib/masks";
import { FLAG_SIM_NAO } from '@prisma/client';

export const VeiculoSchema = z.object({
    placa: z.string()
        .nonempty('Informe a placa')
        .refine(value => isValidLicensePlate(String(value)), 'Placa inválida')
        .transform<String>(masks.placaMask.transform)
        .transform<String>((value) => value.toUpperCase()),
    renavam: z.string()
        .nonempty('Informe o renavam.'),
    nr_eixos: z.coerce.string({
        required_error: 'Informe os eixos.',
        invalid_type_error: 'Valor inválido.'
    }),
    ano_fabrica: z.coerce.number({
        required_error: 'Informe o ano fábrica.',
        invalid_type_error: 'Valor inválido.'
    }),
    ano_modelo: z.coerce.number({
        required_error: 'Informe o ano modelo.',
        invalid_type_error: 'Valor inválido.'
    }),
    ano_exercicio: z.coerce.number({
        required_error: 'Informe o exercício (DETRAN).',
        invalid_type_error: 'Valor inválido.'
    }),
    marca: z.string()
        .nonempty('Informe a marca.')
        .transform<String>((value) => value.toUpperCase()),
    modelo: z.string()
        .nonempty('Informe o modelo.')
        .transform<String>((value) => value.toUpperCase()),
    cor: z.string()
        .nonempty('Informe a cor.')
        .transform<String>((value) => value.toUpperCase()),
    observacoes: z.string().optional(),
    ativo: z.enum([FLAG_SIM_NAO.SIM, FLAG_SIM_NAO.NAO]),
});