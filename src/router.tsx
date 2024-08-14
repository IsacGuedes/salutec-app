import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import AgendarConsulta from './pages/agendarConsulta/AgendarConsulta';
import EnvioEmail from './pages/envioEmail/envioEmail';
import Paciente from './pages/pacientes/paciente';
import Login from './pages/login/login';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/agendar-consulta" element={<AgendarConsulta />} />
      <Route path='/confirmacao-consulta' element={<EnvioEmail/>}/>
      <Route path='/paciente' element={<Paciente/>}/>
      <Route path='/login-area-profissional' element={<Login/>}/>
    </Routes>
  );
};

export default AppRouter;
