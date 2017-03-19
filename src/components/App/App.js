import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Paper, Toolbar, ToolbarGroup, FlatButton, Avatar, Subheader, List, ListItem } from 'material-ui'
import { Doughnut } from 'react-chartjs-2'
import Logo from '../sharedComponents/logo'
import './App.css'

const defaultValues = {
  firstName: 'Tim',
  lastName: 'Bo',
  userName: 'Timbobobo',
  userAvatarURL: 'http://images.wisegeek.com/computer-programmer-or-hacker.jpg',
  proficiencies: {
    mobile: 0.4,
    web: 0.7,
  },
  projects: [{
    name: 'Solve P = NP',
    description: 'Come join my weekend project!',
    projectAvatarURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Complexity_classes.svg/414px-Complexity_classes.svg.png',
    types: ['Front-end', 'Android'],
  }, {
    name: 'Project0',
    description: 'project description',
    projectAvatarURL: 'http://www.hdwallpapers.in/walls/windows_xp_bliss-wide.jpg',
    types: ['Front-end', 'Android'],
  }, {
    name: 'Project0',
    description: 'project description',
    projectAvatarURL: 'http://www.hdwallpapers.in/walls/windows_xp_bliss-wide.jpg',
    types: ['Front-end', 'Android'],
  }, {
    name: 'Project0',
    description: 'project description',
    projectAvatarURL: 'http://www.hdwallpapers.in/walls/windows_xp_bliss-wide.jpg',
    types: ['Front-end', 'Android'],
  }, {
    name: 'Project0',
    description: 'project description',
    projectAvatarURL: 'http://www.hdwallpapers.in/walls/windows_xp_bliss-wide.jpg',
    types: ['Front-end', 'Android'],
  }],
}

const App = props => (
  <div className="App">
    <Toolbar className="App-toolbar">
      <ToolbarGroup firstChild>
        <Logo />
      </ToolbarGroup>
      <ToolbarGroup lastChild>
        <FlatButton
          label="Sign out"
          onClick={
            () => {
              props.route.auth.logout()
              browserHistory.push('/login')
            }
          }
        />
      </ToolbarGroup>
    </Toolbar>
    <div className="Content Side-space">
      <UserInfo />
      <ProjectList />
    </div>
  </div>
)

const UserInfo = props => (
  <div className="User-info">
    <Paper zDepth={3} className="Breathing-room User-info-profile-section">
      <Avatar className="User-info-avatar" src={defaultValues.userAvatarURL} />
      <h1>{defaultValues.firstName} {defaultValues.lastName}</h1>
      <h2>{defaultValues.userName}</h2>
    </Paper>
    <Paper zDepth={3} className="Breathing-room User-info-types-section">
      <Doughnut
        data={{
          labels: [
            'Front end web',
            'Back end web',
            'Android',
            'IOS',
            'Software systems',
            'Games',
          ],
          datasets: [{
            data: [300, 50, 100, 70, 20, 100],
            backgroundColor: [
              '#f7cc0c',
              '#f70c0c',
              '#0cf727',
              '#0cb4f7',
              '#9e9e9e',
              '#f7950c',
            ],
            hoverBackgroundColor: [
              '#f7cc0c',
              '#f70c0c',
              '#0cf727',
              '#0cb4f7',
              '#9e9e9e',
              '#f7950c',
            ],
          }],
        }}
      />
    </Paper>
  </div>
)

const ProficiencyGraph = props => (
  <div className="Bar-graph-container">
    {JSON.stringify(props.proficiencies)}
  </div>
)

const ProjectList = props => (
  <Paper zDepth={3} className="Breathing-room Projects-info">
    <List>
      <Subheader>Projects recommended for you</Subheader>
      {
        defaultValues.projects.map(project => (
          <ListItem
            primaryText={project.name}
            secondaryText={
              <div style={{ display: 'Block' }}>
                <p>project.description</p>
                {
                  project.types.map(type => (
                    <p>{type}</p> // todo: use seperate component
                  ))
                }
              </div>
            }
            leftAvatar={<Avatar src={project.projectAvatarURL} />}
          />
        ))
      }
    </List>
  </Paper>
)

const ProjectListElement = props => (
  <div />
)

export default App
