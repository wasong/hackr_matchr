import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Toolbar, ToolbarGroup, FlatButton, Avatar, Subheader, List, ListItem } from 'material-ui'
import logo from '../../logo.svg'
import './App.css'

const defaultValues = {
  firstName: 'Tim',
  lastName: 'Bo',
  userName: 'Timbobobo',
  userAvatarURL: 'http://cdn.computerhope.com/hacker.jpg',
  userTypes: ['Front-end', 'Back-end'],
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
  }],


}
const App = props => (
  <div className="App">
    <Toolbar className="App-toolbar">
      <ToolbarGroup firstChild>
      </ToolbarGroup>
      <ToolbarGroup lastChild>
        <FlatButton
          label="Sign out"
          onClick={
            () => {
              console.log(props)
              props.route.auth.logout()
              browserHistory.push('/login')
            }
          }
        />
      </ToolbarGroup>
    </Toolbar>
    <div className="Content">
      <UserInfo />
      <ProjectList />
    </div>
  </div>
)

const UserInfo = props => (
  <div className="User-info">
    <div className="User-info-profile-section">
      <Avatar className="User-info-avatar" src={defaultValues.userAvatarURL} />
      <h1>{defaultValues.firstName} {defaultValues.lastName}</h1>
      <h2>{defaultValues.userName}</h2>
    </div>
    <div className="User-info-types-section">
      <div className="User-info-types-box">
        {
          defaultValues.userTypes.map(type => (
            <p>{type}</p> // todo: use seperate component
          ))
        }
      </div>
    </div>
  </div>
)

const ProjectList = props => (
  <List>
    <Subheader>Projects you can join</Subheader>
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
)

const ProjectListElement = props => (
  <div />
)

export default App


// const App = props => (
//   <div className="App">
//     <div className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <h2>Welcome to React</h2>
//     </div>
//     <p className="App-intro">
//       To get started, edit <code>src/App.js</code> and save to reload.
//     </p>
//     <div><RaisedButton label="Console log Redux!" onClick={props.loadDefault} /></div>
//     <div><RaisedButton label="Material UI" /></div>
//     <div><RaisedButton label="onClick Query" onClick={debouncedQuery} /></div>
//     <p><Link to="/auth">Auth</Link></p>
//     <div>
//       Display Graphql query:&nbsp;
//       {
//         props.data.loading || props.data.error
//         ? <span>Loading...</span>
//         : (
//           <div>
//             {
//               props.data.allKappachinoes.map(user => (
//                 <div key={user.id}>{user.posts}</div>
//               ))
//             }
//           </div>
//         )
//       }
//     </div>
//   </div>
// )
