import fetch from 'isomorphic-fetch'

export const api = async (url) => {
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'token b0010adca5a489ff578a0e7d885f56767fb2d755',
    },
  })
  // TODO: parse data?
  return data
}

export default {
  api,
}
