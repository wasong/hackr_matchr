import React, { Component } from 'react'

import Dashboard from './Dashboard'

class MemberLogic extends Component {
  componentDidMount() {
    this.props.loadProfile()
  }

  render() {
    return (
      <Dashboard
        auth={this.props.route.auth}
        data={this.props.profile}
      />
    )
  }
}

export default MemberLogic
