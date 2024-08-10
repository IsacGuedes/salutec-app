import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppRouter from './router';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="menu-bar">
          <div className="logo">logo</div>
          <nav className="menu-items">
            <a href="/calendario" className="menu-item">
              CALENDÁRIO
            </a>
            <a href="/faq" className="menu-item">
              PERGUNTAS FREQUENTES
            </a>
          </nav>
        </header>

        {/* Renderiza as rotas do AppRouter aqui */}
        <AppRouter />
      </div>
    </Router>
  );
}

export default App;
