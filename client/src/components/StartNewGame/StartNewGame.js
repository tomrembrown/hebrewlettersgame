import React from 'react'
import './StartNewGame.css'

const StartNewGame = ({ onMainRouteChange }) => {
  return (
    <main id="start-new-game">
      <button onClick={() => onMainRouteChange('game')}>Start New Game</button>
    </main>
  )
}

export default StartNewGame
