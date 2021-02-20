import React from 'react'
import './LoginModal.css'

const LoginModal = ({
  isLoginModalShown,
  signinOrRegister,
  signin,
  register,
  showRegisterModal,
}) => {
  const showHideClassName = isLoginModalShown
    ? 'modal display-block'
    : 'modal display-none'
  const isSignin = signinOrRegister === 'signin'

  const name = (
    <div className="mt3">
      <label className="db fw6 lh-copy f6" htmlFor="name">
        Name
      </label>
      <input
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
        type="text"
        name="name"
        id="name"
      />
    </div>
  )

  let buttons
  if (isSignin) {
    buttons = (
      <div>
        <div className="">
          <input
            onClick={signin}
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
          onClick={register}
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
              {isSignin ? '' : name}
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
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

export default LoginModal
