import './Modal.css'

const Modal = ({
  restartGameModal,
  exitGameModal,
  isModalShown,
  title,
  children,
}) => {
  const showHideClassName = isModalShown
    ? 'modal display-block'
    : 'modal display-none'

  return (
    <div
      className={showHideClassName}
      id="modal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div className="modal-background" onClick={restartGameModal}></div>
      <div className="modal-content shadow-5" role="document">
        <header>
          <h5 className="modal-title" id="modalLabel">
            {title}
          </h5>
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
        <div className="modal-main">{children}</div>
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

export default Modal
