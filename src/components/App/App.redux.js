import { connect } from 'react-redux'

import App from './App'
import { loadDefault } from '../../default.modules'

const mapStateToProps = (state) => {
  // return an object with all of or some store state
  return {
    base: state.base,
  }
}

const mapDispatchToProps = (dispatch) => {
  // return functions that dispatch an action
  return {
    loadDefault() {
      dispatch(loadDefault())
    },
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

export default AppContainer
