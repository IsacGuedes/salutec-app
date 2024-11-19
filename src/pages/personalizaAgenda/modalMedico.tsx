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
  const [disponibilidade, setDisponibilidade] = useState<Disponibilidade | null>(null);

  const handleToggleExpand = () => {
    onToggle(); // Alterna o estado da modal através da prop passada
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
          {isOpen ? 'Ocultar Agenda Médica' : 'Personalizar Agenda Médica'}
        </Button>
      </div>

      {isOpen && (
        <div className="expanded-container">
          <h2>Personalizar Agenda Médica</h2>
          <DisponibilidadeForm tipoConsultaId={tipoConsultaId} onDisponibilidadeChange={handleDisponibilidadeChange} />
        </div>
      )}
    </div>
  );
};

export default ModalDentista;
