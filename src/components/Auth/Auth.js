import React from 'react'
import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

const Auth = (props) => {
  const { auth } = props.route
  const logOut = () => {
    auth.logout()
    browserHistory.push('/')
  }
  return (
    <div>
      <p>Logged In!</p>
      <RaisedButton label="Logout" onClick={logOut} />
    </div>
  )
}

export default Auth
