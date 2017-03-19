import { api } from './utils/fetch'
// actions
const LOAD_PROFILE = 'LOAD_PROFILE'
const LOAD_COMMITS = 'LOAD_COMMITS'
const LOAD_COMMIT_FILES = 'LOAD_COMMIT_FILES'
const LOAD_REPOS = 'LOAD_REPOS'

// helper function to create reducers
const createReducer = (initState, handlers) => {
  return (state = initState, action) => {
    if ({}.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action)
    }
    return state
  }
}

// reducer
const reducer = createReducer({}, {
  [LOAD_PROFILE](state, action) {
    return {
      ...state,
      profile: action.profile,
    }
  },
  [LOAD_COMMITS](state, action) {
    return {
      ...state,
      commits: [...state.commits, action.commits],
    }
  },
  [LOAD_REPOS](state, action) {
    return {
      ...state,
      repos: action.repos,
    }
  },
  [LOAD_COMMIT_FILES](state, action) {
    return {
      ...state,
      proficiencies: action.proficiencies,
    }
  },
})

// action creators
export const loadProfile = (profile) => {
  return {
    type: LOAD_PROFILE,
    profile,
  }
}

export const loadRepos = (repos) => {
  return {
    type: LOAD_REPOS,
    repos,
  }
}

export const loadCommits = (commits) => {
  return {
    type: LOAD_COMMITS,
    commits,
  }
}

export const loadCommitFiles = (proficiencies) => {
  return {
    type: LOAD_COMMIT_FILES,
    proficiencies,
  }
}

// thunks
export const loadProfileThunk = (user) => {
  return dispatch => api(`https://api.github.com/users/${user}`)
      .then(response => response.json())
      .then(profile => dispatch(loadProfile(profile)))
}

export const loadReposThunk = (login) => {
  return dispatch => api(`https://api.github.com/users/${login}/repos`)
    .then(response => response.json())
    .then(repos => dispatch(loadRepos(repos)))
}

export const loadCommitsThunk = (repos) => {
  return dispatch => Promise.all(repos.map((repo) => {
    const name = repo.full_name
    return api(`https://api.github.com/repos/${name}/commits`)
    .then(response => response.json())
    .then(commits => dispatch(loadCommits(commits)))
  }))
}

export const loadCommitFilesThunk = (commitsArr) => {
  return dispatch => Promise.all(commitsArr.map((c) => {
    // This is a rate limit killer
    // return Promise.all(c.map((data) => {
    //   return api(data.url)
    //   .then(response => response.json())
    //   .then(json => console.log(json))
    // }))
    return api(c[0].url)
      .then(response => response.json())
      .then((json) => {
        const { files } = json

        const parseFileType = (fileName) => {
          const extension = fileName ? fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase() : ''
          // TODO: back-end should have js too for nodejs
          const frontEnd = ['js', 'jsx', 'html', 'css', 'less'].find(elem => elem === extension)
          const backend = ['py', 'rb', 'php'].find(elem => elem === extension)
          const systems = ['c', 'cpp', 'go', 'cs'].find(elem => elem === extension)
          const ios = ['swift', 'm'].find(elem => elem === extension)
          const android = ['java'].find(elem => elem === extension)
          const game = ['unity', 'fbx'].find(elem => elem === extension)
          if (frontEnd) return 'frontEnd'
          if (backend) return 'backEnd'
          if (systems) return 'systems'
          if (ios) return 'ios'
          if (android) return 'android'
          if (game) return 'game'
          return null
        }

        const obj = {
          frontEnd: 0,
          backEnd: 0,
          systems: 0,
          ios: 0,
          android: 0,
          game: 0,
        }

        files.forEach((file) => {
          const { filename, additions, deletions } = file
          const fileType = parseFileType(filename)
          const linesCommitted = additions + deletions
          if (fileType) obj[fileType] += linesCommitted
        })
        dispatch(loadCommitFiles(obj))
      })
  }))
}

export const initialLoad = (name) => {
  return dispatch => dispatch(loadProfileThunk(name))
    .then(action => dispatch(loadReposThunk(action.profile.login)))
    .then(action => dispatch(loadCommitsThunk(action.repos)))
    .then((actionArray) => {
      const commits = []
      actionArray.forEach(r => commits.push(r.commits))
      dispatch(loadCommitFilesThunk(commits))
    })
}

export default reducer
