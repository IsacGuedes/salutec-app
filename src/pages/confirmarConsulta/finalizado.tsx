import React, { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './style2.css';

interface Consulta {
  statusConsulta: string; // Altere para corresponder à resposta da API
}

const Finalizado: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const consulta = location.state?.consulta; // Verifica se a consulta foi passada

  const handleButtonClick = () => {
    navigate('/home');
  };

  return (
    <div className="container-email">
      {consulta ? (
        <>
          <h1 className="titulo">AGENDAMENTO <strong>{consulta?.statusConsulta}</strong> COM SUCESSO!</h1>
          <p className="mensagem">
            Lembre-se de levar um documento de identificação com foto no dia da consulta.
          </p>
        </>
      ) : (
        <h1 className="titulo">AGENDAMENTO DESCONHECIDO</h1>
      )}
    </div>
  );
};

export default Finalizado;
