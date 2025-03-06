import React from 'react';
import add from 'date-fns/add'

const currentDate = new Date()
const todayString = currentDate.toISOString().split('T')[0]
const nextWeekString = add(currentDate, { weeks: 1 }).toISOString().split('T')[0]
const times = ["9:00", "10:00", "11:00", "12:00"]

const renderTimes = times.map(t => { return <option value={t}>{t}</option> })
const renderTimeButtons = times.map(t => { return <button>{t}</button> })



function AppointmentScheduler() {
  return (
    <div className="scheduler">
      <input type="date" min={todayString} max={nextWeekString} />
      <select id="service">
        <option value="">Select an appointment</option>
        {renderTimes}
      </select>
      <br />
      {renderTimeButtons}
    </div>
  );
}

export default AppointmentScheduler