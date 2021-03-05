import React from 'react'
import './HighScores.css'
import HighScoresTables from './HighScoresTable'

const HighScores = ({ highScores }) => {
  return (
    <main id="high-scores">
      {highScores.length === 0 ? (
        <h2>No High Scores Yet</h2>
      ) : (
        <HighScoresTables highScores={highScores} />
      )}
    </main>
  )
}

export default HighScores
