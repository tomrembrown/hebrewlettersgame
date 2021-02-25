import React from 'react'
import './HighScores.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'

const HighScoresTable = ({ highScores }) => {
  return (
    <div id="high-scores-table">
      <table>
        <thead>
          <tr className="top-row">
            <th colSpan={4}>HIGHSCORES</th>
          </tr>
          <tr>
            <th colSpan={2}>RANK</th>
            <th>SCORE</th>
            <th>PLAYER</th>
          </tr>
        </thead>
        <tbody>
          {highScores.map((thisScore) => {
            const { score_rank, high_score, user_handle } = thisScore
            let afterNumber
            if (score_rank % 10 === 1) afterNumber = 'ST'
            else if (score_rank % 10 === 2) afterNumber = 'ND'
            else if (score_rank % 10 === 3) afterNumber = 'RD'
            else afterNumber = 'TH'
            const displayTrophy =
              score_rank === 1 || score_rank === 2 || score_rank === 3
            return (
              <tr
                className={score_rank === 1 ? 'first' : 'other'}
                key={user_handle}
              >
                <td className="trophy-col">
                  {displayTrophy ? <FontAwesomeIcon icon={faTrophy} /> : ''}
                </td>
                <td className="rank-col">
                  {score_rank.toString() + afterNumber}
                </td>
                <td className="score-col">{high_score}</td>
                <td className="name-col">{user_handle}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default HighScoresTable
