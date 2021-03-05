import React from 'react'
import './Header.css'
import Navigation from './Navigation/Navigation'
import Logo from './Logo/Logo'

const NavigationBar = ({
  onMainRouteChange,
  isSignedIn,
  mainRoute,
  showSigninModal,
  showRegisterModal,
  signout,
  startGame,
  stopGame,
}) => {
  return (
    <header id="main-site-header">
      <Logo />
      <h1>Hebrew Alphabet Game</h1>
      <Navigation
        onMainRouteChange={onMainRouteChange}
        isSignedIn={isSignedIn}
        mainRoute={mainRoute}
        showSigninModal={showSigninModal}
        showRegisterModal={showRegisterModal}
        signout={signout}
        startGame={startGame}
        stopGame={stopGame}
      />
    </header>
  )
}

export default NavigationBar
