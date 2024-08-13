import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './envioEmail.css';

const EnvioEmail: FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/home');
  };

  return (
    <div className="container">
      <h1 className="titulo">SOLICITAÇÃO ENVIADA COM SUCESSO!</h1>
      <p className="mensagem">
        Se você forneceu um endereço de e-mail durante a solicitação, receberá um e-mail para confirmar ou cancelar o pedido.
        Caso contrário, aguarde o contato do responsável pelo Posto de Saúde.
      </p>
      <button className="botao" onClick={handleButtonClick}>
        VOLTAR PARA HOME
      </button>
    </div>
  );
};

export default EnvioEmail;
