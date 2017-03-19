import React, { Component } from 'react'

import Dashboard from './Dashboard'

class MemberLogic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      proficiencies: {
        frontEnd: 0,
        backEnd: 0,
        systems: 0,
        ios: 0,
        android: 0,
        game: 0,
      },
    }

    this.parseFileType = (fileName) => {
      const extension = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase()
      const frontEnd = ['js', 'jsx', 'html', 'css', 'less']
      const backend = ['js', 'py', 'rb', 'php']
      const systems = ['c', 'cpp', 'go', 'cs']
      const ios = ['swift', 'm']
      const android = ['java']
      const game = ['unity', 'fbx']
    }
  }

  render() {
    return (
      <Dashboard />
    )
  }
}

export default MemberLogic
