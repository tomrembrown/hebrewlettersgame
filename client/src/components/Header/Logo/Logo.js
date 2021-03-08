import React from 'react'
import './Logo.css'
import aleph from './aleph.png'

const Logo = () => {
  return (
    <div role="presentation" id="main-site-logo">
      <img src={aleph} alt="aleph symbol for site logo" />
    </div>
  )
}

export default Logo
