import React from 'react'
import './GameBar.css'
import Response from './Response/Response'
import Timer from './Timer/Timer'

const GameBar = ({ correctOrWrong, timeLeft }) => {
  return (
    <div id="game-bar">
      <Response correctOrWrong={correctOrWrong} />
      <Timer timeLeft={timeLeft} />
    </div>
  )
}

export default GameBar
