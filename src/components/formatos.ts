// src/components/formatos.ts

export const aplicarMascaraDocumentocpf = (documentocpf: string | null | undefined): string => {
    if (!documentocpf) return ''; // Verifica se o valor é nulo ou indefinido e retorna uma string vazia

    // Função para aplicar máscara de CPF
    const apenasDigitos = documentocpf.replace(/\D/g, '').slice(0, 11);
    
    if (apenasDigitos.length <= 11) {
        return apenasDigitos
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } 
    return documentocpf;
};

export const aplicarMascaraDocumentocns = (documentocns: string | null | undefined): string => {
    if (!documentocns) return ''; // Verifica se o valor é nulo ou indefinido e retorna uma string vazia

    // Função para aplicar máscara de CNS
    const apenasDigitos = documentocns.replace(/\D/g, '').slice(0, 15);
    
    if (apenasDigitos.length <= 15) {
        return apenasDigitos
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } 
    return documentocns;
};

export const formatarTelefone = (telefone: string | null | undefined, paraEnvio: boolean = false): string => {
    if (!telefone) return ''; // Verifica se o valor é nulo ou indefinido e retorna uma string vazia
    
    const apenasDigitos = telefone.replace(/\D/g, '').slice(0, 11);

    if (paraEnvio) {
        return apenasDigitos.length === 10 || apenasDigitos.length === 11
            ? `55${apenasDigitos}`
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

export const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return ''; // Verifica se o valor é nulo ou indefinido e retorna uma string vazia
  
    const date = new Date(dateString);
    const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000); // Ajusta para o fuso local
    
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return localDate.toLocaleDateString('pt-BR', options);
  };
  

export const removerCaracteresNaoNumericos = (valor: string | null | undefined): string => {
    if (!valor) return ''; // Verifica se o valor é nulo ou indefinido e retorna uma string vazia

    return valor.replace(/\D/g, '');
};

// Função para validar o CPF
export const validarCpf = (cpf: string | null | undefined): boolean => {
    if (!cpf) return false; // Verifica se o valor é nulo ou indefinido e retorna falso

    const cpfLimpo = cpf.replace(/\D/g, '');
    
    if (cpfLimpo.length !== 11 || /^(\d)\1{10}$/.test(cpfLimpo)) {
        return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.substring(9, 10))) {
        return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.substring(10, 11))) {
        return false;
    }

    return true;
};
