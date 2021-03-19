import React, { Component } from 'react'
import HighScoresTables from './HighScoresTable'
import { getScoreList } from '../../api/api-client'

class HighScores extends Component {
  constructor() {
    super()
    this.state = {
      highScores: [],
    }
  }

  componentDidMount() {
    getScoreList().then((scoreList) => {
      this.setState({ highScores: scoreList })
    })
  }

  render() {
    const { highScores } = this.state

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
}

export default HighScores
