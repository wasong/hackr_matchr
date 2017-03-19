import React from 'react'
import { Paper, Avatar, Subheader, List, ListItem } from 'material-ui'
import { Doughnut } from 'react-chartjs-2'
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

const UserInfo = props => (
  <div className="User-info">
    <Paper zDepth={1} className="Breathing-room User-info-profile-section">
      <Avatar className="User-info-avatar" src={props.avatar} />
      <h1>{props.name}</h1>
      <h2>{props.login}</h2>
    </Paper>
    <Paper zDepth={1} className="Breathing-room User-info-types-section">
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
            data: [
              props.frontEnd,
              props.backEnd,
              props.android,
              props.ios,
              props.systems,
              props.game,
            ],
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
  <div className="Projects-info">
    <List>
      <Subheader>Projects recommended for you</Subheader>
      <div className="Featured-row">
        {
          defaultValues.projects.slice(0, 3).map(project => (
            <FeaturedProject key={project.name} project={project} />
          ))
        }
      </div>
      <Subheader>Other projects you may be interested in</Subheader>
      <Paper zDepth={1}>
        {
          defaultValues.projects.slice(3).map(project => (
            <ListItem
              key={project.name}
              primaryText={project.name}
              secondaryText={project.description}
              leftAvatar={<Avatar src={project.projectAvatarURL} />}
            />
          ))
        }
      </Paper>
    </List>
  </div>
)

const FeaturedProject = props => (
  <Paper zDepth={1} className="Featured-project Breathing-room">
    <h2>{props.project.name}</h2>
    <p>{props.project.description}</p>
  </Paper>
)

const Dashboard = props => (
  <div className="App">
    {console.log(props)}
    <AppToolbar auth={props.auth} />
    <div className="Content Side-space">
      <Subheader>Summary of your Github contributions</Subheader>
      <UserInfo
        avatar={props.data.profile.avatar_url}
        name={props.data.profile.name}
        login={props.data.profile.login}
        frontEnd={props.data.proficiencies.frontEnd}
        backEnd={props.data.proficiencies.backEnd}
        android={props.data.proficiencies.android}
        ios={props.data.proficiencies.ios}
        systems={props.data.proficiencies.systems}
        game={props.data.proficiencies.game}
      />
      <ProjectList />
    </div>
  </div>
)

export default Dashboard
