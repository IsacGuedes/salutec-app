// src/components/formatos.ts

export const aplicarMascaraDocumento = (documento: string): string => {
    // Função para aplicar máscara de CPF e CNS
    const apenasDigitos = documento.replace(/\D/g, '').slice(0, 15);
    
    if (apenasDigitos.length <= 11) {
        return apenasDigitos
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else if (apenasDigitos.length <= 15) {
        return apenasDigitos
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } 
    return documento;
};

export const formatarTelefone = (telefone: string, paraEnvio: boolean = false): string => {
    const apenasDigitos = telefone.replace(/\D/g, '').slice(0, 11);

    if (paraEnvio) {
        return apenasDigitos.length === 10 || apenasDigitos.length === 11
            ? `+55${apenasDigitos}`
            : telefone;
    } else {
        if (apenasDigitos.length === 11) {
            return apenasDigitos
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d{4})$/, '$1-$2');
        } else if (apenasDigitos.length === 10) {
            return apenasDigitos
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4})(\d{4})$/, '$1-$2');
        }
    }

    return telefone;
};

export const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
};

export const removerCaracteresNaoNumericos = (valor: string): string => {
    return valor.replace(/\D/g, '');
};
