import React, { FC, useEffect, useState } from "react";
import BasicDateCalendar from "../../components/calendario";
import DisponibilidadeForm from "../personalizaAgenda/disponibilidadeFormProps";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { Dayjs } from "dayjs";
import { CalendarOutlined, FormOutlined, ClockCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";

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
  const [mostrarDisponibilidadeForm, setMostrarDisponibilidadeForm] = useState(false);
  const navigate = useNavigate();

  const formatarHorarioParaBackend = (horario: string) => {
    return horario + ":00";
  };

  useEffect(() => {
    if (tipoConsulta !== "") {
      const disponibilidadeSalva = localStorage.getItem(`disponibilidade-${tipoConsulta}`);
      if (disponibilidadeSalva) {
        setDisponibilidade(JSON.parse(disponibilidadeSalva));
      } else {
        setDisponibilidade(null);
        setMostrarDisponibilidadeForm(true);
      }
    }
  }, [tipoConsulta]);

  //  const handleDisponibilidadeChange = (novaDisponibilidade: Disponibilidade) => {
  //    alert("olá")
  //  };

  const handleContinuarClick = () => {
    if (tipoConsulta === "" || horario === "" || selectedDate === null) {
      alert("É necessário preencher todos os dados!");
    } else {
      const consultaData = {
        dataConsulta: selectedDate?.format("YYYY-MM-DD"),
        tipoConsulta: tipoConsulta,
        horario: formatarHorarioParaBackend(horario),
        statusConsulta: "AGUARDANDO_CONFIRMACAO",
        pacienteId: null,
      };
      sessionStorage.setItem("consultaData", JSON.stringify(consultaData));
      navigate("/paciente");
    }
  };

  const handleVoltarClick = () => {
    navigate("/home");
  };

  return (
    <div className="container-principal">
        <>
          <div className="lembrete-consulta">
            <p>
              <InfoCircleOutlined /> Novos agendamentos são liberados diariamente.
              Cada unidade possui intervalo de agendamento próprio.
            </p>
          </div>
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
                onChange={(e) => setTipoConsulta(e.target.value as TipoConsulta | "")}
                SelectProps={{ native: true }}
              >
                <option value=""></option>
                <option value="Dentista">Dentista</option>
                <option value="Medico">Médico</option>
              </TextField>
              {tipoConsulta && (
                <BasicDateCalendar
                  tipo={tipoConsulta as TipoConsulta}
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
                id="horario-consulta"
                label="Selecione o horário"
                select
                fullWidth
                variant="standard"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                SelectProps={{ native: true }}
              >
                <option value=""></option>
                {disponibilidade?.horariosDisponiveis?.map((horarioDisponivel, index) => (
                  <option key={index} value={horarioDisponivel}>
                    {horarioDisponivel}
                  </option>
                ))}
              </TextField>
              <div className="container-resumo-consulta">
                <p>
                  <CalendarOutlined /> Data: {selectedDate?.format("DD/MM/YYYY")}
                </p>
                <p>
                  <FormOutlined /> Consulta: {tipoConsulta}
                </p>
                <p>
                  <ClockCircleOutlined /> Horário: {horario}
                </p>
              </div>
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
        </>
      )
    </div>
  );
};

export default AgendarConsulta;
