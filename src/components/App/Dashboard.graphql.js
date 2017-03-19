import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Dashboard from './Dashboard.redux'

const getProjects = gql`
    query {
      allProjects {
        name
        description
        availableSpots
        avatarUrl
      }
    }
`

export default graphql(getProjects)(Dashboard)
