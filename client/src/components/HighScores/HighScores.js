import React from 'react'
import './HighScores.css'
import HighScoresTables from './HighScoresTable'

const HighScores = ({ highScores }) => {
  return (
    <div id="high-scores">
      {highScores.length === 0 ? (
        <h1>No High Scores Yet</h1>
      ) : (
        <HighScoresTables highScores={highScores} />
      )}
    </div>
  )
}

export default HighScores
