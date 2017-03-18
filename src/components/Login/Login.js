import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

const Login = (props) => {
  const { auth } = props.route
  return (
    <div>
      <p>Login</p>
      <RaisedButton label="Login" onClick={auth.login} />
    </div>
  )
}

export default Login
