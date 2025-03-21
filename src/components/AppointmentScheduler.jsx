import React, { useContext, useState } from "react";
import DayCard from "./DayCard";
import add from "date-fns/add";
import { Context } from "../context/Context";

function AppointmentScheduler() {
  const { selectedService, appointment, setAppointment } = useContext(Context);

  if (!selectedService) return <h3>Loading...</h3>;

  // NOTE: Just in case the time slots ever appear out of order we can use this again
  // const sortByTime = (arr) => {
  //   return arr.sort((a, b) => {
  //     const dateA = new Date(`01/01/2000 ${a}`);
  //     const dateB = new Date(`01/01/2000 ${b}`);
  //     return dateA - dateB;
  //   });
  // };

  // NOTE - this is the logic for grabbing all technicians' time slots and condensing them into an ordered list with no duplicates
  // const times = () => {
  //   let slots = [];
  //   let arrays = Object.values(selectedService.availableTimeSlotsByTechnician)
  //   arrays.map(t => t[day].map(d => slots.push(d)))
  //   return sortByTime([...new Set(slots)])
  // }


  const handleSlotSelection = (date, start, end) => {
    setAppointment({
      ...appointment,
      date: date,
      start_time: start,
      end_time: end,
      tech_id: 1 // NOTE - here we are hard-coding the first technician's tech_id into the future POST body
    });
  };

  const renderDayCards = () => {
    let firstTechSlots = Object.values(selectedService.availableTimeSlotsByTechnician)[0];
    return Object.entries(firstTechSlots).map((arr, i) => <DayCard key={i} date={arr[0]} slots={arr[1]} buttonFunction={handleSlotSelection} />)
  }

  const timeEstimate = () => {
    let minutes = parseInt(selectedService.estimated_time);
    return minutes >= 60 ? `${minutes / 60} hour(s)` : `${minutes} minutes`;
  };


  return (
    <div>
      <h1>Select an appointment slot:</h1>
      <p>Estimated completion time: {timeEstimate()}</p>
      <br />
      <div className="day-wrapper">
        {renderDayCards()}
      </div>
      <br />
    </div>
  );
}

export default AppointmentScheduler;
