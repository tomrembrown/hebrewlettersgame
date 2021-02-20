import React from 'react'
import './StartNewGame.css'

const StartNewGame = ({ onMainRouteChange }) => {
  return (
    <div id="start-new-game">
      <button onClick={() => onMainRouteChange('game')}>Start New Game</button>
    </div>
  )
}

export default StartNewGame
