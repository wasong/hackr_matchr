import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { ApolloProvider } from 'react-apollo'

import { client } from './utils/query'
import Routes from './routes'

const Entry = ({ store }) => (
  <MuiThemeProvider>
    <ApolloProvider client={client}>
      <Routes store={store} />
    </ApolloProvider>
  </MuiThemeProvider>
)

export default Entry
