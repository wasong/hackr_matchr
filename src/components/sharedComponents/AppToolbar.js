import React from 'react'
import { browserHistory } from 'react-router'
import { Paper, Toolbar, ToolbarGroup, FlatButton } from 'material-ui'
import './sharedComponents.css'
import Logo from './logo'

const AppToolbar = props => (
  <Paper className="App-toolbar" zDepth={1}>
    <Toolbar className="App-toolbar">
      <ToolbarGroup firstChild>
        <Logo style={{ marginLeft: '24px' }} />
      </ToolbarGroup>
      <ToolbarGroup lastChild>
        {props.auth.loggedIn() ? (
          <FlatButton
            label="Sign out"
            onClick={
              () => {
                props.auth.logout()
                browserHistory.push('/login')
              }
            }
          />
        ) : null}
      </ToolbarGroup>
    </Toolbar>
  </Paper>
)
export default AppToolbar
