import React, { useContext, useState } from 'react';
import add from 'date-fns/add'
import { Context } from '../context/Context';

function AppointmentScheduler() {

  const { selectedService, appointment, setAppointment } = useContext(Context);

  const currentDate = new Date()
  const todayString = currentDate.toISOString().split('T')[0]
  const nextWeekString = add(currentDate, { weeks: 1 }).toISOString().split('T')[0]

  const [day, setDay] = useState(todayString)

  const sortByTime = (arr) => {
    return arr.sort((a, b) => {
      const dateA = new Date(`01/01/2000 ${a}`);
      const dateB = new Date(`01/01/2000 ${b}`);
      return dateA - dateB;
    });
  }

  const times = () => {
    let slots = [];
    let arrays = Object.values(selectedService.availableTimeSlotsByTechnician)
    arrays.map(t => t[day].map(d => slots.push(d)))
    return sortByTime([...new Set(slots)])
  }

  const handleDayChange = (e) => {
    setDay(e.target.value)
    setAppointment({
      ...appointment,
      date: e.target.value
    })
  }
  const handleSlotSelection = (e) => {
    setAppointment({
      ...appointment,
      time_slot: e.target.value
    })
  }
  const renderTimeButtons = times().map((t, i) => { return <button key={i} value={t} onClick={handleSlotSelection}>{t}</button> })

  return (
    <div>
      <p>Estimated completion time: {selectedService.estimated_time} minutes</p>
      <input type="date" min={todayString} max={nextWeekString} onChange={handleDayChange} />
      <br />
      {renderTimeButtons}
    </div>
  );
}

export default AppointmentScheduler