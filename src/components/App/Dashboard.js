import React, { Component } from 'react'
import { Chip, Paper, Avatar, Subheader, List, ListItem, FlatButton } from 'material-ui'
import { Doughnut } from 'react-chartjs-2'
import AppToolbar from '../sharedComponents/AppToolbar'
import './App.css'


const devTypeToHex = devType => (
  {
    'Front end web': '#f7cc0c',
    'Back end web': '#f70c0c',
    Android: '#0cf727',
    IOS: '#0cb4f7',
    Systems: '#9e9e9e',
    Games: '#f7950c',
  }[devType] || '#000000'
)

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
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Complexity_classes.svg/414px-Complexity_classes.svg.png',
    spots: ['Front end web', 'Android', 'IOS', 'Systems', 'Back end web'],
  }, {
    name: 'Project0',
    description: 'project description',
    avatar_url: 'http://www.hdwallpapers.in/walls/windows_xp_bliss-wide.jpg',
    spots: ['Front end web', 'Android'],
  }, {
    name: 'Project1',
    description: 'project description',
    avatar_url: 'http://www.hdwallpapers.in/walls/windows_xp_bliss-wide.jpg',
    spots: ['Front end web', 'Android'],
  }, {
    name: 'Project2',
    description: 'project description',
    avatar_url: 'http://www.hdwallpapers.in/walls/windows_xp_bliss-wide.jpg',
    spots: ['Front end web', 'Android'],
  }, {
    name: 'Project3',
    description: 'project description',
    avatar_url: 'http://www.hdwallpapers.in/walls/windows_xp_bliss-wide.jpg',
    spots: ['Front end web', 'Android'],
  }, {
    name: 'The ultimate game',
    description: 'project description',
    avatar_url: 'http://www.hdwallpapers.in/walls/windows_xp_bliss-wide.jpg',
    spots: ['Games', 'Back end web', 'Android', 'IOS'],
  }],
}

const UserInfo = props => (
  <div className="User-info">
    <Paper zDepth={1} className="Breathing-room User-info-profile-section">
      <Avatar className="User-info-avatar" src={props.avatar} />
      <h1>{props.name}</h1>
      <h2 className="User-info-login-name">{props.login}</h2>
    </Paper>
    <Paper zDepth={1} className="Breathing-room User-info-types-section">
      <Doughnut
        data={{
          labels: [
            'Front end web',
            'Back end web',
            'Android',
            'IOS',
            'Systems',
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
              devTypeToHex('Front end web'),
              devTypeToHex('Back end web'),
              devTypeToHex('Android'),
              devTypeToHex('IOS'),
              devTypeToHex('Systems'),
              devTypeToHex('Games'),
            ],
            hoverBackgroundColor: [
              devTypeToHex('Front end web'),
              devTypeToHex('Back end web'),
              devTypeToHex('Android'),
              devTypeToHex('IOS'),
              devTypeToHex('Systems'),
              devTypeToHex('Games'),
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
            <FeaturedProject
              key={project.name}
              project={project}
            />
          ))
        }
      </div>
      {defaultValues.projects.length > 3 ? (
        <div>
          <Subheader>Other projects you may be interested in</Subheader>
          <Paper zDepth={1} className="Breathing-room">
            {
              defaultValues.projects.slice(3).map(project => (
                <OtherProject
                  key={project.name}
                  project={project}
                />
              ))
            }
          </Paper>
        </div>
      ) : null}
    </List>
  </div>
)

const FeaturedProject = props => (
  <Paper zDepth={1} className="Featured-project Breathing-room">
    <FlatButton className="Feature-project-in">
      <div className="Featured-project-title-row">
        <Avatar src={props.project.avatar_url} />
        <h3 className="Featured-project-title">{props.project.name}</h3>
      </div>
      <p className="Featured-project-desc">{props.project.description}</p>
      <div className="Featured-project-tag-box">
        {
          props.project.spots.map(devType => (
            <Chip className="Featured-project-tag" style={{ backgroundColor: devTypeToHex(devType) }}>{devType}</Chip>
          ))
        }
      </div>
    </FlatButton>
  </Paper>
)


const OtherProject = props => (
  <FlatButton className="Other-project">
    <div className="Other-project-in">
      <Avatar src={props.project.avatar_url} />
      <div className="Other-project-title-col">
        <h3 className="Other-project-title">{props.project.name}</h3>
        <p className="Other-project-desc">{props.project.description}</p>
      </div>
      <div className="Other-project-tag-col">
        {
          props.project.spots.map(devType => (
            <Chip className="Featured-project-tag" style={{ backgroundColor: devTypeToHex(devType) }}>{devType}</Chip>
          ))
        }
      </div>
    </div>
  </FlatButton>
)

class DashBoard extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {}
  }

  render() {
    return (
      <div className="App">
        {console.log(this.props)}
        <AppToolbar auth={this.props.auth} />
        <div className="Content Side-space">
          <Subheader>Summary of your Github contributions</Subheader>
          <UserInfo
            avatar={this.props.data.profile.avatar_url}
            name={this.props.data.profile.name}
            login={this.props.data.profile.login}
            frontEnd={this.props.data.proficiencies.frontEnd}
            backEnd={this.props.data.proficiencies.backEnd}
            android={this.props.data.proficiencies.android}
            ios={this.props.data.proficiencies.ios}
            systems={this.props.data.proficiencies.systems}
            game={this.props.data.proficiencies.game}
          />
          <ProjectList />
        </div>
      </div>
    )
  }
}

export default DashBoard
