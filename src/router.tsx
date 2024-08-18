import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import AgendarConsulta from './pages/agendarConsulta';
import EnvioEmail from './pages/envioEmail';
import Paciente from './pages/paciente';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import DisponibilidadeForm from './pages/personalizaAgenda';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/agendar-consulta" element={<AgendarConsulta />} />
      <Route path='/paciente' element={<Paciente/>}/>
      <Route path='/confirmacao-consulta' element={<EnvioEmail/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/personaliza' element={<DisponibilidadeForm/>}/>
    </Routes>
  );
};

export default AppRouter;
