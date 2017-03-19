import React, { Component } from 'react'
import { Dialog, Chip, Paper, Avatar, Subheader, List, FlatButton } from 'material-ui'
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

const getProjectRank = (project, proficiencies) => {
  let score = 0
  project.availableSpots.forEach((spot) => {
    score += proficiencies[spot] || 0
  })
  score /= project.availableSpots.length
  return score
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
          props.projects.slice(0, 3).map(project => (
            <FeaturedProject
              key={project.name}
              project={project}
              onClick={props.onSelect}
            />
          ))
        }
      </div>
      {props.projects.length > 3 ? (
        <div>
          <Subheader>Other projects you may be interested in</Subheader>
          <Paper zDepth={1} className="Breathing-room">
            {
              props.projects.slice(3).map(project => (
                <OtherProject
                  key={project.name}
                  project={project}
                  onClick={props.onSelect}
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
    <FlatButton className="Feature-project-in" onClick={() => { props.onClick(props.project) }}>
      <div className="Featured-project-title-row">
        <Avatar src={props.project.avatarUrl} />
        <h3 className="Featured-project-title">{props.project.name}</h3>
      </div>
      <p className="Featured-project-desc">{props.project.description}</p>
      <div className="Featured-project-tag-box">
        {
          props.project.availableSpots.map(devType => (
            <Chip key={devType} className="Featured-project-tag" style={{ backgroundColor: devTypeToHex(devType) }}>{devType}</Chip>
          ))
        }
      </div>
    </FlatButton>
  </Paper>
)


const OtherProject = props => (
  <FlatButton className="Other-project" onClick={() => { props.onClick(props.project) }}>
    <div className="Other-project-in">
      <Avatar src={props.project.avatarUrl} />
      <div className="Other-project-title-col">
        <h3 className="Other-project-title">{props.project.name}</h3>
        <p className="Other-project-desc">{props.project.description}</p>
      </div>
      <div className="Other-project-tag-col">
        {
          props.project.availableSpots.map(devType => (
            <Chip key={devType} className="Featured-project-tag" style={{ backgroundColor: devTypeToHex(devType) }}>{devType}</Chip>
          ))
        }
      </div>
    </div>
  </FlatButton>
)

class DashBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      selectedProj: {},
      projects: [],
      lineFields: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const hasUserData = nextProps.data && nextProps.data.proficiencies
    const hasProjectData = nextProps.query && !nextProps.query.loading && nextProps.query.allProjects
    if (hasUserData && hasProjectData) {
      this.setState({ projects: JSON.parse(JSON.stringify(nextProps.query.allProjects)).sort((a, b) => {
        return getProjectRank(b, nextProps.data.proficiencies) - getProjectRank(a, nextProps.data.proficiencies)
      }) })
    }
  }

  handleOpen = (project) => {
    this.setState({ open: true, selectedProj: project })
  };

  handleClose = () => {
    this.setState({ open: false })
  };

  toggleDialog = (type) => {
    this.setState({ [type]: !this.state[type] })
  }

  render() {
    return (
      <div className="App">
        <AppToolbar auth={this.props.auth} />
        <div className="Content Side-space">
          {
            this.props.query && this.props.query.loading ?
            null : (
              <div>
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
                <ProjectList onSelect={this.handleOpen} projects={this.state.projects} />
                <Dialog
                  title={this.state.selectedProj.name}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                >
                  <div>
                    <Avatar src={this.state.selectedProj.avatarUrl} />
                    <p>{this.state.selectedProj.description}</p>
                  </div>
                </Dialog>
                <Dialog
                  title="Enter estimated lines committed"
                  modal={false}
                  open={this.state.lineFields}
                  onRequestClose={this.toggleDialog}
                >
                  TEXT FIELDS
                </Dialog>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default DashBoard
