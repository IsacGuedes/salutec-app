import React, { FC, useState } from 'react';
import BasicDateCalendar from '../../components/calendario';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Dayjs } from 'dayjs';

const AgendarConsulta: FC = () => {
  const [tipoConsulta, setTipoConsulta] = useState('');
  const [horarioConsulta, setHorarioConsulta] = useState('');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const navigate = useNavigate();

  const handleContinuarClick = () => {
    if (tipoConsulta === '' || horarioConsulta === '' || !selectedDate) {
      alert('É necessário preencher todos os dados!');
    } else {
      const consultaData = {
        data: selectedDate?.format('YYYY-MM-DD'),
        tipoConsulta: tipoConsulta,
        horarioConsulta: horarioConsulta,
        statusConsulta: 'AGUARDANDO_CONFIRMAÇÃO',
      };
      sessionStorage.setItem('consultaData', JSON.stringify(consultaData));
      navigate('/paciente');
    }
  };

  const handleVoltarClick = () => {
    navigate('/home');
  };

  return (
    <div className="container-principal">
      <div className="container-div">
        <div className="dropdown-medico">
          <h1 className="titulo-consulta">Escolha o tipo de consulta</h1>
          <TextField
            className="tipo-consulta"
            margin="dense"
            id="tipo-consulta"
            label="Selecione o tipo de consulta"
            select
            fullWidth
            variant="standard"
            value={tipoConsulta}
            onChange={(e) => setTipoConsulta(e.target.value)}
            SelectProps={{ native: true }}
          >
            <option value=""></option>
            <option value="Dentista">Dentista</option>
            <option value="Clínico Geral">Clínico Geral</option>
          </TextField>
          <BasicDateCalendar selectedDate={selectedDate} onDateChange={(date: Dayjs | null) => setSelectedDate(date)} />
        </div>
        <div className="dropdown-medico">
          <h1 className="titulo-consulta">Escolha o horário</h1>
          <TextField
            className="horario-consulta"
            margin="dense"
            id="horario-consulta"
            label="Selecione o horário"
            select
            fullWidth
            variant="standard"
            value={horarioConsulta}
            onChange={(e) => setHorarioConsulta(e.target.value)}
            SelectProps={{ native: true }}
          >
            <option value=""></option>
            <option value="09:00">09:00</option>
            <option value="10:10">10:10</option>
          </TextField>
          <div className="container-resumo-consulta">
            <p>Data: {selectedDate?.format('DD/MM/YYYY')}</p>
            <p>Consulta: {tipoConsulta}</p>
            <p>Horário: {horarioConsulta}</p>
          </div>
          <div className="div-botao">
            <Button onClick={handleVoltarClick} variant="contained" color="primary">Voltar</Button>
            <Button onClick={handleContinuarClick} variant="contained" color="primary">Continuar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendarConsulta;
