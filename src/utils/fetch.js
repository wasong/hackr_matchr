import fetch from 'isomorphic-fetch'

export const api = async (url, options = {}) => {
  const data = await fetch(url, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${process.env.token || 'db9f4a75955b1d4b49b9c3b3b836d9a27bcc7b9a'}`,
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
