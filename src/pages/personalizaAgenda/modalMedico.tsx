// ModalMedico.tsx
import React, { useState } from 'react';
import { Modal, Button } from '@mui/material';
import './styles.css'; 
import DisponibilidadeForm from './disponibilidadeFormProps';
import { Disponibilidade } from './disponibilidade';

const ModalMedico: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [disponibilidade, setDisponibilidade] = useState<Disponibilidade | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDisponibilidadeChange = (novaDisponibilidade: Disponibilidade) => {
    setDisponibilidade(novaDisponibilidade);
    console.log('Nova disponibilidade:', novaDisponibilidade);
  };

  const tipoConsultaId = 1; // Ajuste conforme necessário

  return (
    <>
      <div className="div-modal">
        <div className="botao-personalizacao">
          <Button onClick={handleOpen} variant="contained" color="primary">
            Personalizar Agenda Médica
          </Button>
        </div>
        <Modal open={open} onClose={handleClose}>
          <div className="modal-container">
            <h2>Personalizar Agenda Médica</h2>
            <DisponibilidadeForm tipoConsultaId={tipoConsultaId} onDisponibilidadeChange={handleDisponibilidadeChange} />
            <Button onClick={handleClose} variant="contained" color="secondary">
              Fechar
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ModalMedico;
