import React, { FC } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/home';

const Router: FC = () => {
  return (
    <Routes>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Routes>
  );
}

export default Router;
