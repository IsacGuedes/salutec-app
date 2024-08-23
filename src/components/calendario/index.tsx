import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { Dayjs } from 'dayjs';
import './styles.css';

interface BasicDateCalendarProps {
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
  selectedDate: propSelectedDate = null,
  onDateChange,
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(propSelectedDate);
  const [disponibilidade, setDisponibilidade] = React.useState<Disponibilidade | null>(null);

  React.useEffect(() => {
    const disponibilidadeSalva = localStorage.getItem('disponibilidade');
    if (disponibilidadeSalva) {
      setDisponibilidade(JSON.parse(disponibilidadeSalva));
    }
  }, []);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  const CustomPickersDay: React.FC<PickersDayProps<Dayjs>> = (props) => {
    const { day, outsideCurrentMonth } = props;
    const dayOfWeek = day.day();
    const isAvailable = disponibilidade?.diasDaSemana.some(
      dia => diasSemanaMap[dia] === dayOfWeek
    );

    return (
      <PickersDay
        {...props}
        sx={{
          backgroundColor: isAvailable ? 'green' : 'gray',
          color: isAvailable ? 'white' : 'black',
          '&:hover': {
            backgroundColor: isAvailable ? 'darkgreen' : 'darkgray',
          },
        }}
        disabled={!isAvailable}
      />
    );
  };

  return (
    <div className='calendar'>
      <div className="titulo-calendario">
        <h1 className='titulo-calendar'>Escolha uma data e horário</h1>
      </div>
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
}

export default BasicDateCalendar;
