import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Dashboard from './Dashboard.redux'

const getProjects = gql`
    query {
      allProjects {
        id
        availableSpots
        members
        name
      }
    }
`

export default graphql(getProjects)(Dashboard)
