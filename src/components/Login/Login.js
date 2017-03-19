import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import AppToolbar from '../sharedComponents/AppToolbar'

const Login = (props) => {
  const { auth } = props.route
  // TODO: use good Sign In with Github button
  return (
    <div>
      <AppToolbar auth={auth} />
      <h1>Hackr_Matchr</h1>
      <h2>How hackers assemble</h2>
      <RaisedButton label="Login with Github" onClick={auth.login} />
    </div>
  )
}

export default Login
