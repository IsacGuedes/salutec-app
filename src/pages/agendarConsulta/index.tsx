import React, { FC, useState } from 'react';
import BasicDateCalendar from '../../components/calendario'; // Certifique-se de que o nome da importação está correto
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { apiPost, STATUS_CODE } from '../../api/RestClient';
import { Dayjs } from 'dayjs'; // Importa o tipo Dayjs

const AgendarConsulta: FC = () => {
  const [data, setData] = useState('');
  const [tipoConsulta, setTipoConsulta] = useState('');
  const [horarioConsulta, setHorarioConsulta] = useState('');
  const [statusConsulta, setStatusConsulta] = useState('');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const navigate = useNavigate();

  const salvarConsulta = async () => {
    const consultaData = {
      data: selectedDate?.format('YYYY-MM-DD'),
      tipoConsulta: tipoConsulta,
      horarioConsulta: horarioConsulta,
      statusConsulta: 'AGUARDANDO_CONFIRMACAO',
    };

    sessionStorage.setItem('consultaData', JSON.stringify(consultaData));

    try {
      const response = await apiPost('/agendar-consulta/criarConsulta', consultaData);
      if (response.status === STATUS_CODE.CREATED) {
        alert('Concluído com sucesso!');
        navigate('/');
      } else {
        alert(`Erro ao cadastrar consulta: ${response.statusText}`);
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor.');
      console.log('Dados: ', consultaData);
    }
  };

  const handleContinuarClick = () => {
    if (tipoConsulta === '' || horarioConsulta === '' || !selectedDate) {
      alert('É necessário preencher todos os dados!');
    } else {
      // Armazena os dados da consulta no sessionStorage
      const consultaData = {
        data: selectedDate?.format('YYYY-MM-DD'),
        tipoConsulta: tipoConsulta,
        horarioConsulta: horarioConsulta,
        statusConsulta: 'AGUARDANDO_CONFIRMACAO',
      };
      sessionStorage.setItem('consultaData', JSON.stringify(consultaData));
  
      // Navega para a tela de cadastro do paciente
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
          <div className="titulo-tipo-consulta">
            <h1 className="titulo-consulta">Escolha o tipo de consulta</h1>
          </div>
          <div className="option-dropdown-tipoConsulta">
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
              SelectProps={{
                native: true,
              }}
            >
              <option value=""></option>
              <option value="DENTISTA">Dentista</option>
              <option value="CLINICO_GERAL">Clínico Geral</option>
            </TextField>
          </div>
          <BasicDateCalendar selectedDate={selectedDate} onDateChange={(date: Dayjs | null) => setSelectedDate(date)} />
        </div>
        <div className="vertical-line"></div>
        <div className="dropdown-medico">
          <div className="titulo-tipo-consulta">
            <h1 className="titulo-consulta">Escolha o horário</h1>
          </div>
          <div className="option-dropdown-horaConsulta">
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
              SelectProps={{
                native: true,
              }}
            >
              <option value=""></option>
              <option value="09:00">09:00</option>
              <option value="10:10">10:10</option>
            </TextField>
          </div>
          <div className="container-resumo-consulta">
            <p>Data: {selectedDate?.format('DD/MM/YYYY')}</p>
            <p>Consulta: {tipoConsulta}</p>
            <p>Horário: {horarioConsulta}</p>
            <p>Local:</p>
          </div>
          <div className="div-hora-botao">
            <div className="div-botao">
              <Button onClick={handleVoltarClick} variant="contained" color="primary">
                Voltar
              </Button>
              <Button onClick={handleContinuarClick} variant="contained" color="primary">
                Continuar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendarConsulta;
