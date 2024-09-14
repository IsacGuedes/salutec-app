import React, { useState } from 'react';
import { Button } from 'antd';
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
      <Button
        type='primary'
        size="large"
        onClick={abrirModal}
        className="botao-grande"
      >
        AGENDAR CONSULTA
      </Button>

      <ModalAgendamento aberto={modalAberto} aoFechar={fecharModal} />
    </div>
  );
}

export default Home;
