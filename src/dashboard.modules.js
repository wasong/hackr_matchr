import { api } from './utils/fetch'
// actions
const LOAD_PROFILE = 'LOAD_PROFILE'

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
    return action.profile
  },
})

// action creators
export const loadProfile = (profile) => {
  return {
    type: LOAD_PROFILE,
    profile,
  }
}

// thunks
export const loadProfileThunk = (user) => {
  return async (dispatch) => {
    // TODO: add error handling
    const profile = await api(`https://api.github.com/users/${user}`)
    dispatch(loadProfile(await profile.json()))

    return profile
  }
}


export default reducer
