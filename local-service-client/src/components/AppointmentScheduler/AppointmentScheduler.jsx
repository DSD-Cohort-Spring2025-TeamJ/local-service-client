import React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import './scheduler.css'


const todayAtNoon = dayjs().set('hour', 12).startOf('hour');
const todayAt3PM = dayjs().set('hour', 15).startOf('hour');

function AppointmentScheduler() {
  return (
    <div className="scheduler">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker defaultValue={todayAtNoon} minDateTime={todayAt3PM} />
      </LocalizationProvider>
    </div>
  );
}

export default AppointmentScheduler