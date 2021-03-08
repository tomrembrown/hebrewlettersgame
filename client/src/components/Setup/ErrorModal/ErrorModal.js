import './ErrorModal.css'

const ErrorModal = ({ exitErrorModal, isErrorModalShown, children }) => {
  const showHideClassName = isErrorModalShown ? 'display-block' : 'display-none'

  return (
    <div
      className={showHideClassName}
      id="error-modal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="errorModalLabel"
      aria-hidden="true"
    >
      <div className="modal-background" onClick={exitErrorModal}></div>
      <div className="modal-content shadow-5" role="document">
        <header>
          <h3 className="modal-title" id="erorrModalLabel">
            Error in Setup
          </h3>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={exitErrorModal}
          >
            &times;
          </button>
        </header>
        <section className="modal-main">{children}</section>
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
