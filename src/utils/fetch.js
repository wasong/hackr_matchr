import fetch from 'isomorphic-fetch'

export const api = async (url, options = {}) => {
  const data = await fetch(url, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${process.env.token || ''}`,
      ...options.headers,
    },
    body: {
      ...options.body,
    },
  })
  // TODO: parse data?
  return data
}

export default {
  api,
}
