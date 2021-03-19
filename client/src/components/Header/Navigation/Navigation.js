import React from 'react'
import { NavLink } from 'react-router-dom'

function Navigation({
  isSignedIn,
  showSigninModal,
  showRegisterModal,
  signout,
  startGame,
  stopGame,
}) {
  const goToGameInner = () => {
    startGame()
  }

  const signoutInner = () => {
    signout()
  }

  const signinInner = () => {
    stopGame()
    showSigninModal()
  }

  const registerInner = () => {
    stopGame()
    showRegisterModal()
  }

  let registrationButtons
  if (isSignedIn) {
    registrationButtons = (
      <li>
        <button onClick={signoutInner}>Sign Out</button>
      </li>
    )
  } else {
    registrationButtons = [
      <li key="signin">
        <button onClick={signinInner}>Sign In</button>
      </li>,
      <li key="register">
        <button onClick={registerInner}>Register</button>
      </li>,
    ]
  }

  return (
    <nav>
      <ul>
        <li key="game">
          <NavLink
            to="/"
            onClick={goToGameInner}
            exact
            activeClassName="active"
          >
            Game
          </NavLink>
        </li>
        <li key="setup">
          <NavLink to="/setup" exact activeClassName="active">
            Set Up
          </NavLink>
        </li>
        <li key="hebrewalphabet">
          <NavLink to="/alphabet" exact activeClassName="active">
            Hebrew Alphabet
          </NavLink>
        </li>
        <li key="highscores">
          <NavLink to="/scores" exact activeClassName="active">
            High Scores
          </NavLink>
        </li>
        {registrationButtons}
      </ul>
    </nav>
  )
}

export default Navigation
