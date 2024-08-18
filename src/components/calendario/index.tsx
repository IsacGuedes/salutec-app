import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Dayjs } from 'dayjs'; // Importar Dayjs para o tipo de data
import './styles.css';

export default function BasicDateCalendar() {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);

  // const handleDateChange = (date: Dayjs | null) => {
  //   setSelectedDate(date);
  //   console.log('Data selecionada:', date ? date.format('DD-MM-YYYY') : 'Nenhuma data selecionada');
  // };

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = date.format('DD/MM/YYYY');
      localStorage.setItem('selectedDate', formattedDate); // Armazena a data no localStorage
      console.log('Data selecionada:', formattedDate);
    } else {
      localStorage.removeItem('selectedDate'); // Remove a data se não houver seleção
    }
  };
  
  const date = selectedDate ? selectedDate.format('DD/MM/YYYY') : 'Nenhuma data selecionada'
  
  return (
    <div className='calendar'>
      <div className="titulo-calendario">
        <h1 className='titulo-calendar'>Escolha uma data e horário</h1>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          className='calendar-container'
          onChange={handleDateChange}
        />
      </LocalizationProvider>
          </div>
  );
}
