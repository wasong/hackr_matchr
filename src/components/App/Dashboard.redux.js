import { connect } from 'react-redux'

import Dashboard from './Dashboard'
import { loadProfileThunk } from '../../dashboard.modules'

const mapStateToProps = (state) => {
  // return an object with all of or some store state
  return {
    profile: state.profile,
  }
}

const mapDispatchToProps = (dispatch) => {
  // return functions that dispatch an action
  return {
    loadProfile() {
      const profile = JSON.parse(localStorage.getItem('profile'))
      dispatch(loadProfileThunk(profile.nickname))
    },
  }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)

export default DashboardContainer
