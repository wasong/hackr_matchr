/*
  Rules for modified DUCK redux modularity
  - MUST export default a function called reducer()
  - MUST export its action creators as functions
*/

// actions
const DEFAULT = 'DEFAULT'

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
  [DEFAULT](state, action) {
    return state
  },
})

// action creators
export const loadDefault = () => {
  return { type: DEFAULT }
}

export default reducer
