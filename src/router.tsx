import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import AgendarConsulta from './pages/agendarConsulta';
import EnvioEmail from './pages/envioEmail';
import Paciente from './pages/paciente';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import DashboardCancelado from './pages/dashboardCancelado';
import DashboardConfirmado from './pages/dashboardConfirmado';
import DashboardPendente from './pages/dashboardPendente';
import DisponibilidadeForm from './pages/personalizaAgenda';
import FaqQuestions from './pages/faq/perguntas/perguntas';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path='/faq' element={<FaqQuestions/>}/>
      <Route path="/agendar-consulta" element={<AgendarConsulta />} />
      <Route path='/paciente' element={<Paciente/>}/>
      <Route path='/confirmacao-consulta' element={<EnvioEmail/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/dashboard/todas-consultas' element={<Dashboard/>}/>
      <Route path='/dashboard/consultas-confirmadas' element={<DashboardConfirmado/>}/>
      <Route path='/dashboard/consultas-canceladas' element={<DashboardCancelado/>}/>
      <Route path='/dashboard/consultas-pendentes' element={<DashboardPendente/>}/>
      <Route path='/dashboard/configurar-horario' element={<DisponibilidadeForm/>}/>
    </Routes>
  );
};

export default AppRouter;
