import React from 'react'
import './NavigationBar.css'
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
    <nav className="nav-wrapper">
      <Logo />
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
    </nav>
  )
}

export default NavigationBar
