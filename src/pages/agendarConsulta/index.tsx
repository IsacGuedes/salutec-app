import React, { FC, useEffect, useState } from 'react';
import Calendario from '../../components/calendario';
import { Button, TextField } from '@mui/material';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const AgendarConsulta: FC = () => {
  const [tipoConsulta, setTipoConsulta] = useState('');
  const [horarioConsulta, setHorarioConsulta] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const navigate = useNavigate();

  const handleContinuarClick = () => {
      navigate('/paciente');
  }

  const handleVoltarClick = () => {
    navigate('/home');
  }

  return (
    <div className='container'>
      <div className="container-div">
        <div className="dropdown-medico">
          <div className="titulo-tipo-consulta">
            <h1 className="titulo-consulta">Escolha o tipo de consulta</h1>
          </div>
          <div className="option-dropdown">
          <TextField
        className='tipo-consulta'
        margin="dense"
        id="tipo-consulta"
        label="Selecione o tipo de consulta"
        select
        fullWidth
        variant="standard"
        value={tipoConsulta}
        onChange={(e) => setTipoConsulta(e.target.value)}
        SelectProps={{
          native: true,
        }}
      >
        <option value=""></option>
        <option value="Odontológica">Odontológica</option>
        <option value="Clínico Geral">Clínico Geral</option>
      </TextField>
          </div>
          <div className="container-resumo-consulta">
          <h1 className='titulo-consulta'>Resumo da consulta</h1>
          <p>Data:</p>
          <p>Consulta: {tipoConsulta}</p>
          <p>Horário: {horarioConsulta}</p>
          <p>Local:</p>
        </div>
        </div>
        <div className="dropdown-medico">
          <Calendario />
          <div className="option-dropdown">
          <TextField
        className='horario-consulta'
        margin="dense"
        id="horario-consulta"
        label="Selecione o horário"
        select
        fullWidth
        variant="standard"
        value={horarioConsulta}
        onChange={(e) => setHorarioConsulta(e.target.value)}
        SelectProps={{
          native: true,
        }}
      >
        <option value=""></option>
        <option value="09:00">09:00</option>
        <option value="10:10">10:10</option>
      </TextField>
        </div>
          <Button onClick={handleVoltarClick} variant="contained" color="primary">
            Voltar
          </Button>
          <Button 
            onClick={() => {
              if(tipoConsulta === "" || horarioConsulta === ""){
                //validar data selecionada também
                alert("É necessário preencher todos os dados!")
              }else if (horarioConsulta === "") {
                window.alert("Por favor, selecione um horário!");
              }else if (horarioConsulta === "") {
                window.alert("Por favor, selecione um horário!");
              } else{
                handleContinuarClick();
              }
            }
            } 
            variant="contained" 
            color="primary">
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AgendarConsulta;
