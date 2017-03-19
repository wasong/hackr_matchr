import fetch from 'isomorphic-fetch'

export const api = async (url) => {
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  // TODO: parse data?
  return data
}

export default {
  api,
}
