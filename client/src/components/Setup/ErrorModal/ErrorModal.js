import './ErrorModal.css'

const ErrorModal = ({ exitErrorModal, isErrorModalShown, children }) => {
  const showHideClassName = isErrorModalShown
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
      <div className="modal-background" onClick={exitErrorModal}></div>
      <div className="modal-content shadow-5" role="document">
        <header>
          <h5 className="modal-title" id="modalLabel">
            Error in Setup
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={exitErrorModal}
          >
            &times;
          </button>
        </header>
        <div className="modal-main">{children}</div>
        <footer>
          <button onClick={exitErrorModal} className="ok-button">
            Ok
          </button>
        </footer>
      </div>
    </div>
  )
}

export default ErrorModal
