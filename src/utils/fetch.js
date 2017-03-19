import fetch from 'isomorphic-fetch'

export const api = async (url, options = {}) => {
  const data = await fetch(url, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${process.env.token || '7d69b67db7e5a2304b669e2a387c504c197f045b'}`,
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
