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
import SobreNos from './pages/sobre';
import Contato from './pages/contato';
import NotFound from './pages/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute';
import ConfirmacaoPaciente from './pages/confirmarConsulta';
import Finalizado from './pages/confirmarConsulta/finalizado';

const AppRouter: React.FC = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/faq" element={<FaqQuestions />} />
      <Route path="/agendar-consulta" element={<AgendarConsulta />} />
      <Route path="/paciente" element={<Paciente />} />
      <Route path="/agendamento-concluido" element={<EnvioEmail />} />
      <Route path='/finalizado' element={<Finalizado/>}/>
      <Route path='/confirmacao-consulta' element={<ConfirmacaoPaciente/>}/>
      <Route path="/login" element={<Login />} />

      {/* Rotas protegidas */}
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/dashboard/todas-consultas" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/dashboard/consultas-confirmadas" element={
        <PrivateRoute>
          <DashboardConfirmado />
        </PrivateRoute>
      } />
      <Route path="/dashboard/consultas-canceladas" element={
        <PrivateRoute>
          <DashboardCancelado />
        </PrivateRoute>
      } />
      <Route path="/dashboard/consultas-pendentes" element={
        <PrivateRoute>
          <DashboardPendente />
        </PrivateRoute>
      } />
      <Route path="/dashboard/configurar-horario" element={
        <PrivateRoute>
          <DisponibilidadeForm />
        </PrivateRoute>
      } />

      <Route path="/sobre" element={<SobreNos />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
