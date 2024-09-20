import React, { FC, useEffect, useState } from "react";
import { Button, TextField, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Dayjs } from "dayjs";
import axios from 'axios';
import { CalendarOutlined, FormOutlined, ClockCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import BasicDateCalendar from "../../components/calendario";
import "./styles.css";

type Disponibilidade = {
  diasDaSemana: string[];
  horariosDisponiveis: string[];
};

type TipoConsulta = "Medico" | "Dentista";

const AgendarConsulta: FC = () => {
  const [tipoConsulta, setTipoConsulta] = useState<TipoConsulta | "">("");
  const [horario, setHorario] = useState("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [disponibilidade, setDisponibilidade] = useState<Disponibilidade | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const formatarHorarioParaBackend = (horario: string) => {
    const partes = horario.split(":");
    return `${partes[0]}:${partes[1]}:${partes[2]}`; // Retorna no formato HH:mm:ss
  };  

  useEffect(() => {
    if (tipoConsulta !== "" && selectedDate) {
      const dataConsulta = selectedDate.format("YYYY-MM-DD");

      axios
  .get(`http://localhost:8090/agendar-consulta/horarios-disponiveis`, { params: { tipoConsulta, data: dataConsulta } })
        .then((response) => {
          setDisponibilidade({
            diasDaSemana: [], // Se necessário, adicione a lógica para dias da semana
            horariosDisponiveis: response.data,
          });
        })
        .catch((error) => {
          setErro("Erro ao buscar horários disponíveis");
          setSnackbarOpen(true);
          console.error("Erro ao buscar horários disponíveis", error);
        });
    }
  }, [tipoConsulta, selectedDate]);

  const handleContinuarClick = () => {
    if (!tipoConsulta || !horario || !selectedDate) {
      alert("Preencha todos os dados!");
      return;
    }

    const diaSemana = selectedDate.format("dddd").toUpperCase(); // Obtém o dia da semana

    const consultaData = {
      dataConsulta: selectedDate.format("YYYY-MM-DD"),
      diaSemana, // Adiciona o dia da semana no payload
      tipoConsulta,
      horario: formatarHorarioParaBackend(horario),
      statusConsulta: "AGUARDANDO_CONFIRMACAO",
      pacienteId: null,
      postoDeSaude: 1,
    };

    sessionStorage.setItem("consultaData", JSON.stringify(consultaData));
    navigate("/paciente");
  };

  const handleVoltarClick = () => navigate("/home");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setErro(null);
  };

  return (
    <div className="container-principal">
      <div className="lembrete-consulta">
        <p>
          <InfoCircleOutlined /> Novos agendamentos são liberados diariamente.
        </p>
      </div>
      <div className="container-div">
        <div className="dropdown-medico">
          <h1 className="titulo-consulta">Escolha o tipo de consulta</h1>
          <TextField
            className="tipo-consulta"
            margin="dense"
            label="Tipo de Consulta"
            select
            fullWidth
            value={tipoConsulta}
            onChange={(e) => setTipoConsulta(e.target.value as TipoConsulta)}
            SelectProps={{ native: true }}
          >
            <option value=""></option>
            <option value="Dentista">Dentista</option>
            <option value="Medico">Médico</option>
          </TextField>
          {tipoConsulta && (
            <BasicDateCalendar
              tipo={tipoConsulta}
              selectedDate={selectedDate}
              onDateChange={(date: Dayjs | null) => setSelectedDate(date)}
            />
          )}
        </div>
        <div className="dropdown-medico">
          <h1 className="titulo-consulta">Escolha o horário</h1>
          <TextField
            className="horario-consulta"
            margin="dense"
            label="Horário"
            select
            fullWidth
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            SelectProps={{ native: true }}
          >
            <option value=""></option>
            {disponibilidade?.horariosDisponiveis.map((h, index) => (
              <option key={index} value={h}>{h}</option>
            ))}
          </TextField>
          <div className="container-resumo-consulta">
            <p><CalendarOutlined /> Data: {selectedDate?.format("DD/MM/YYYY")}</p>
            <p><FormOutlined /> Consulta: {tipoConsulta}</p>
            <p><ClockCircleOutlined /> Horário: {horario}</p>
          </div>
          <div className="div-botao">
            <Button onClick={handleVoltarClick} variant="contained">Voltar</Button>
            <Button onClick={handleContinuarClick} variant="contained">Continuar</Button>
          </div>
        </div>
      </div>

      {/* Snackbar para exibir erros */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={erro}
      />
    </div>
  );
};

export default AgendarConsulta;
