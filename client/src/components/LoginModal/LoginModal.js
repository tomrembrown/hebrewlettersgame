import React, { Component } from 'react'
import './LoginModal.css'
import { register, signin } from '../../api/api-client'

class LoginModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_handle: '',
      email: '',
      password: '',
    }
  }

  onUserHandleChange = (event) => {
    this.setState({ user_handle: event.target.value })
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  onSubmit = () => {
    const { signinOrRegister } = this.props
    const { user_handle, email, password } = this.state

    if (signinOrRegister === 'signin') {
      signin(email, password).then((user) => {
        if (user && user.id) {
          this.props.loadUser(user)
          this.props.successfullySignedIn()
        }
      })
    } else {
      register(user_handle, email, password).then((user) => {
        if (user && user.id) {
          this.props.loadUser(user)
          this.props.successfullySignedIn()
        }
      })
    }
  }

  render() {
    const {
      isLoginModalShown,
      signinOrRegister,
      showRegisterModal,
    } = this.props

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
          className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
          type="text"
          name="user_handle"
          id="user_handle"
        />
      </div>
    )

    let buttons
    if (isSignin) {
      buttons = (
        <div>
          <div className="">
            <input
              onClick={this.onSubmit}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={showRegisterModal}
              className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </div>
      )
    } else {
      buttons = (
        <div className="">
          <input
            onClick={this.onSubmit}
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Register"
          />
        </div>
      )
    }

    return (
      <div
        className={showHideClassName}
        id="loginModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center background-white">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">
                  {isSignin ? 'Sign In' : 'Register'}
                </legend>
                {isSignin ? '' : user_handle}
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    onChange={this.onEmailChange}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
                  <input
                    onChange={this.onPasswordChange}
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
              </fieldset>
              {buttons}
            </div>
          </main>
        </article>
      </div>
    )
  }
}

export default LoginModal
