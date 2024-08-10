import React from 'react';
import './App.css';
import Home from './pages/home/home';

function App() {
  return (
    <div className="App">
      <header className="menu-bar">
        <div className="logo">logo</div>
        <nav className="menu-items">
          <a href="calendario" className="menu-item">
            CALENDÁRIO
          </a>
          <a href="faq" className="menu-item">
            PERGUNTAS FREQUENTES
          </a>
        </nav>
      </header>
      <Home />
    </div>
  );
}

export default App;
