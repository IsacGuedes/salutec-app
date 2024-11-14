import React, { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './style2.css';

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
          <h1 className="titulo">AGENDAMENTO {consulta.status} COM SUCESSO!</h1>
          <p className="mensagem">
            Lembre-se de levar um documento de identificação com foto no dia da consulta.
          </p>
        </>
      ) : (
        <h1 className="titulo">AGENDAMENTO DESCONHECIDO</h1>
      )}
      <button className="botao" onClick={handleButtonClick}>
        VOLTAR PARA HOME
      </button>
    </div>
  );
};

export default Finalizado;
