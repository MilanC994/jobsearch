import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import useSignIn from './useSignIn'
import { ClipLoader } from 'react-spinners'
import JoobleLogo from '../../imgs/jooble_logo.png'

function SignIn() {
  const {
    usernameField: username,
    passwordField: password,
    loggedIn,
    loading,
    handleSubmit,
  } = useSignIn()

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
        <form
          className=""
          style={{ width: '50%', margin: 'auto', marginTop: '20%' }}
        >
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              placeholder="Enter last name"
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
          <div className="form-group mb-3 ">
            <div className="form-label">
              <label title="" className="form-check-label">
                If you don't have an account ?{' '}
                <Link to="/register"> Register </Link>
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
        </form>
      </div>
    </div>
  )
}

export default SignIn
