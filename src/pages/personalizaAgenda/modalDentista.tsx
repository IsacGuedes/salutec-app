import React, { useState } from 'react';
import { Button } from '@mui/material';
import './styles.css';
import DisponibilidadeForm from './disponibilidadeFormProps';
import { Disponibilidade } from './disponibilidade';

const ModalDentista: React.FC = () => {
  const [expand, setExpand] = useState(false); // Controla o estado de expansão da div
  const [disponibilidade, setDisponibilidade] = useState<Disponibilidade | null>(null);

  const handleToggleExpand = () => setExpand(!expand); // Alterna entre expandido e colapsado

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

      {expand && ( // Renderiza a div expandida quando o estado `expand` for true
        <div className="expanded-container">
          <h2>Personalizar Agenda Odontológica</h2>
          <DisponibilidadeForm tipoConsultaId={tipoConsultaId} onDisponibilidadeChange={handleDisponibilidadeChange} />
        </div>
      )}
    </div>
  );
};

export default ModalDentista;
