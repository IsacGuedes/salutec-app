import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import AgendarConsulta from './pages/agendarConsulta';
import EnvioEmail from './pages/envioEmail';
import Paciente from './pages/paciente';
import Login from './pages/login';
import Dashboard from './pages/dashboard';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/agendar-consulta" element={<AgendarConsulta />} />
      <Route path='/confirmacao-consulta' element={<EnvioEmail/>}/>
      <Route path='/paciente' element={<Paciente/>}/>
      <Route path='/login-area-profissional' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  );
};

export default AppRouter;
