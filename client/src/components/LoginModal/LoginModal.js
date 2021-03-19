import React, { Component } from 'react'
import { register, signin, checkHandleTaken } from '../../api/api-client'
import {
  validateUserHandle,
  validateEmail,
  validatePassword,
} from '../../common/validation'

const initialState = {
  user_handle: '',
  email: '',
  password: '',
  verify_password: '',
  isEmailWrong: false,
  isPasswordWrong: false,
  isVerifyPasswordWrong: false,
  isUserHandleWrong: false,
  isGeneralError: false,
  emailErrorMessage: '',
  passwordErrorMessage: '',
  verifyPasswordErrorMessage: '',
  userHandleErrorMessage: '',
  generalErrorMessage: '',
}

const INVALID_HANDLE_MESSAGE = 'Handle must be between 3 and 25 characters long'
const HANDLE_TAKEN_MESSAGE = 'User Handle already taken'
const INVALID_EMAIL_MESSAGE = 'Invalid email'
const EMAIL_TAKEN_MESSAGE = 'Account already exists for email. Please sign in'
const INVALID_PASSWORD_MESSAGE = 'Password is 8 to 20 non-whitespace characters'
const INVALID_VERIFY_PASSWORD_MESSAGE = 'Passwords do not match'
const LOGIN_GENERAL_ERROR_MESSAGE = 'Invalid User Credentials'

class LoginModal extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  onUserHandleChange = (event) => {
    const new_user_handle = event.target.value
    this.setState({ user_handle: new_user_handle })
    if (!validateUserHandle(new_user_handle)) {
      this.setState({ isUserHandleWrong: true })
      this.setState({ userHandleErrorMessage: INVALID_HANDLE_MESSAGE })
    } else {
      checkHandleTaken(new_user_handle).then((data) => {
        if (data.handleTaken) {
          this.setState({ isUserHandleWrong: true })
          this.setState({ userHandleErrorMessage: HANDLE_TAKEN_MESSAGE })
        } else {
          this.setState({ isUserHandleWrong: false })
          this.setState({ userHandleErrorMessage: '' })
        }
      })
    }
  }

  onEmailChange = (event) => {
    const new_email = event.target.value
    this.setState({ email: new_email })
    if (this.props.signinOrRegister === 'register') {
      if (validateEmail(new_email)) {
        this.setState({ isEmailWrong: false })
        this.setState({ emailErrorMessage: '' })
      } else {
        this.setState({ isEmailWrong: true })
        this.setState({ emailErrorMessage: INVALID_EMAIL_MESSAGE })
      }
    }
  }

  onPasswordChange = (event) => {
    const new_password = event.target.value
    this.setState({ password: new_password })
    if (this.props.signinOrRegister === 'register') {
      if (validatePassword(new_password)) {
        this.setState({ isPasswordlWrong: false })
        this.setState({ passwordErrorMessage: '' })
      } else {
        this.setState({ isPasswordWrong: true })
        this.setState({ passwordErrorMessage: INVALID_PASSWORD_MESSAGE })
      }
      if (new_password === this.state.verify_password) {
        this.setState({ isVerifyPasswordWrong: false })
        this.setState({ verifyPasswordErrorMessage: '' })
      } else {
        this.setState({ isVerifyPasswordWrong: true })
        this.setState({
          verifyPasswordErrorMessage: INVALID_VERIFY_PASSWORD_MESSAGE,
        })
      }
    }
  }

  onVerifyPasswordChange = (event) => {
    const new_verify_password = event.target.value
    this.setState({ verify_password: new_verify_password })
    if (new_verify_password === this.state.password) {
      this.setState({ isVerifyPasswordWrong: false })
      this.setState({ verifyPasswordErrorMessage: '' })
    } else {
      this.setState({ isVerifyPasswordWrong: true })
      this.setState({
        verifyPasswordErrorMessage: INVALID_VERIFY_PASSWORD_MESSAGE,
      })
    }
  }

  clearForm = () => {
    this.setState(initialState)
  }

  close = () => {
    this.clearForm()
    this.props.closeLoginModal()
  }

  showOtherForm = () => {
    this.clearForm()
    if (this.props.signinOrRegister === 'signin') {
      this.props.showRegisterModal()
    } else {
      this.props.showSigninModal()
    }
  }

  processUserData = (user) => {
    const { signinOrRegister } = this.props
    if (signinOrRegister === 'register') {
      if (/invalid/.test(user)) {
        if (/invalid email/.test(user)) {
          this.setState({ isEmailWrong: true })
          this.setState({ emailErrorMessage: INVALID_EMAIL_MESSAGE })
        }
        if (/invalid password/.test(user)) {
          this.setState({ isPasswordWrong: true })
          this.setState({ passwordErrorMessage: INVALID_PASSWORD_MESSAGE })
        }
        if (/invalid user_handle/.test(user)) {
          this.setState({ isUserHandleWrong: true })
          this.setState({ userHandleErrorMessage: INVALID_HANDLE_MESSAGE })
        }
      }
      if (/taken/.test(user)) {
        if (/email/.test(user)) {
          this.setState({ isEmailWrong: true })
          this.setState({ emailErrorMessage: EMAIL_TAKEN_MESSAGE })
        }
        if (/user_handle/.test(user)) {
          this.setState({ isUserHandleWrong: true })
          this.setState({ userHandleErrorMessage: HANDLE_TAKEN_MESSAGE })
        }
      }
    }
    if (user && user.id) {
      this.props.loadUser(user)
      this.clearForm()
      this.props.successfullySignedIn()
    } else {
      if (signinOrRegister === 'signin') {
        this.setState({ isGeneralError: true })
        this.setState({ generalErrorMessage: LOGIN_GENERAL_ERROR_MESSAGE })
      }
    }
  }

  onSubmit = () => {
    const { signinOrRegister } = this.props
    const { user_handle, email, password, verify_password } = this.state

    if (signinOrRegister === 'signin') {
      signin(email, password).then((user) => this.processUserData(user))
    } else {
      let okToSubmit = true
      if (!validateUserHandle(user_handle)) {
        this.setState({ isUserHandleWrong: true })
        this.setState({ userHandleErrorMessage: INVALID_HANDLE_MESSAGE })
        okToSubmit = false
      }
      if (!validateEmail(email)) {
        this.setState({ isEmailWrong: true })
        this.setState({ emailErrorMessage: INVALID_EMAIL_MESSAGE })
        okToSubmit = false
      }
      if (!validatePassword(password)) {
        this.setState({ isPasswordWrong: true })
        this.setState({ passwordErrorMessage: INVALID_PASSWORD_MESSAGE })
        okToSubmit = false
      }
      if (password !== verify_password) {
        this.setState({ isVerifyPasswordWrong: true })
        this.setState({
          verifyPasswordErrorMessage: INVALID_VERIFY_PASSWORD_MESSAGE,
        })
        okToSubmit = false
      }
      if (okToSubmit) {
        register(user_handle, email, password).then((user) =>
          this.processUserData(user)
        )
      }
    }
  }

  render() {
    const { isLoginModalShown, signinOrRegister } = this.props

    const {
      isEmailWrong,
      isUserHandleWrong,
      isPasswordWrong,
      isVerifyPasswordWrong,
      emailErrorMessage,
      passwordErrorMessage,
      verifyPasswordErrorMessage,
      userHandleErrorMessage,
      isGeneralError,
      generalErrorMessage,
    } = this.state

    const showHideClassName = isLoginModalShown
      ? 'modal display-block'
      : 'modal display-none'
    const isSignin = signinOrRegister === 'signin'

    const user_handle = (
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="user_handle">
          Handle{' '}
          <span className="fw4 i f7">(will be shown in high score list)</span>
        </label>
        <input
          onChange={this.onUserHandleChange}
          value={this.state.user_handle}
          className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
          type="text"
          name="user_handle"
          id="user_handle"
        />
        <div
          className={
            'error ' + (isUserHandleWrong ? 'display-block' : 'display-hidden')
          }
        >
          {userHandleErrorMessage}
        </div>
      </div>
    )

    const verify_password = (
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="verify_password">
          Verify Password
        </label>
        <input
          onChange={this.onVerifyPasswordChange}
          value={this.state.verify_password}
          className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
          type="password"
          name="verify_password"
          id="verify_password"
        />
        <div
          className={
            'error ' +
            (isVerifyPasswordWrong ? 'display-block' : 'display-hidden')
          }
        >
          {verifyPasswordErrorMessage}
        </div>
      </div>
    )

    return (
      <div
        className={showHideClassName}
        id="login-modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center background-white">
          <header>
            <h3 className="modal-title" id="loginModalLabel">
              {isSignin ? 'Sign In' : 'Register'} Form
            </h3>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={this.close}
            >
              &times;
            </button>
          </header>
          <div className="pa4 black-80">
            <div className="measure">
              <fieldset className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">
                  {isSignin ? 'Sign In' : 'Register'}
                </legend>
                {isSignin ? '' : user_handle}
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email">
                    Email
                  </label>
                  <input
                    onChange={this.onEmailChange}
                    value={this.state.email}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email"
                    id="email"
                  />
                  <div
                    className={
                      'error ' +
                      (isEmailWrong ? 'display-block' : 'display-none')
                    }
                  >
                    {emailErrorMessage}
                  </div>
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
                  <input
                    onChange={this.onPasswordChange}
                    value={this.state.password}
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                  />
                  <div
                    className={
                      'error ' +
                      (isPasswordWrong ? 'display-block' : 'display-none')
                    }
                  >
                    {passwordErrorMessage}
                  </div>
                </div>
                {isSignin ? '' : verify_password}
              </fieldset>
              <div>
                <div
                  className={
                    'generalerror ' +
                    (isGeneralError ? 'display-block' : 'display-none')
                  }
                >
                  {generalErrorMessage}
                </div>
                <div className="">
                  <input
                    onClick={this.onSubmit}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value={isSignin ? 'Sign In' : 'Register'}
                  />
                </div>
                <div className="lh-copy mt3">
                  <p
                    onClick={this.showOtherForm}
                    className="f6 link dim black db pointer"
                  >
                    {isSignin ? 'Register' : 'Sign In'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    )
  }
}

export default LoginModal
