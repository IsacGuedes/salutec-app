export const aplicarMascaraDocumento = (documento: string): string => {
    const apenasDigitos = documento.replace(/\D/g, '').slice(0, 15);
    
    // Aplica máscara de CPF (11 dígitos)
    if (apenasDigitos.length <= 11) {
        return apenasDigitos
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } 
    // Aplica máscara de CNS (15 dígitos)
    else if (apenasDigitos.length <= 15) {
        return apenasDigitos
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } 
    return documento; // Retorna o documento original se não atender aos casos acima
};

export const formatarTelefone = (telefone: string, paraEnvio: boolean = false): string => {
    const apenasDigitos = telefone.replace(/\D/g, '').slice(0, 11);

    if (paraEnvio) {
        // Adiciona o prefixo +55 para números brasileiros no envio
        return apenasDigitos.length === 10 || apenasDigitos.length === 11
            ? `+55${apenasDigitos}`
            : telefone;
    } else {
        if (apenasDigitos.length === 11) {
            // Formata telefone celular (11 dígitos)
            return apenasDigitos
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d{4})$/, '$1-$2');
        } else if (apenasDigitos.length === 10) {
            // Formata telefone fixo (10 dígitos)
            return apenasDigitos
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4})(\d{4})$/, '$1-$2');
        }
    }

    return telefone; // Retorna o telefone original caso não se aplique nenhuma formatação
};

export const removerCaracteresNaoNumericos = (valor: string): string => {
    return valor.replace(/\D/g, '');
};