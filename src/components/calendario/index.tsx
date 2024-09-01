import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { Dayjs } from "dayjs";
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

const diasSemanaMap: { [key: string]: number } = {
  DOMINGO: 0,
  SEGUNDA: 1,
  TERCA: 2,
  QUARTA: 3,
  QUINTA: 4,
  SEXTA: 5,
  SABADO: 6,
};

const BasicDateCalendar: React.FC<BasicDateCalendarProps> = ({
  tipo,
  selectedDate: propSelectedDate = null,
  onDateChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(propSelectedDate);
  const [disponibilidade, setDisponibilidade] = useState<Disponibilidade | null>(null);

  useEffect(() => {
    const disponibilidadeSalva = localStorage.getItem(`disponibilidade-${tipo}`);
    if (disponibilidadeSalva) {
      setDisponibilidade(JSON.parse(disponibilidadeSalva));
    }
  }, [tipo]);
  

  const dataAtual = new Date().toISOString().split("T")[0];
  const mesAtual = new Date().getMonth();

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  const CustomPickersDay: React.FC<PickersDayProps<Dayjs>> = (props) => {
    const { day } = props;
    const dayOfWeek = day.day();
    const isBeforeToday = day.isBefore(dataAtual);
    const isCurrentMonth = day.month() === mesAtual;
  
    const isAvailable =
      disponibilidade?.diasDaSemana.some(
        (dia) => diasSemanaMap[dia] === dayOfWeek
      ) &&
      !isBeforeToday &&
      isCurrentMonth;
  
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
