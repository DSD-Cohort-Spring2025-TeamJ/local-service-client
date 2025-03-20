import React from 'react'
import Button from './Button'

const DayCard = ({ date, slots, buttonFunction }) => {

  const slotButtons = slots.map(s => <Button text={s} onClick={buttonFunction} />)
  return (
    <div>
      <h2>{date}</h2>
      {slotButtons}
    </div>
  )
}

export default DayCard