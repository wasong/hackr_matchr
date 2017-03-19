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
      commits: action.commits,
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
      files: action.files,
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

export const loadCommitFiles = (files) => {
  return {
    type: LOAD_COMMIT_FILES,
    files,
  }
}

// thunks
export const loadCommitsThunk = (repos) => {
  return async (dispatch) => {
    const commits = []
    repos.forEach(async (repo) => {
      const name = repo.full_name
      let repoCommits = await api(`https://api.github.com/repos/${name}/commits`)
      repoCommits = await repoCommits.json()
      commits.push(repoCommits)
    })
    dispatch(loadCommits(commits))
    return commits
  }
}

export const loadCommitFilesThunk = (commits) => {
  return async (dispatch) => {
    const data = commits
    data.forEach(c => console.log(c))
    dispatch(loadCommitFiles(data))
    return data
  }
}

export const loadProfileThunk = (user) => {
  return async (dispatch) => {
    // TODO: add error handling
    let profile = await api(`https://api.github.com/users/${user}`)
    profile = await profile.json()
    dispatch(loadProfile(profile))

    let repos = await api(`https://api.github.com/users/${profile.login}/repos`)
    repos = await repos.json()
    dispatch(loadRepos(repos))

    const commits = await dispatch(loadCommitsThunk(repos))
    const commitFiles = await dispatch(loadCommitFilesThunk(commits))
  }
}

export default reducer
