import React from 'react'
import './GameControlButtons.css'

const GameControlButtons = ({ restartGame }) => {
  return (
    <section id="game-control-buttons">
      <button onClick={restartGame} className="button-3d">
        Restart Game
      </button>
    </section>
  )
}

export default GameControlButtons
