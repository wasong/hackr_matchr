import injectTapEventPlugin from 'react-tap-event-plugin'
import React from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import base from './default.modules'
import profile from './dashboard.modules'
import Entry from './entry'
import './index.css'

injectTapEventPlugin()

const loggerMiddleware = createLogger()
const rootReducer = combineReducers({
  // add reducers here
  base,
  profile,
})

const store = createStore(rootReducer,
  {
    base: '',
    profile: {
      profile: {},
      repos: [],
      commits: [],
    },
  },
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
)

render(
  <Entry store={store} />,
  document.getElementById('root'),
)
