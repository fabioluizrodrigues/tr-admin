import { FLAG_SIM_NAO } from '@prisma/client';
import { z } from 'zod';
import * as masks from '@/lib/masks';

export const FreteSchema = z.object({
    data_doc: z.coerce.date({
        errorMap: (issue, _ctx) => {
            switch (issue.code) {
              case 'invalid_type':
                return { message: 'Informe data.' };
              case 'invalid_enum_value':
                return { message: 'Informe data.' };
              default:
                return { message: 'Informe data.' };
            }
          }
    }),
    nr_doc: z.string().nonempty('Informe nr doc.'),
    nr_ordem: z.string().optional(),
    conta_id: z.string({
        required_error: 'Selecione a conta.',
    }).nonempty('Selecione uma conta.'),
    motorista_id: z.string({
        required_error: 'Selecione o motorista.',
    }).nonempty('Selecione o motorista.'),

    cavalo_id: z.string({
        required_error: 'Selecione o cavalo.',
    }).nonempty('Selecione o cavalo.'),
    reboque1_id: z.string().optional(),
    reboque2_id: z.string().optional(),
    reboque3_id: z.string().optional(),

    cliente_id: z.string().nonempty('Informe o cliente'),
    local_embarque: z.string().optional(),
    local_descarga: z.string().optional(),

    vlr_tarifa: z.coerce.number({required_error: 'Informe o valor.'})
      .nonnegative()
      .transform((value) => masks.currencyMask.transform(value || '')),
    peso_saida: z.coerce.number({required_error: 'Informe o peso.'}).nonnegative(),
    vlr_bruto: z.coerce.number({required_error: 'Informe o valor'}).nonnegative(),
    vlr_pedagio: z.coerce.number({required_error: 'Informe o valor.'}).nonnegative(),
    peso_chegada: z.coerce.number({required_error: 'Informe o valor'}).nonnegative().optional(),
    vlr_quebra: z.coerce.number({required_error: 'Informe o valor'}).nonnegative().optional(),
    vlr_desconto: z.coerce.number({required_error: 'Informe o valor'}).nonnegative().optional(),
    vlr_liquido: z.coerce.number({required_error: 'Informe o valor'}).nonnegative(),
    perc_comissao: z.coerce.number({required_error: 'Informe o valor.'}).nonnegative(),
    vlr_comissao: z.coerce.number({required_error: 'Informe o valor.'}).nonnegative(),
});