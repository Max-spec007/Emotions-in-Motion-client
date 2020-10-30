import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import CommentCreate from '../CommentCreate/CommentCreate'
import CommentIndex from '../CommentIndex/CommentIndex'
import CommentShow from '../CommentShow/CommentShow'
import CommentUpdate from '../CommentUpdate/CommentUpdate'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
        <div>
          <AuthenticatedRoute path="/create" user={user} render={() => (
            <CommentCreate user={user} msgAlert={this.msgAlert}/>
          )}/>
        </div>
        <div>
          <Route exact path="/" user={user} render={() => (
            <CommentIndex user={user}/>
          )}/>
        </div>
        <div>
          <AuthenticatedRoute path="/comments/:id" user={user} render={props => (
            <CommentShow user={user} msgAlert={this.msgAlert} match={props.match}/>
          )}/>
        </div>
        <div>
          <Route path="/comments/:id" user={user} render={props => (
            <CommentUpdate user={user} msgAlert={this.msgAlert} match={props.match}/>
          )}/>
        </div>
      </Fragment>
    )
  }
}

export default App
