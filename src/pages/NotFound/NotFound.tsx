// pages/NotFound.js

import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Importar o CSS, se necessário

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Página Não Encontrada</h2>
      <p>Desculpe, a página que você está procurando não existe.</p>
      <Link to="/home" className="home-link">Voltar para a Home</Link>
    </div>
  );
};

export default NotFound;
