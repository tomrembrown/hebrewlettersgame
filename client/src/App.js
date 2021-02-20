import React, { Component } from 'react'
import NavigationBar from './components/NavigationBar/NavigationBar'
import Game from './components/Game/Game'
import Setup from './components/Setup/Setup'
import HebrewAlphabetTable from './components/HebrewAlphabetTable/HebrewAlphabetTable'
import HighScores from './components/HighScores/HighScores'
import StartNewGame from './components/StartNewGame/StartNewGame'
import LoginModal from './components/LoginModal/LoginModal'
import columnInfoArray from './data/columnInfo.json'
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
    }
  }

  onMainRouteChange = (mainRoute) => {
    this.setState({ mainRoute: mainRoute })
  }

  showSigninModal = () => {
    this.setState({ signinOrRegister: 'signin' })
    this.setState({ isLoginModalShown: true })
  }

  showRegisterModal = () => {
    this.setState({ signinOrRegister: 'register' })
    this.setState({ isLoginModalShown: true })
  }

  signin = () => {
    this.setState({ isSignedIn: true })
    this.setState({ isLoginModalShown: false })
    this.startGame()
  }

  register = () => {
    this.setState({ isSignedIn: true })
    this.setState({ isLoginModalShown: false })
    this.startGame()
  }

  signout = () => {
    this.setState({ isSignedIn: false })
    this.setState({ isLoginModalShown: false })
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
    } = this.state
    let mainSection = <div>{'Loading...'}</div>
    switch (mainRoute) {
      case 'game':
        mainSection = (
          <Game
            onMainRouteChange={this.onMainRouteChange}
            baseScoreUnit={this.getBaseScoreUnit()}
            signout={this.signout}
            gameInProgress={gameInProgress}
            isSignedIn={isSignedIn}
            characterColumnsInTest={characterColumnsInTest}
            dataColumnsInTest={dataColumnsInTest}
            randomTest={randomTest}
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
        mainSection = <HighScores />
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
          signin={this.signin}
          register={this.register}
          showRegisterModal={this.showRegisterModal}
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
