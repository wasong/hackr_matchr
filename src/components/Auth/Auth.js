import React from 'react'
import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import { AppBar } from 'material-ui'

import css from './Auth.css'

const Auth = (props) => {
  const { auth } = props.route
  const logOut = () => {
    auth.logout()
    browserHistory.push('/')
  }
  return (
    <div>
      <AppBar title="Your Profile" />
      <p>Logged In!</p>
      <RaisedButton label="Logout" onClick={logOut} />
      <RaisedButton label="This is a button" />
    </div>
  )
}

export default Auth
