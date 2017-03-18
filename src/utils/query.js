import ApolloClient, { createNetworkInterface } from 'apollo-client'

export const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/ciz9bee78ha9b01496s2pun7o' }),
})

export const query = async (options) => {
  return client.query(options)
}

export default {}
