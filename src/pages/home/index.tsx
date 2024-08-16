import React, { useState } from 'react';
import './styles.css';
import ModalAgendamento from '../../components/modal-mensagem';

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
      
      <ModalAgendamento aberto={modalAberto} aoFechar={fecharModal} />
    </div>
  );
}

export default Home;
