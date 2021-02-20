import React from 'react'
import './Response.css'

const Response = ({ correctOrWrong }) => {
  return (
    <div
      id="response"
      className={correctOrWrong ? correctOrWrong.toLowerCase() : ''}
    >
      {correctOrWrong}
    </div>
  )
}

export default Response
