import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import './App.css';
import AppRouter from './router';
import Logo from './assets/logo.png';
import { Link } from 'react-router-dom';
import DashboardNavbar from './components/navbarDashboard';
import Footer from './components/footer';

function App() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <div className="App">
      {isDashboardRoute ? (
        <>
          <DashboardNavbar />
          <AppRouter />
        </>
      ) : (
        <>
          <header className="menu-bar">
            <div className="logo">
              <Link to="/home">
                <img src={Logo} alt="Logo" className='logo-imagem' />
              </Link>
            </div>
            
          </header>
          <AppRouter />
          <Footer /> {/* Adicionar o rodapé aqui */}
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
