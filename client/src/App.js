import React, { Component } from 'react'
import NavigationBar from './components/NavigationBar/NavigationBar'
import Game from './components/Game/Game'
import Setup from './components/Setup/Setup'
import HebrewAlphabetTable from './components/HebrewAlphabetTable/HebrewAlphabetTable'
import HighScores from './components/HighScores/HighScores'
import StartNewGame from './components/StartNewGame/StartNewGame'
import LoginModal from './components/LoginModal/LoginModal'
import columnInfoArray from './data/columnInfo.json'
import { getScoreList } from './api/api-client'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      gameInProgress: true,
      isSignedIn: false,
      mainRoute: 'game',
      signinOrRegister: 'signin',
      isLoginModalShown: false,
      characterColumnsInTest: ['aramaicBiblicalSerif'],
      dataColumnsInTest: ['name'],
      randomTest: false,
      isErrorModaShown: false,
      setupErrorMessage: '',
      user_id: null,
      user_handle: null,
      user_high_score: null,
      user_score_rank: null,
      highScores: [],
    }
  }

  onMainRouteChange = (mainRoute) => {
    this.setState({ mainRoute: mainRoute })
    if (mainRoute === 'highscores') {
      getScoreList().then((scoreList) => {
        this.setState({ highScores: scoreList })
      })
    }
  }

  showSigninModal = () => {
    this.setState({ signinOrRegister: 'signin' })
    this.setState({ isLoginModalShown: true })
  }

  showRegisterModal = () => {
    this.setState({ signinOrRegister: 'register' })
    this.setState({ isLoginModalShown: true })
  }

  successfullySignedIn = () => {
    this.setState({ isSignedIn: true })
    this.setState({ isLoginModalShown: false })
    this.startGame()
  }

  loadUser = (user) => {
    this.setState({ user_id: Number(user.id) })
    this.setState({ user_handle: user.user_handle })
    this.setState({
      user_high_score:
        user.high_score === null ? null : Number(user.high_score),
    })
    this.setState({
      user_score_rank:
        user.score_rank === null ? null : Number(user.score_rank),
    })
  }

  signout = () => {
    this.setState({ isSignedIn: false })
    this.setState({ isLoginModalShown: false })
    this.setState({ user_id: null })
    this.setState({ user_handle: null })
    this.setState({ user_high_score: null })
    this.setState({ user_score_rank: null })
  }

  stopGame = () => {
    this.setState({ gameInProgress: false })
  }

  startGame = () => {
    this.setState({ gameInProgress: true })
  }

  getBaseScoreUnit = () => {
    const { characterColumnsInTest, dataColumnsInTest, randomTest } = this.state
    return (
      characterColumnsInTest.length *
      dataColumnsInTest.length *
      (randomTest ? 2 : 1)
    )
  }

  changeSetup = (name) => {
    const { characterColumnsInTest, dataColumnsInTest, randomTest } = this.state
    if (name === 'randomTest') this.setState({ randomTest: !randomTest })
    else {
      const allPossibleCharacterColumns = columnInfoArray
        .filter((columnnInfo) => columnnInfo.columnType === 'character')
        .map((columnnInfo) => columnnInfo.columnName)
      const allPossibleDataColumns = columnInfoArray
        .filter((columnnInfo) => columnnInfo.columnType === 'data')
        .map((columnnInfo) => columnnInfo.columnName)
      if (allPossibleCharacterColumns.includes(name)) {
        if (characterColumnsInTest.includes(name)) {
          if (characterColumnsInTest.length === 1) {
            this.setState({ isErrorModalShown: true })
            this.setState({
              setupErrorMessage: 'At least one character column must be chosen',
            })
          } else {
            this.setState({
              characterColumnsInTest: characterColumnsInTest.filter(
                (column) => column !== name
              ),
            })
          }
        } else {
          this.setState({
            characterColumnsInTest: [...characterColumnsInTest, name],
          })
        }
      } else if (allPossibleDataColumns.includes(name)) {
        if (dataColumnsInTest.includes(name)) {
          if (dataColumnsInTest.length === 1) {
            this.setState({ isErrorModalShown: true })
            this.setState({
              setupErrorMessage: 'At least one data column must be chosen',
            })
          } else {
            this.setState({
              dataColumnsInTest: dataColumnsInTest.filter(
                (column) => column !== name
              ),
            })
          }
        } else {
          this.setState({
            dataColumnsInTest: [...dataColumnsInTest, name],
          })
        }
      } else {
        this.setState({ isErrorModalShown: true })
        this.setState({
          setupErrorMessage:
            'The column ' + name + ' does not exist in columnInfo.json file',
        })
      }
    }
  }

  exitErrorModal = () => {
    this.setState({ isErrorModalShown: false })
  }

  render() {
    const {
      mainRoute,
      isSignedIn,
      signinOrRegister,
      isLoginModalShown,
      gameInProgress,
      characterColumnsInTest,
      dataColumnsInTest,
      randomTest,
      isErrorModalShown,
      setupErrorMessage,
      user_id,
      user_handle,
      user_score_rank,
      user_high_score,
      highScores,
    } = this.state
    let mainSection = <div>{'Loading...'}</div>
    switch (mainRoute) {
      case 'game':
        mainSection = (
          <Game
            onMainRouteChange={this.onMainRouteChange}
            baseScoreUnit={this.getBaseScoreUnit()}
            signout={this.signout}
            loadUser={this.loadUser}
            gameInProgress={gameInProgress}
            isSignedIn={isSignedIn}
            characterColumnsInTest={characterColumnsInTest}
            dataColumnsInTest={dataColumnsInTest}
            randomTest={randomTest}
            user_id={user_id}
            user_handle={user_handle}
            user_score_rank={user_score_rank}
            user_high_score={user_high_score}
          />
        )
        break
      case 'setup':
        mainSection = (
          <Setup
            baseScoreUnit={this.getBaseScoreUnit()}
            changeSetup={this.changeSetup}
            characterColumnsInTest={characterColumnsInTest}
            dataColumnsInTest={dataColumnsInTest}
            randomTest={randomTest}
            exitErrorModal={this.exitErrorModal}
            isErrorModalShown={isErrorModalShown}
            setupErrorMessage={setupErrorMessage}
          />
        )
        break
      case 'hebrewalphabet':
        mainSection = <HebrewAlphabetTable />
        break
      case 'highscores':
        mainSection = <HighScores highScores={highScores} />
        break
      case 'startnewgame':
        mainSection = (
          <StartNewGame onMainRouteChange={this.onMainRouteChange} />
        )
        break
      default:
        mainSection = <div>{'Did not find route'}</div>
    }
    return (
      <div className="App">
        <LoginModal
          isLoginModalShown={isLoginModalShown}
          signinOrRegister={signinOrRegister}
          showRegisterModal={this.showRegisterModal}
          loadUser={this.loadUser}
          successfullySignedIn={this.successfullySignedIn}
        />
        <NavigationBar
          onMainRouteChange={this.onMainRouteChange}
          isSignedIn={isSignedIn}
          mainRoute={mainRoute}
          showSigninModal={this.showSigninModal}
          showRegisterModal={this.showRegisterModal}
          signout={this.signout}
          startGame={this.startGame}
          stopGame={this.stopGame}
        />
        {mainSection}
      </div>
    )
  }
}

export default App
