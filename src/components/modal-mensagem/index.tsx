import React, { FC, useState } from 'react';
import { Modal, Button, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import './styles.css';
import { useNavigate } from 'react-router-dom';

interface ModalMensagemProps {
  aberto: boolean;
  aoFechar: () => void;
}

const ModalAgendamento: FC<ModalMensagemProps> = ({ aberto, aoFechar }) => {
  const [confirmado, setConfirmado] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setConfirmado(e.target.checked);
  };

  const handleContinuarClick = () => {
    navigate('/agendar-consulta');
    aoFechar();
  };

  return (
    <Modal
      title="Agendamento de Consulta"
      visible={aberto}
      onCancel={aoFechar}
      footer={[
        <Button key="cancel" onClick={aoFechar}>
          Cancelar
        </Button>,
        <Button
          key="continue"
          type="primary"
          onClick={handleContinuarClick}
          disabled={!confirmado}
        >
          Continuar
        </Button>,
      ]}
    >
      <p>
        Você deve realizar o agendamento na Unidade Básica de Saúde vinculada ao seu endereço.
        Caso o agendamento seja feito em uma Unidade de Saúde incorreta, a consulta não será confirmada.
      </p>
      <Checkbox checked={confirmado} onChange={handleCheckboxChange}>
        Confirmo que li e entendi a mensagem
      </Checkbox>
    </Modal>
  );
};

export default ModalAgendamento;
