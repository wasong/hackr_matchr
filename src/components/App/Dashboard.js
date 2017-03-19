import React, { Component } from 'react'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.loadProfile()
  }

  render(props) {
    return (
      <div></div>
    )
  }
}

export default Dashboard
