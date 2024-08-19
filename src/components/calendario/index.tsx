import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Dayjs } from 'dayjs';
import './styles.css';

interface BasicDateCalendarProps {
  selectedDate?: Dayjs | null;
  onDateChange?: (date: Dayjs | null) => void;
}

const BasicDateCalendar: React.FC<BasicDateCalendarProps> = ({
  selectedDate: propSelectedDate = null,
  onDateChange,
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(propSelectedDate);

  React.useEffect(() => {
    setSelectedDate(propSelectedDate);
  }, [propSelectedDate]);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = date.format('DD/MM/YYYY');
      localStorage.setItem('selectedDate', formattedDate);
      console.log('Data selecionada:', formattedDate);
    } else {
      localStorage.removeItem('selectedDate');
    }
    if (onDateChange) {
      onDateChange(date);
    }
  };

  return (
    <div className='calendar'>
      <div className="titulo-calendario">
        <h1 className='titulo-calendar'>Escolha uma data e horário</h1>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          className='calendar-container'
          value={selectedDate}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
    </div>
  );
}

export default BasicDateCalendar;
