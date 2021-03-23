import React from 'react'

const GameModal = ({ restartGameModal, isModalShown, title, children }) => {
  const showHideClassName = isModalShown ? 'display-block' : 'display-none'

  return (
    <div
      className={showHideClassName}
      id="game-modal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="gameModalLabel"
      aria-hidden="true"
    >
      <div className="modal-background" onClick={restartGameModal}></div>
      <div className="modal-content shadow-5" role="document">
        <header>
          <h3 className="modal-title" id="gameModalLabel">
            {title}
          </h3>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={restartGameModal}
          >
            &times;
          </button>
        </header>
        <section className="modal-main">{children}</section>
        <footer>
          <button
            onClick={restartGameModal}
            className="footer-button button-3d"
          >
            Restart Game
          </button>
        </footer>
      </div>
    </div>
  )
}

export default GameModal
