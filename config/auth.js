const env = require('./env')

const redirectUrl = env === 'development' ? 'http://localhost:9000/login' : 'https://hackr-matchr.herokuapp.com/login'

module.exports = {
  clientId: 'pXa0STnfkTwO65qGMAWCUxCZJ3mtwu9G',
  domainId: 'sonar-dev.auth0.com',
  redirectUrl,
}
