import React from 'react'
import JoobleLogo from '../../imgs/jooble_logo.png'
import { Link, Redirect } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import useRegister from './useRregister'

function Register() {
  const {
    firstNameField: firstName,
    lastNameField: lastName,
    emailField: email,
    usernameField: username,
    passwordField: password,
    retypePasswordField: retypePassword,
    readTerms,
    handleCheckChange,
    loggedIn,
    loading,
    error,
    handleSubmit,
  } = useRegister()

  if (loggedIn === true) {
    return <Redirect to="/" />
  }
  return (
    <div className="content-container container-fluid">
      <div className="container">
        <Link to="/">
          <img
            src={JoobleLogo}
            width="300"
            height="100"
            className="mx-auto d-block rounded"
            alt="jooble logo"
          />
        </Link>
        <form style={{ width: '50%', margin: 'auto' }}>
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              placeholder="Enter first name"
              type="text"
              className="form-control"
              {...firstName}
            />
            {!!firstName.error && (
              <div role="alert" className="fade alert alert-danger show">
                {firstName.error}
              </div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              placeholder="Enter last name"
              type="text"
              className="form-control"
              {...lastName}
            />
            {!!lastName.error && (
              <div role="alert" className="fade alert alert-danger show">
                {lastName.error}
              </div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Email address</label>
            <input
              placeholder="Enter email"
              type="email"
              className="form-control"
              {...email}
            />
            {!!email.error && (
              <div role="alert" className="fade alert alert-danger show">
                {email.error}
              </div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              placeholder="Enter username"
              type="text"
              className="form-control"
              {...username}
            />
            {!!username.error && (
              <div role="alert" className="fade alert alert-danger show">
                {username.error}
              </div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              placeholder="Password"
              type="password"
              className="form-control"
              {...password}
            />
            {!!password.error && (
              <div role="alert" className="fade alert alert-danger show">
                {password.error}
              </div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Retype Password</label>
            <input
              placeholder="Retype Password"
              type="password"
              className="form-control"
              {...retypePassword}
            />
            {!!retypePassword.error && (
              <div role="alert" className="fade alert alert-danger show">
                {retypePassword.error}
              </div>
            )}
          </div>
          <div className="form-group">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={readTerms}
                onChange={handleCheckChange}
              />
              <label title="" className="form-check-label">
                I've read the{' '}
                <a href="https://jooble.org/info/terms" target="_blank">
                  terms and conditions
                </a>
              </label>
            </div>
          </div>
          <div className="form-group mb-3 ">
            <div className="form-label">
              <label title="" className="form-check-label">
                If you already have an account ?{' '}
                <Link to="/login"> Login </Link>
              </label>
            </div>
          </div>
          {loading ? (
            <ClipLoader loading />
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
          {!!error && (
            <div role="alert" className="fade alert alert-danger show">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default Register
