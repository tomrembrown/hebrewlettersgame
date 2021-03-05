import React from 'react'
import './Timer.css'

class Timer extends React.Component {
  render() {
    const { timeLeft } = this.props
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    return (
      <section id="timer">
        {minutes.toString().padStart(1, '0') +
          ':' +
          seconds.toString().padStart(2, '0')}
      </section>
    )
  }
}

export default Timer
