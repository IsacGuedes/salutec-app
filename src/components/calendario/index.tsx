import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { Dayjs } from "dayjs";
import axios from "axios"; // Certifique-se de que o axios está importado
import "./styles.css";

interface BasicDateCalendarProps {
  tipo: 'Medico' | 'Dentista';
  selectedDate?: Dayjs | null;
  onDateChange?: (date: Dayjs | null) => void;
}

type Disponibilidade = {
  diasDaSemana: string[];
  horariosDisponiveis: string[];
};

// Mapeamento para dias da semana em inglês
const diasSemanaMap: { [key: string]: number } = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

const BasicDateCalendar: React.FC<BasicDateCalendarProps> = ({
  tipo,
  selectedDate: propSelectedDate = null,
  onDateChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(propSelectedDate);
  const [disponibilidade, setDisponibilidade] = useState<Disponibilidade | null>(null);

  // Fazer a requisição para buscar os dias disponíveis
  useEffect(() => {
    const fetchDisponibilidade = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8090/agendar-consulta/dias-disponiveis?tipoConsultaId=${tipo === 'Medico' ? 1 : 2}`
        );
        // Definir os dias de disponibilidade retornados pela API
        setDisponibilidade({ diasDaSemana: response.data, horariosDisponiveis: [] });
      } catch (error) {
        console.error("Erro ao buscar disponibilidade:", error);
      }
    };
    fetchDisponibilidade();
  }, [tipo]);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  const CustomPickersDay: React.FC<PickersDayProps<Dayjs>> = (props) => {
    const { day } = props;
    const dayOfWeek = day.day();
    const isBeforeToday = day.isBefore(new Date());

    // Verifique se o dia está disponível (mapeando o retorno da API)
    const isAvailable =
      disponibilidade?.diasDaSemana.some(
        (dia) => diasSemanaMap[dia.toUpperCase()] === dayOfWeek
      ) && !isBeforeToday;

    return (
      <PickersDay
        {...props}
        sx={{
          backgroundColor: isAvailable ? "green" : "gray",
          color: isAvailable ? "white" : "black",
          "&:hover": {
            backgroundColor: isAvailable ? "darkgreen" : "darkgray",
          },
        }}
        disabled={!isAvailable}
      />
    );
  };

  return (
    <div className="calendar">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={selectedDate}
          onChange={handleDateChange}
          slots={{
            day: CustomPickersDay,
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default BasicDateCalendar;
