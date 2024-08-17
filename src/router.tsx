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
      <Route path='/paciente' element={<Paciente/>}/>
<<<<<<< HEAD
      <Route path='/login' element={<Login/>}/>
=======
      <Route path='/confirmacao-consulta' element={<EnvioEmail/>}/>
      <Route path='/login-area-profissional' element={<Login/>}/>
>>>>>>> 7ecb50d198fa9cca36050c32413ee9750e8ec639
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  );
};

export default AppRouter;
