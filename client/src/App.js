import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header/Header'
import Game from './components/Game/Game'
import Setup from './components/Setup/Setup'
import HebrewAlphabetTable from './components/HebrewAlphabetTable/HebrewAlphabetTable'
import HighScores from './components/HighScores/HighScores'
import LoginModal from './components/LoginModal/LoginModal'
import columnInfoArray from './data/columnInfo.json'
import Footer from './components/Footer/Footer'
import PageNotFound from './components/PageNotFound/PageNotFound'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      gameInProgress: true,
      isSignedIn: false,
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

  closeLoginModal = () => {
    this.setState({ isLoginModalShown: false })
    this.startGame()
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
    console.log("URL: " + window.location.href)
    const {
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
    } = this.state
    return (
      <div className="App">
        <Router>
          <LoginModal
            isLoginModalShown={isLoginModalShown}
            signinOrRegister={signinOrRegister}
            showRegisterModal={this.showRegisterModal}
            showSigninModal={this.showSigninModal}
            loadUser={this.loadUser}
            successfullySignedIn={this.successfullySignedIn}
            closeLoginModal={this.closeLoginModal}
          />
          <Header
            isSignedIn={isSignedIn}
            showSigninModal={this.showSigninModal}
            showRegisterModal={this.showRegisterModal}
            signout={this.signout}
            startGame={this.startGame}
            stopGame={this.stopGame}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Game
                  {...props}
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
              )}
            />
            <Route
              exact
              path="/setup"
              render={(props) => (
                <Setup
                  {...props}
                  baseScoreUnit={this.getBaseScoreUnit()}
                  changeSetup={this.changeSetup}
                  characterColumnsInTest={characterColumnsInTest}
                  dataColumnsInTest={dataColumnsInTest}
                  randomTest={randomTest}
                  exitErrorModal={this.exitErrorModal}
                  isErrorModalShown={isErrorModalShown}
                  setupErrorMessage={setupErrorMessage}
                />
              )}
            />
            <Route exact path="/alphabet" component={HebrewAlphabetTable} />
            <Route exact path="/scores" component={HighScores} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
        <Footer />
      </div>
    )
  }
}

export default App
