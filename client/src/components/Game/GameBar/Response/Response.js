import React from 'react'
import './Response.css'

const Response = ({ correctOrWrong }) => {
  return (
    <section
      id="response"
      className={correctOrWrong ? correctOrWrong.toLowerCase() : ''}
    >
      {correctOrWrong}
    </section>
  )
}

export default Response
