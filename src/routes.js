import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import AuthService from './utils/auth'
import Dashboard from './components/App/Dashboard.graphql'
import App from './components/App'
import Auth from './components/Auth'
import Login from './components/Login'
import config from '../config/auth'

const auth = new AuthService(process.env.CLIENT_ID || config.clientId, process.env.AUTH_DOMAIN || config.domainId)

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

const Routes = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/dashboard" component={Dashboard} auth={auth} />
      <Route path="/" component={App} onEnter={requireAuth} auth={auth} />
      <Route path="/auth" component={Auth} auth={auth} onEnter={requireAuth} />
      <Route path="/login" component={Login} auth={auth} />
    </Router>
  </Provider>
)

export default Routes
