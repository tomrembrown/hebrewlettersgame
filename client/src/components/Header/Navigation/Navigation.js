import React, { Component } from 'react'
import './Navigation.css'

class Navigation extends Component {
  goToGameInner = () => {
    this.props.startGame()
    this.props.onMainRouteChange('game')
  }

  signoutInner = () => {
    this.props.signout()
  }

  signinInner = () => {
    this.props.stopGame()
    this.props.showSigninModal()
  }

  registerInner = () => {
    this.props.stopGame()
    this.props.showRegisterModal()
  }

  render() {
    const { onMainRouteChange, isSignedIn, mainRoute } = this.props

    let registrationButtons
    if (isSignedIn) {
      registrationButtons = (
        <li>
          <a onClick={this.signoutInner}>Sign Out</a>
        </li>
      )
    } else {
      registrationButtons = [
        <li key="signin">
          <a onClick={this.signinInner}>Sign In</a>
        </li>,
        <li key="register">
          <a onClick={this.registerInner}>Register</a>
        </li>,
      ]
    }

    return (
      <nav>
        <ul>
          <li key="game">
            <a
              onClick={this.goToGameInner}
              className={mainRoute === 'game' ? 'active' : ''}
            >
              Game
            </a>
          </li>
          <li key="setup">
            <a
              onClick={() => onMainRouteChange('setup')}
              className={mainRoute === 'setup' ? 'active' : ''}
            >
              Set Up
            </a>
          </li>
          <li key="hebrewalphabet">
            <a
              onClick={() => onMainRouteChange('hebrewalphabet')}
              className={mainRoute === 'hebrewalphabet' ? 'active' : ''}
            >
              Hebrew Alphabet
            </a>
          </li>
          <li key="highscores">
            <a
              onClick={() => onMainRouteChange('highscores')}
              className={mainRoute === 'highscores' ? 'active' : ''}
            >
              High Scores
            </a>
          </li>
          {registrationButtons}
        </ul>
      </nav>
    )
  }
}

export default Navigation
