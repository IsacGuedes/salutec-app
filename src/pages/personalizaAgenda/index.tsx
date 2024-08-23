import React from 'react';
import ModalMedico from './modalMedico';
import ModalDentista from './modalDentista';
import './styles.css';

const AgendaPersonalizacao: React.FC = () => {
  return (
    <div className="agenda-personalizacao">
      <ModalMedico />
      <ModalDentista />
    </div>
  );
};

export default AgendaPersonalizacao;
