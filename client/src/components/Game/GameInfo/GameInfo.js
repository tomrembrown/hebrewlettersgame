import React from 'react'
import './GameInfo.css'

const Logo = ({ numCorrect, numWrong, gameScore }) => {
  const percentCorrect =
    numWrong === 0 && numCorrect === 0
      ? ''
      : ((numCorrect / (numWrong + numCorrect)) * 100).toFixed(1) + '%'
  return (
    <section id="game-info">
      <div className="element">
        <p className="text"> {' Number Correct: '}</p>{' '}
        <p className="score"> {numCorrect} </p>
      </div>
      <div className="element">
        <p className="text"> {' Number Wrong: '}</p>{' '}
        <p className="score"> {numWrong} </p>
      </div>
      <div className="element">
        <p className="text"> {' Percent Correct: '}</p>{' '}
        <p className="score"> {percentCorrect} </p>
      </div>
      <div className="element">
        <p className="text"> {' Game Score: '}</p>{' '}
        <p className="score"> {gameScore} </p>
      </div>
    </section>
  )
}

export default Logo
