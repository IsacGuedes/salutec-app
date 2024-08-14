import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppRouter from './router';
import Logo from './assets/logo.png';
import { Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="menu-bar">
          <div className="logo">
            <Link to="/home">
            <img src={Logo} alt="Logo" className='logo-imagem'/>
            </Link>
          </div>
          <nav className="menu-items">
            <a href="/calendario" className="menu-item">
              CALENDÁRIO
            </a>
            <a href="/faq" className="menu-item">
              PERGUNTAS FREQUENTES
            </a>
          </nav>
        </header>
        <AppRouter />
      </div>
    </Router>
  );
}

export default App;
