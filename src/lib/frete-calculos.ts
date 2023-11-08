
export type TFreteCalc = {
    vlr_tarifa: number;
    peso_saida: number;
    vlr_bruto: number;
    vlr_pedagio: number;
    peso_chegada: number;
    vlr_quebra: number;
    vlr_desconto: number;
    vlr_liquido: number;
    perc_comissao: number;
    vlr_comissao: number;
}


const calcula = (input: TFreteCalc) => {
    let output: TFreteCalc;

    output = input;

    output.vlr_bruto = (input.vlr_tarifa * (input.peso_saida / 1000));

    output.vlr_liquido = (output.vlr_bruto + input.vlr_pedagio) - input.vlr_quebra - input.vlr_desconto;

    output.vlr_comissao = (input.vlr_bruto * (input.perc_comissao / 100));

    return output;
}

export const FreteCalc = {
    calcula,
}