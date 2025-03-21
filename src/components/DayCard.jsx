import React from 'react'
import Button from './Button'
import { format } from 'date-fns'

const DayCard = ({ date, slots, buttonFunction }) => {

  const slotButtons = slots.map((s, i) => <Button key={i} className="slot-button" text={s.start + " - " + s.end} onClick={() => buttonFunction(date, s.start, s.end)} />)
  return (
    <div className="day-card">
      {/* for some reason, date-fns format() returns one day previous with a hyphenated date, so we switch to slashes here */}
      <h2 className="day-header">{format(date.replace(/-/g, '/'), 'EEEE, MMMM do')}</h2>
      <div className="button-grid">
        {slotButtons}
      </div>
    </div>
  )
}

export default DayCard