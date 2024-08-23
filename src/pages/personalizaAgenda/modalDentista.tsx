import React, { useState } from 'react';
import { Modal, Button } from '@mui/material';
import './styles.css'; 
import DisponibilidadeForm from './disponibilidadeFormProps';

const ModalDentista: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="primary">
        Personalizar Agenda Odontológica
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className="modal-container">
          <h2>Personalizar Agenda Odontológica</h2>
          <DisponibilidadeForm tipo="dentista" /> {}
          <Button onClick={handleClose} variant="contained" color="secondary">
            Fechar
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ModalDentista;
