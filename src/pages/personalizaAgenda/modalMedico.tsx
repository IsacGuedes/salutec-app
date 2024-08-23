import React, { useState } from 'react';
import { Modal, Button } from '@mui/material';
import './styles.css'; 
import DisponibilidadeForm from './disponibilidadeFormProps';

const ModalMedico: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="primary">
        Personalizar Agenda Médica
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className="modal-container">
          <h2>Personalizar Agenda Médica</h2>
          <DisponibilidadeForm tipo="medico" /> {}
          <Button onClick={handleClose} variant="contained" color="secondary">
            Fechar
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ModalMedico;
