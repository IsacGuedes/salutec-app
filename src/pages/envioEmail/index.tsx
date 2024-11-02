import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const EnvioEmail: FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/home');
  };

  return (
    <div className="container-email">
      <h1 className="titulo">AGENDAMENTO REALIZADO COM SUCESSO!</h1>
      <p className="mensagem">
        Aguarde o contato da Unidade de Saúde para confirmar ou cancelar seu agendamento!
      </p>
      <button className="botao" onClick={handleButtonClick}>
        VOLTAR PARA HOME
      </button>
    </div>
  );
};

export default EnvioEmail;
