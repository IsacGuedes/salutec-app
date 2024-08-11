import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import './calendario.css';

export default function BasicDateCalendar() {
  return (
    <div className='calendar'>
      <div className="titulo-calendario">
        <h1 className='titulo-calendar'>Escolha uma data e horário</h1>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar className='calendar-container' />
      </LocalizationProvider>
    </div>
  );
}
