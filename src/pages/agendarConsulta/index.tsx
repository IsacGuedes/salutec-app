import React, { FC, useEffect, useState } from 'react';
import Calendario from '../../components/calendario';
import { Button, TextField } from '@mui/material';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { apiPost, STATUS_CODE } from '../../api/RestClient';

const AgendarConsulta: FC = () => {
  const [data, setData] = useState('');
  const [tipoConsulta, setTipoConsulta] = useState('');
  const [horarioConsulta, setHorarioConsulta] = useState('');
  const [statusConsulta, setStatusConsulta] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [clienteStore, setClienteStore] = useState<any>(null);
  const navigate = useNavigate();


  const salvarConsulta = async () => {
   
  const dataConsulta = {
    data: "2024-06-02",
    horario: horarioConsulta,
    tipoConsulta: tipoConsulta,
    statusConsulta: "AGUARDANDO_CONFIRMAÇÃO",
    pacienteId: "1"
};

  

try {
    const response = await apiPost("/agendar-consulta/criarConsulta", dataConsulta);
    if (response.status === STATUS_CODE.CREATED) {
        alert("Concluído com sucesso!");
        navigate('/');
    } else {
        alert(`Erro ao cadastrar consulta: ${response.statusText}`);
    }
} catch (error) {
    alert("Erro ao conectar com o servidor.");
    console.log(" dados: " + dataConsulta);
}

console.log(">>>>", dataConsulta);    

  };


  const handleContinuarClick = () => {
      navigate('/paciente');
  }

  const handleVoltarClick = () => {
    navigate('/home');
  }

  return (
    <div className='container-principal'>
      <div className="container-div">
        <div className="dropdown-medico">
          <div className="titulo-tipo-consulta">
            <h1 className="titulo-consulta">Escolha o tipo de consulta</h1>
          </div>
          <div className="option-dropdown-tipoConsulta">
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
          <Calendario />
          
        </div>
        <div className="vertical-line"></div>
          <div className="dropdown-medico">
          <div className="titulo-tipo-consulta">
            <h1 className="titulo-consulta">Escolha o horário</h1>
          </div>
          <div className="option-dropdown-horaConsulta">
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
          <div className="container-resumo-consulta">
          <p>Data:</p>
          <p>Consulta: {tipoConsulta}</p>
          <p>Horário: {horarioConsulta}</p>
          <p>Local:</p>
        </div>
            <div className="div-hora-botao">
            
            <div className="div-botao">
              <Button onClick={handleVoltarClick} variant="contained" color="primary">
                Voltar
              </Button>
              <Button
                onClick={() => {
                  if(tipoConsulta === "" || horarioConsulta === ""){
                    //validar data selecionada também
                    alert("É necessário preencher todos os dados!")
                  } else{
                    handleContinuarClick();
                  }
                }
                }
                variant="contained"
                color="primary">
                Continuar
              </Button>

              <Button variant="contained" onClick={salvarConsulta}>
                validar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgendarConsulta;
