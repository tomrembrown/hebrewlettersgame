import React from 'react'

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
