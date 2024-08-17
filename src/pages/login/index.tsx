import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const Login: React.FC = () => {
  const [matricula, setMatricula] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8090/api/enfermeiros/login', null, {
        params: { matricula, senha },
      });
      
      if (response.status === 200) {
        alert('Login bem-sucedido');
        // Redirecionar ou armazenar o token de autenticação, se necessário
      }
    } catch (error) {
      setError('Matrícula ou senha incorretos.');
    }
  };

  return (
    <div className="caixa-login">
      <h2>Login</h2>
      <form className="formulario-login" onSubmit={handleLogin}>
        <div>
          <label htmlFor="matricula">Matrícula</label>
          <input
            type="text"
            id="matricula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className="botao-login" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
