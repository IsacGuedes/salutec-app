import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, LockOutlined } from '@ant-design/icons';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section logo">
          <h2>SALUTEC</h2>
          <p>Conectando você à saúde de forma simples e segura.</p>
        </div>
        
        <div className="footer-section links">
          <h4>Links Úteis</h4>
          <Link to="/faq">Perguntas Frequentes</Link>
          <Link to="/sobre">Sobre Nós</Link>
        </div>

        <div className="footer-section login">
          <h4>Acesso Restrito</h4>
          <Link to="/login" className="login-link">
            <LockOutlined /> Área do Profissional
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SALUTEC - Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
