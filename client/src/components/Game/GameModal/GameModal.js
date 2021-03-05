import './GameModal.css'

const GameModal = ({
  restartGameModal,
  exitGameModal,
  isModalShown,
  title,
  children,
}) => {
  const showHideClassName = isModalShown ? 'display-block' : 'display-none'

  return (
    <div
      className={showHideClassName}
      id="game-modal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div className="modal-background" onClick={restartGameModal}></div>
      <div className="modal-content shadow-5" role="document">
        <header>
          <h3 className="modal-title" id="modalLabel">
            {title}
          </h3>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={restartGameModal}
          >
            &times;
          </button>
        </header>
        <section className="modal-main">{children}</section>
        <footer>
          <button onClick={exitGameModal} className="exit-button">
            Exit Game
          </button>
          <button onClick={restartGameModal} className="restart-button">
            Restart Game
          </button>
        </footer>
      </div>
    </div>
  )
}

export default GameModal
