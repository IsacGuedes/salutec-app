import React, { FC, useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import Router from '../../router';

interface ModalMensagemProps {
  aberto: boolean;
  aoFechar: () => void;
}

const ModalAgendamento: FC<ModalMensagemProps> = ({ aberto, aoFechar }) => {
    const [confirmado, setConfimado] = useState(false);
    const navigate = useNavigate();

  if (!aberto) return null;

  const handleCheckboxChange = () => {
    setConfimado(!confirmado);
  }

  const handleContinuarClick = () => {
    navigate('/agendar-consulta');
  }

  return (
    <div className="modal-fundo">
      <div className="modal">
        <p>
        Você deve realizar o agendamento na Unidade Básica de Saúde vinculada ao seu endereço. 
        Caso o agendamento seja feito em uma Unidade de Saúde incorreta, a consulta não será confirmada.
        </p>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="confirmacao"
            checked={confirmado}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="confirmacao">Confirmo que li e entendi a mensagem</label>
        </div>
        <button onClick={handleContinuarClick} disabled={!confirmado}>
          Continuar
        </button>
      </div>
    </div>
  );
};

export default ModalAgendamento;
