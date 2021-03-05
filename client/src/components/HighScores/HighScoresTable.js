import React from 'react'
import './HighScores.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'

const HighScoresTable = ({ highScores }) => {
  return (
    <table id="high-scores-table">
      <thead>
        <tr className="top-row">
          <th colSpan={4}>HIGHSCORES</th>
        </tr>
        <tr className="second-row">
          <th colSpan={2}>RANK</th>
          <th>SCORE</th>
          <th className="name-col">PLAYER</th>
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
          let trophycolor = ''
          if (score_rank === 1) trophycolor = ' goldtrophy'
          else if (score_rank === 2) trophycolor = ' silvertrophy'
          else if (score_rank === 3) trophycolor = ' bronzetrophy'
          return (
            <tr
              className={'datarow ' + (score_rank === 1 ? 'first' : 'other')}
              key={user_handle}
            >
              <td className={'trophycol' + trophycolor}>
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
  )
}

export default HighScoresTable
