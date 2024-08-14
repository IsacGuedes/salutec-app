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

export const formatarTelefone = (telefone: string): string => {
    return telefone
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
        .replace(/(-\d{4})\d+?$/, '$1');
};

export const removerCaracteresNaoNumericos = (valor: string): string => {
    return valor.replace(/\D/g, '');
};