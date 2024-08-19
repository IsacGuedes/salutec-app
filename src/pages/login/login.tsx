import React, { FC, useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { apiPost, STATUS_CODE } from '../../api/RestClient';

const Login: FC = () => {
  const [matricula, setMatricula] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [novaSenha, setNovaSenha] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [enfermeiroId, setEnfermeiroId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await apiPost("/enfermeiros/login", { matricula, senha });

      if (response.status === STATUS_CODE.OK) {
        setIsLoggedIn(true);
        setEnfermeiroId(response.data.id); // Armazena o ID do enfermeiro para futuras operações
        navigate('/home');
      } else {
        setError('Credenciais inválidas. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      setError('Erro ao autenticar. Tente novamente mais tarde.');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (enfermeiroId !== null) {
      try {
        const response = await apiPost(`/enfermeiros/${enfermeiroId}/alterar-senha`, { novaSenha });

        if (response.status === STATUS_CODE.OK) {
          navigate('/dashboard');
        } else {
          setError('Erro ao alterar a senha. Tente novamente.');
        }
      } catch (error) {
        console.error('Erro ao alterar a senha:', error);
        setError('Erro ao alterar a senha. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box className="caixa-login">
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ fontFamily: 'Inria Sans, sans-serif', color: 'black' }}
        >
          Área do Profissional
        </Typography>
        {!isLoggedIn ? (
          <form onSubmit={handleLogin} className="formulario-login">
            <TextField
              label="Matrícula"
              variant="outlined"
              fullWidth
              margin="normal"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              required
            />
            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="botao-login"
              sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: 'black' }, fontFamily: 'Inria Sans, sans-serif', color: 'white' }}
            >
              Entrar
            </Button>
          </form>
        ) : (
          <form onSubmit={handleChangePassword} className="formulario-login">
            <TextField
              label="Nova Senha"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              required
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="botao-login"
              sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: 'black' }, fontFamily: 'Inria Sans, sans-serif', color: 'white' }}
            >
              Alterar Senha
            </Button>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default Login;
