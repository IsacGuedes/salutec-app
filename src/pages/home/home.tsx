import React, { useState } from 'react';
import './home.css';
import ModalMensagem from '../../components/modal-mensagem/modal-mensagem';

const Home: React.FC = () => {
  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  return (
    <div className="home">
      <button className="botao-grande" onClick={abrirModal}>
        AGENDAR CONSULTA
      </button>
      
      <ModalMensagem aberto={modalAberto} aoFechar={fecharModal} />
    </div>
  );
}

export default Home;
