import React from 'react'
import { Link } from 'react-router'
import { Paper, FlatButton, Avatar, Subheader, List, ListItem } from 'material-ui'
import { Doughnut } from 'react-chartjs-2'
import Logo from '../sharedComponents/logo'
import AppToolbar from '../sharedComponents/AppToolbar'
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
    name: 'Project1',
    description: 'project description',
    projectAvatarURL: 'http://www.hdwallpapers.in/walls/windows_xp_bliss-wide.jpg',
    types: ['Front-end', 'Android'],
  }, {
    name: 'Project2',
    description: 'project description',
    projectAvatarURL: 'http://www.hdwallpapers.in/walls/windows_xp_bliss-wide.jpg',
    types: ['Front-end', 'Android'],
  }, {
    name: 'Project3',
    description: 'project description',
    projectAvatarURL: 'http://www.hdwallpapers.in/walls/windows_xp_bliss-wide.jpg',
    types: ['Front-end', 'Android'],
  }],
}

const App = props => (
  <div className="App">
    <AppToolbar auth={props.route.auth} />
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

const ProjectList = props => (
  <Paper zDepth={3} className="Breathing-room Projects-info">
    <List>
      <Subheader>Projects recommended for you</Subheader>
      <div className="Featured-row">
        {
          defaultValues.projects.slice(0, 3).map(project => (
            <FeaturedProject />
          ))
        }
      </div>
      <Subheader>Other projects you may be interested in</Subheader>
      {
        defaultValues.projects.slice(3).map(project => (
          <ListItem
            primaryText={project.name}
            secondaryText={project.description}
            leftAvatar={<Avatar src={project.projectAvatarURL} />}
          />
        ))
      }
    </List>
  </Paper>
)

const FeaturedProject = props => (
  <Paper zDepth={1} className="Featured-project Breathing-room">
    <p>hi</p>
  </Paper>
)

export default App
