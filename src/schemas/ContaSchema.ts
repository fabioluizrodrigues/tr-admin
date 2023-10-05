import { FLAG_SIM_NAO } from '@prisma/client';
import { z } from 'zod';

export const ContaSchema = z.object({
    pessoa_id: z.string({
        required_error: 'Selecione a pessoa.',
    }).nonempty('Selecione uma pessoa'),
    tipo: z.string().nonempty('Informe o tipo da conta.'),
    descricao: z.string().nonempty('Informe uma descrição'),
    ativo: z.enum([FLAG_SIM_NAO.SIM, FLAG_SIM_NAO.NAO]),
});