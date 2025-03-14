import React, { useContext, useState } from 'react';
import add from 'date-fns/add'
import { Context } from '../context/Context';

function AppointmentScheduler() {
  const { selectedService, appointment, setAppointment } = useContext(Context);

  if (!selectedService) return <h3>Loading...</h3>

  const currentDate = new Date();
  const todayString = currentDate.toISOString().split("T")[0];
  const nextWeekString = add(currentDate, { days: 6 })
    .toISOString()
    .split("T")[0];

  const [day, setDay] = useState(todayString);

  const sortByTime = (arr) => {
    return arr.sort((a, b) => {
      const dateA = new Date(`01/01/2000 ${a}`);
      const dateB = new Date(`01/01/2000 ${b}`);
      return dateA - dateB;
    });
  };

  // NOTE - this is the logic for grabbing all technicians' time slots and condensing them into an ordered list with no duplicates
  // const times = () => {
  //   let slots = [];
  //   let arrays = Object.values(selectedService.availableTimeSlotsByTechnician)
  //   arrays.map(t => t[day].map(d => slots.push(d)))
  //   return sortByTime([...new Set(slots)])
  // }

  // NOTE - this grabs only the first technician's time slots
  const times = () => {
    let firstTechSlots = Object.values(
      selectedService.availableTimeSlotsByTechnician,
    )[0];
    let slots = firstTechSlots[day];
    return sortByTime(slots);
  };

  const handleDayChange = (e) => {
    setDay(e.target.value);
    setAppointment({
      ...appointment,
      date: e.target.value,
    });
  };
  const handleSlotSelection = (e) => {
    setAppointment({
      ...appointment,
      time_slot: e.target.value,
      tech_id: 1, // NOTE - here we are hard-coding the first technician's tech_id into the future POST body
    });
  };

  const timeEstimate = () => {
    let minutes = parseInt(selectedService.estimated_time)
    return (minutes >= 60) ? `${minutes / 60} hour(s)` : `${minutes} minutes`
  }

  const renderTimeButtons = times().map((t, i) => {
    return (
      <button type="button" key={i} value={t} onClick={handleSlotSelection}>
        {t}
      </button>
    );
  });

  return (
    <div>
      <h1>Select a Date and a Start Time</h1>
      <p>Estimated completion time: {timeEstimate()}</p>
      <input
        type="date"
        min={todayString}
        max={nextWeekString}
        onChange={handleDayChange}
      />
      <br />
      {renderTimeButtons}
      <br />
    </div>
  );
}

export default AppointmentScheduler;
