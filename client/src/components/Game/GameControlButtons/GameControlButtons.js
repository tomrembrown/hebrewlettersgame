import React from 'react'
import './GameControlButtons.css'

const GameControlButtons = ({ restartGame }) => {
  return (
    <section id="game-control-buttons">
      <button onClick={restartGame}>Restart Game</button>
    </section>
  )
}

export default GameControlButtons
