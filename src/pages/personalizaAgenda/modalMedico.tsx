import React, { useState } from 'react';
import { Button } from '@mui/material';
import './styles.css';
import DisponibilidadeForm from './disponibilidadeFormProps';
import { Disponibilidade } from './disponibilidade';

interface ModalProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ModalMedico: React.FC<ModalProps> = ({ isOpen, onToggle }) => {
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

  const tipoConsultaId = 1; // Ajuste conforme necessário

  return (
    <div className="div-modal">
      <div className="form-container">
        <Button onClick={handleToggleExpand} variant="contained" color="primary">
          {expand ? 'Ocultar Agenda Médica' : 'Personalizar Agenda Médica'}
        </Button>
      </div>

      {isOpen && expand && ( // Renderiza a div expandida apenas se a modal estiver aberta e expandida
        <div className="expanded-container">
          <h2>Personalizar Agenda Médica</h2>
          <DisponibilidadeForm tipoConsultaId={tipoConsultaId} onDisponibilidadeChange={handleDisponibilidadeChange} />
        </div>
      )}
    </div>
  );
};

export default ModalMedico;
