import * as CNPJ from '@fnando/cnpj';
import * as CPF from '@fnando/cpf';

function format(value) {
    const isValidCNPJ = CNPJ.isValid(value);
    const isValidCPF = CPF.isValid(value);

    return (
        isValidCNPJ ? CNPJ.format(value) : (
            isValidCPF ? CPF.format(value) : value
        )
    );
}

function strip(value) {
    return JSON.stringify(value || '').replace(/\D/g, '');
}

function type(value) {
    const isValidCNPJ = CNPJ.isValid(value);
    const isValidCPF = CPF.isValid(value);

    return (
        isValidCNPJ ? 'CNPJ' : (
            isValidCPF ? 'CPF' : ''
        )
    );
}

function valid(value) {
    return !!(
        CNPJ.isValid(value) || CPF.isValid(value)
    );
}

export const documents = {
    format,
    type,
    strip,
    valid,
};
