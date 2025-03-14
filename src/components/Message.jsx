import React from 'react'

const Message = ({ text, style }) => {
  return (
    <div className={style}>{text}</div>
  )
}

export default Message