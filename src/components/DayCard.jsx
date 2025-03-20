import React from 'react'
import Button from './Button'
import { format } from 'date-fns'

const DayCard = ({ date, slots, buttonFunction }) => {

  const slotButtons = slots.map((s, i) => <Button key={i} id={date} value={s} className="details-button" text={s} onClick={buttonFunction} />)
  return (
    <div>
      {/* for some reason, date-fns format() returns one day previous with a hyphenated date, so we switch to slashes here */}
      <h2>{format(date.replace(/-/g, '/'), 'EEEE, MMMM do')}</h2>
      {slotButtons}
    </div>
  )
}

export default DayCard