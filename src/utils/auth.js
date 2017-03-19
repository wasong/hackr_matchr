import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'

import { isTokenExpired } from './jwtHelper'
import { redirectUrl } from '../../config/auth'

export default class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl,
        responseType: 'token',
      },
    })
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this.doAuthentication.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  doAuthentication(authResult) {
    // get github profile
    this.lock.getUserInfo(authResult.accessToken, (err, profile) => {
      localStorage.setItem('profile', JSON.stringify(profile))
    })
    // Saves the user token
    this.setToken(authResult.idToken)
    // navigate to the home route
    browserHistory.replace('/auth')
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token')
  }

  getProfile() {
    return localStorage.getItem('profile')
  }

  logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token')
  }
}
