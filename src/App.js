import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './App.css'
import Home from './components/home/Home'
import Jobs from './components/jobs/Jobs'
import SignIn from './components/signIn/SignIn'
import Register from './components/register/Register'

const App = () => {
  return (
    <Container className="content-container" fluid>
      <Switch>
        <Route
          exact
          path="/register"
          render={props => <Register {...props} />}
        />
        <Route exact path="/login" render={props => <SignIn {...props} />} />
        <Route exact path="/jobs" render={props => <Jobs {...props} />} />

        <Route exact path="/" component={Home} />
      </Switch>
    </Container>
  )
}
export default App
