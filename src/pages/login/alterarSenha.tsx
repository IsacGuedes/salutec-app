import React, { useState } from 'react';
import axios from 'axios';

// Defina a interface do enfermeiro
interface Enfermeiro {
    id: string;
    nome: string;
    matricula: string;
    senha: string;
}

// Tipagem explícita do parâmetro enfermeiro
function AlterarSenha({ enfermeiro }: { enfermeiro: Enfermeiro }) {
    const [novaSenha, setNovaSenha] = useState('');

    const handleAlterarSenha = async () => {
        try {
            await axios.put(`/api/enfermeiros/${enfermeiro.id}/alterar-senha`, { novaSenha });
            alert('Senha alterada com sucesso');
        } catch (error) {
            alert('Erro ao alterar a senha');
        }
    };

    return (
        <div>
            <h2>Alterar Senha</h2>
            <input
                type="password"
                placeholder="Nova Senha"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
            />
            <button onClick={handleAlterarSenha}>Alterar Senha</button>
        </div>
    );
}

export default AlterarSenha;
