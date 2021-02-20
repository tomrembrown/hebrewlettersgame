import React from 'react'
import './GameInfo.css'

const Logo = ({ numCorrect, numWrong, gameScore }) => {
  const percentCorrect =
    numWrong === 0 && numCorrect === 0
      ? ''
      : ((numCorrect / (numWrong + numCorrect)) * 100).toFixed(1) + '%'
  return (
    <div id="game-info">
      <div className="element">
        <span className="text"> {' Number Correct: '}</span>{' '}
        <span className="score"> {numCorrect} </span>
      </div>
      <div className="element">
        <span className="text"> {' Number Wrong: '}</span>{' '}
        <span className="score"> {numWrong} </span>
      </div>
      <div className="element">
        <span className="text"> {' Percent Correct: '}</span>{' '}
        <span className="score"> {percentCorrect} </span>
      </div>
      <div className="element">
        <span className="text"> {' Game Score: '}</span>{' '}
        <span className="score"> {gameScore} </span>
      </div>
    </div>
  )
}

export default Logo
