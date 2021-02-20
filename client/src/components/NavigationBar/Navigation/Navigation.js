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
          <p onClick={this.signoutInner}>Sign Out</p>
        </li>
      )
    } else {
      registrationButtons = [
        <li key="signin">
          <p onClick={this.signinInner}>Sign In</p>
        </li>,
        <li key="register">
          <p onClick={this.registerInner}>Register</p>
        </li>,
      ]
    }

    return (
      <ul id="nav">
        <li key="game">
          <p
            onClick={this.goToGameInner}
            className={mainRoute === 'game' ? 'active' : ''}
          >
            Game
          </p>
        </li>
        <li key="setup">
          <p
            onClick={() => onMainRouteChange('setup')}
            className={mainRoute === 'setup' ? 'active' : ''}
          >
            Set Up
          </p>
        </li>
        <li key="hebrewalphabet">
          <p
            onClick={() => onMainRouteChange('hebrewalphabet')}
            className={mainRoute === 'hebrewalphabet' ? 'active' : ''}
          >
            Hebrew Alphabet
          </p>
        </li>
        <li key="highscores">
          <p
            onClick={() => onMainRouteChange('highscores')}
            className={mainRoute === 'highscores' ? 'active' : ''}
          >
            High Scores
          </p>
        </li>
        {registrationButtons}
      </ul>
    )
  }
}

export default Navigation
