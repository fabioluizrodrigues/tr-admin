import { isValidLicensePlate } from '@brazilian-utils/brazilian-utils';
import { z } from 'zod';
import * as masks from "@/lib/masks";
import { FLAG_SIM_NAO, VeiculoTipo } from '@prisma/client';

export const VeiculoSchema = z.object({
    placa: z.string()
        .nonempty('Informe a placa')
        .refine(value => isValidLicensePlate(String(value)), 'Placa inválida')
        .transform<String>(masks.placaMask.transform)
        .transform<String>((value) => value.toUpperCase()),
    renavam: z.string()
        .nonempty('Informe o renavam.'),
    tipo: z.enum([VeiculoTipo.CAMINHAO, VeiculoTipo.CARRETA, VeiculoTipo.CARRO], {
        errorMap: (issue, _ctx) => {
          switch (issue.code) {
            case 'invalid_type':
              return { message: 'Selecione o tipo.' };
            case 'invalid_enum_value':
              return { message: 'Selecione o tipo.' };
            default:
              return { message: 'Selecione o tipo' };
          }
        },
      }),
    nr_eixos: z.coerce.string().nonempty('Informe eixos'),
    ano_fabrica: z.coerce.number()
        .min(1900,'Informe ano fab.')
        .max(3000,'Informe ano fab.'),
    ano_modelo: z.coerce.number()
        .min(1900,'Informe ano mod.')
        .max(3000,'Informe ano mod.'),
    ano_exercicio: z.coerce.number()
        .min(1900,'Informe ano exer.')
        .max(3000,'Informe ano exer.'),
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