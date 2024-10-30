import React, { useState } from 'react';
import { Button } from '@mui/material';
import './styles.css';
import DisponibilidadeForm from './disponibilidadeFormProps';
import { Disponibilidade } from './disponibilidade';

interface ModalProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ModalDentista: React.FC<ModalProps> = ({ isOpen, onToggle }) => {
  const [expand, setExpand] = useState(false);
  const [disponibilidade, setDisponibilidade] = useState<Disponibilidade | null>(null);

  const handleToggleExpand = () => {
    if (!expand) {
      setExpand(true);
      onToggle(); // Fecha a outra modal se estiver aberta
    } else {
      setExpand(false);
      onToggle(); // Fecha a modal atual
    }
  };

  const handleDisponibilidadeChange = (novaDisponibilidade: Disponibilidade) => {
    setDisponibilidade(novaDisponibilidade);
    console.log('Nova disponibilidade:', novaDisponibilidade);
  };

  const tipoConsultaId = 2; // Ajuste conforme necessário

  return (
    <div className="div-modal">
      <div className="form-container">
        <Button onClick={handleToggleExpand} variant="contained" color="primary">
          {expand ? 'Ocultar Agenda Odontológica' : 'Personalizar Agenda Odontológica'}
        </Button>
      </div>

      {isOpen && expand && ( // Renderiza a div expandida apenas se a modal estiver aberta e expandida
        <div className="expanded-container">
          <h2>Personalizar Agenda Odontológica</h2>
          <DisponibilidadeForm tipoConsultaId={tipoConsultaId} onDisponibilidadeChange={handleDisponibilidadeChange} />
        </div>
      )}
    </div>
  );
};

export default ModalDentista;
