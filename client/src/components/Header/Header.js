import React from 'react'
import Navigation from './Navigation/Navigation'
import Logo from './Logo/Logo'

const Header = ({
  isSignedIn,
  showSigninModal,
  showRegisterModal,
  signout,
  startGame,
  stopGame,
}) => {
  return (
    <header id="main-site-header">
      <span id="branding">
        <Logo />
        <h1>Hebrew Alphabet Game</h1>
      </span>
      <Navigation
        isSignedIn={isSignedIn}
        showSigninModal={showSigninModal}
        showRegisterModal={showRegisterModal}
        signout={signout}
        startGame={startGame}
        stopGame={stopGame}
      />
    </header>
  )
}

export default Header
