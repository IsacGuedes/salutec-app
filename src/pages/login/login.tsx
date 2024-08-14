import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login: React.FC = () => {
  const [usuario, setUsuario] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Usuário:', usuario);
    console.log('Senha:', senha);

    navigate('/dashboard');
  };

  return (
    <Container maxWidth="xs">
      <Box className="caixa-login">
        <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ fontFamily: 'Inria Sans, sans-serif', color: 'black'}}
            >
          Área do Profissional
        </Typography>
        <form onSubmit={handleLogin} className="formulario-login">
          <TextField
            label="Usuário"
            variant="outlined"
            fullWidth
            margin="normal"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="botao-login"
            sx={{backgroundColor: 'black', '&:hover': {backgroundColor: 'black'}, fontFamily: 'Inria Sans, sans-serif', color: 'white'}}
          >
            Entrar
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
