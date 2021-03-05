import React from 'react'
import './GameControlButtons.css'

const GameControlButtons = ({ restartGame, exitGame }) => {
  return (
    <section id="game-control-buttons">
      <button onClick={restartGame}>Restart Game</button>
      <button onClick={exitGame}>Exit Game</button>
    </section>
  )
}

export default GameControlButtons
