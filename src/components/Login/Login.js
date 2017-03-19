import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import AppToolbar from '../sharedComponents/AppToolbar'
import Logo from '../sharedComponents/logo'
import './Login.css'

const Login = (props) => {
  const { auth } = props.route
  // TODO: use good Sign In with Github button
  return (
    <div>
      <div className="Background" />
      <AppToolbar auth={auth} />
      <div className="Login-page">
        <Logo style={{ fontSize: '70px' }} />
        <h2 className="Login-page-subtitle">Where hackers assemble</h2>
        <RaisedButton label="Login with Github" onClick={auth.login} />
      </div>
    </div>
  )
}

export default Login
