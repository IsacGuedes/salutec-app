import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import AgendarConsulta from './pages/agendarConsulta/AgendarConsulta';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/agendar-consulta" element={<AgendarConsulta />} />
    </Routes>
  );
};

export default AppRouter;
