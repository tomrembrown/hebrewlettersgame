import React, { Component } from 'react'
import Rank from './Rank/Rank'
import GameInfo from './GameInfo/GameInfo'
import GameBar from './GameBar/GameBar'
import GameBoard from './GameBoard/GameBoard'
import GameModal from './GameModal/GameModal'
import GameControlButtons from './GameControlButtons/GameControlButtons'
import RandomChoice from './RandomChoice/RandomChoice'
import gameData from '../../data/gamedata.json'
import columnInfoArray from '../../data/columnInfo.json'
import { shuffle } from '../../utils/arrayManipulation'
import './Game.css'
import { updateHighScore } from '../../api/api-client'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalGameTimeSeconds: 300,
      timeLeft: 300,
      correctOrWrong: '',
      numCorrect: 0,
      numWrong: 0,
      gameScore: 0,
      randomLetterIndex: -1,
      randomCharacterColumn: '',
      randomDataColumn: '',
      dataSetChosen: [],
      gameDataUnique: [],
      correctId: -1,
      isModalShown: false,
      modaltitle: 'Game Finished!',
      newHighScore: false,
    }
  }

  clickLetterButton = (id) => {
    const { correctId } = this.state
    const correct = id === correctId
    if (correct) {
      this.setState({
        correctOrWrong: 'Correct',
      })
      this.adjustScore('right')
      this.chooseRandomLetter()
    } else {
      this.setState({
        correctOrWrong: 'Wrong',
      })
      this.adjustScore('wrong')
    }
  }

  adjustScore = (rightOrWrong) => {
    const { numCorrect, numWrong, gameScore } = this.state
    const { baseScoreUnit } = this.props
    if (rightOrWrong === 'right') {
      this.setState({
        numCorrect: numCorrect + 1,
      })
      this.setState({
        gameScore: gameScore + baseScoreUnit,
      })
    } else if (rightOrWrong === 'wrong') {
      this.setState({
        numWrong: numWrong + 1,
      })
      this.setState({
        gameScore: gameScore - baseScoreUnit / 2,
      })
    }
  }

  chooseRandomLetter = () => {
    const { randomLetterIndex } = this.state
    const { characterColumnsInTest, dataColumnsInTest, randomTest } = this.props

    const randomCharacterColumn =
      characterColumnsInTest[
        this.getRandomInt(0, characterColumnsInTest.length - 1)
      ]
    const columnInfo = columnInfoArray.filter(
      (column) => column.columnName === randomCharacterColumn
    )[0]
    const randomCharacterType = columnInfo.dataElement
    const randomDataColumn =
      dataColumnsInTest[this.getRandomInt(0, dataColumnsInTest.length - 1)]
    this.setState({ randomCharacterColumn: randomCharacterColumn })
    this.setState({ randomDataColumn: randomDataColumn })

    const newDataSetChosen =
      gameData[`${randomCharacterType}_${randomDataColumn}`]

    this.setState({ dataSetChosen: newDataSetChosen })

    let newRandomLetterIndex
    do {
      newRandomLetterIndex = this.getRandomInt(0, newDataSetChosen.length - 1)
    } while (newRandomLetterIndex === randomLetterIndex)
    this.setState({
      randomLetterIndex: newRandomLetterIndex,
    })
    this.setState({
      correctId: newDataSetChosen[newRandomLetterIndex].id,
    })

    let newGameDataUnique = newDataSetChosen.filter((row, dataIndex) => {
      if (dataIndex === 0) return true
      else if (
        newDataSetChosen[dataIndex].id === newDataSetChosen[dataIndex - 1].id
      )
        return false
      else return true
    })

    if (randomTest) shuffle(newGameDataUnique)

    this.setState({
      gameDataUnique: newGameDataUnique,
    })
  }

  getRandomInt = (min, max) => {
    return min + Math.floor(Math.random() * Math.floor(max + 1 - min))
  }

  gameFinished = () => {
    if (this.props.isSignedIn) {
      const high_score = this.props.user_high_score
      if (high_score === null || this.state.gameScore > high_score) {
        this.setState({ newHighScore: true })
        updateHighScore(this.props.user_id, this.state.gameScore).then((user) =>
          this.props.loadUser(user)
        )
      }
    }
    this.showModal()
  }

  clearScores = () => {
    const { totalGameTimeSeconds } = this.state
    this.setState({ numCorrect: 0 })
    this.setState({ numWrong: 0 })
    this.setState({ gameScore: 0 })
    this.setState({ timeLeft: totalGameTimeSeconds })
  }

  stopGame = () => {
    this.clearScores()
    clearInterval(this.timerID)
  }

  startGame = () => {
    this.setState({ newHighScore: false })
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  restartGame = () => {
    this.stopGame()
    this.startGame()
  }

  showModal = () => {
    this.setState({ isModalShown: true })
  }
  hideModal = () => {
    this.setState({ isModalShown: false })
  }

  restartGameModal = () => {
    this.hideModal()
    this.restartGame()
  }

  tick() {
    const { timeLeft } = this.state
    if (this.props.gameInProgress) {
      this.setState({
        timeLeft: timeLeft - 1,
      })
      if (timeLeft === 1) {
        clearInterval(this.timerID)
        this.gameFinished()
      }
    } else {
      this.clearScores()
    }
  }

  componentDidMount() {
    this.chooseRandomLetter()
    this.startGame()
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  render() {
    const {
      randomLetterIndex,
      numCorrect,
      numWrong,
      gameScore,
      correctOrWrong,
      isModalShown,
      timeLeft,
      modaltitle,
      randomCharacterColumn,
      randomDataColumn,
      dataSetChosen,
      gameDataUnique,
      newHighScore,
    } = this.state

    const {
      isSignedIn,
      user_score_rank,
      user_handle,
      user_high_score,
    } = this.props

    return (
      <main id="game">
        <GameModal
          restartGameModal={this.restartGameModal}
          isModalShown={isModalShown}
          title={modaltitle}
        >
          <h4>Game Finished!</h4>
          <p>Your Score is {gameScore}</p>
          {newHighScore ? <p>New personal all-time high score!</p> : ''}
        </GameModal>
        {isSignedIn ? (
          <Rank
            user_score_rank={user_score_rank}
            user_handle={user_handle}
            user_high_score={user_high_score}
          />
        ) : (
          ''
        )}
        <div id="game-board">
          <GameInfo
            numCorrect={numCorrect}
            numWrong={numWrong}
            gameScore={gameScore}
          />
          <div id="inner-game">
            <GameBar correctOrWrong={correctOrWrong} timeLeft={timeLeft} />
            <RandomChoice
              dataSetChosen={dataSetChosen}
              randomLetterIndex={randomLetterIndex}
              randomCharacterColumn={randomCharacterColumn}
            />
            <GameBoard
              gameDataUnique={gameDataUnique}
              randomDataColumn={randomDataColumn}
              clickLetterButton={this.clickLetterButton}
            />
          </div>
        </div>
        <GameControlButtons restartGame={this.restartGame} />
      </main>
    )
  }
}

export default Game
