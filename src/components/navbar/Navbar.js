import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import useNavbar from './useNavbar'
import JoobleLogo from '../../imgs/jooble_logo.png'

function Navbar({ home }) {
  const {
    username,
    onLogout: logout,
    keywordsField,
    locationField,
    setParameters,
  } = useNavbar()
  return (
    <nav className="bootstrap-navbar navbar navbar-expand-lg navbar-light">
      <span className="navbar-brand">
        <Link id="app-logo-link" to="/">
          <img
            src={JoobleLogo}
            width="150"
            height="60"
            className="align-top logo"
            alt="logo "
          />
        </Link>
      </span>
      {home !== true && (
        <div
          className="m-auto navbar-collapse navbar-collapse collapse show"
          id="basic-navbar-nav"
        >
          <form className="form-inline">
            <div className="form-group">
              <input
                placeholder="Keywords"
                type="text"
                className="form-control"
                {...keywordsField}
              />
              <input
                placeholder="Location"
                type="text"
                className="form-control"
                {...locationField}
              />
            </div>
            <button
              onClick={setParameters}
              type="button"
              className="btn btn-primary btn-md"
            >
              Find Jobs
            </button>
          </form>
        </div>
      )}
      <div className="fixed-div" />
      <div className="align-top navbar-links justify-content-end navbar-nav">
        {username ? (
          <div
            id="username-logout-list"
            className="list-group list-group-horizontal"
          >
            <div className="user-info-list list-group-item list-group-item-primary">
              {username}
            </div>
            <div
              className="user-info-list list-group-item list-group-item-info"
              onClick={logout}
            >
              Logout
            </div>
          </div>
        ) : (
          <form id="login-register-form" className="form-inline">
            <div role="group" className="mr-2 btn-group">
              <Link id="register-link" to="/register">
                <button
                  id="register"
                  className="mx-2 btn btn-outline-primary btn-md"
                >
                  Register
                </button>
              </Link>
              <Link id="login-link" to="/login">
                <button
                  type="button"
                  className="mx-2 btn btn-outline-secondary btn-md"
                >
                  Login
                </button>
              </Link>
            </div>
          </form>
        )}
      </div>
    </nav>
  )
}

export default Navbar
