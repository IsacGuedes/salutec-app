import React, { FC, useState } from 'react';
import Calendario from '../../components/calendario/calendario';
import { TextField } from '@mui/material';
import './agendarConsulta.css';

const AgendarConsulta: FC = () => {
  const [medico, setMedico] = useState('');
  return (
    <div className='container'>
      <div className="container-div">
        <div className="dropdown-medico">
          <div className="titulo-tipo-consulta">
            <h1 className="titulo-consulta">Escolha o tipo de consulta</h1>
          </div>
          <div className="option-dropdown">
            <TextField
              className='medico'
              margin="dense"
              id="medico"
              select
              fullWidth
              variant="standard"
              value={medico}
              onChange={(e) => setMedico(e.target.value)}
              SelectProps={{
                native: true,
              }}
            >
              <option defaultValue="">Selecione uma opção</option>
              <option value="dentista">Odontológica</option>
              <option value="medico">Clínico Geral</option>
            </TextField>
          </div>
        </div>
        <Calendario />
      </div>
    </div>
  );
}

export default AgendarConsulta;
