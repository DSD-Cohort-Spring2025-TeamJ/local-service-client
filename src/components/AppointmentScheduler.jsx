import React, { useContext, useState } from 'react';
import add from 'date-fns/add'
import { Context } from '../context/Context';
import Button from '/src/components/Button.jsx'

function AppointmentScheduler() {

  const { selectedService, appointment, setAppointment } = useContext(Context);

  const currentDate = new Date()
  const todayString = currentDate.toISOString().split('T')[0]
  const nextWeekString = add(currentDate, { days: 6 }).toISOString().split('T')[0]

  const [day, setDay] = useState(todayString)

  const sortByTime = (arr) => {
    return arr.sort((a, b) => {
      const dateA = new Date(`01/01/2000 ${a}`);
      const dateB = new Date(`01/01/2000 ${b}`);
      return dateA - dateB;
    });
  }

  // NOTE - this is the logic for grabbing all technicians' time slots and condensing them into an ordered list with no duplicates
  // const times = () => {
  //   let slots = [];
  //   let arrays = Object.values(selectedService.availableTimeSlotsByTechnician)
  //   arrays.map(t => t[day].map(d => slots.push(d)))
  //   return sortByTime([...new Set(slots)])
  // }

  // NOTE - this grabs only the first technician's time slots
  const times = () => {
    let firstTechSlots = Object.values(selectedService.availableTimeSlotsByTechnician)[0]
    let slots = firstTechSlots[day]
    return sortByTime(slots)
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
      time_slot: e.target.value,
      tech_id: 1 // NOTE - here we are hard-coding the first technician's tech_id into the future POST body
    })
  }
  // CAN BUTTON COMPONENT WORK THERE?
  const renderTimeButtons = times().map((t, i) => { return 
    <Button 
        className="bg-[#4BCE4B] rounded-[1rem] no-underline px-[5px] py-[5px] w-[100px]
        shadow-[inset_0_-25px_18px_-14px_rgba(1,185,38,0.35),0_1px_2px_rgba(1,177,30,0.35),0_2px_4px_rgba(3,194,79,0.35),0_4px_8px_rgba(1,192,17,0.35),0_8px_16px_rgba(1,119,42,0.35),0_16px_32px_rgba(2,199,78,0.35)]
        text-[#4B4B4B] font-sans border-[1px] border-[#4BCE4B]
        hover:bg-green-700 hover:text-white
        active:scale-90 border-[#005701]"
        text={t}
        key={i}
        value={t}
        onClick={handleSlotSelection}
        type="submit"/>
  
  // <button key={i} value={t} onClick={handleSlotSelection}>
    
  //   {t}</button> 
    })

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