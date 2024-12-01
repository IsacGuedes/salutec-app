import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import './App.css';
import AppRouter from './router';
import Logo from './assets/logo.png';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Footer from './components/footer';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  // Lógica do logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token de autenticação
    localStorage.removeItem('enfermeiroNome'); // Remove o nome do enfermeiro armazenado
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <div className="App">
      {isDashboardRoute ? (
        <>
          <header className="menu-bar">
            <div className="logo">
              <img src={Logo} alt="Logo" className="logo-imagem" />
            </div>
            <div className="enfermeiro-info">
              <Button type="link" onClick={handleLogout}>Sair</Button> {/* Botão de logout no topo */}
            </div>
          </header>
          <AppRouter />
        </>
      ) : (
        <>
          <header className="menu-bar">
            <div className="logo">
              <Link to="/home">
                <img src={Logo} alt="Logo" className="logo-imagem" />
              </Link>
            </div>
          </header>
          <AppRouter />
          <Footer /> {/* Inclui o Footer no final */}
        </>
      )}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
