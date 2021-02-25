const endpoint = 'http://localhost:3001/'

export const register = (user_handle, email, password) => {
  const data = { user_handle, email, password }
  return fetch(endpoint + 'register', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data),
  }).then((response) => response.json())
}

export const signin = (email, password) => {
  const data = { email, password }
  return fetch(endpoint + 'signin', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data),
  }).then((response) => response.json())
}

export const getProfile = (id) => {
  return fetch(endpoint + 'profile/' + id, {
    method: 'GET',
  }).then((response) => response.json())
}

export const getScoreList = () => {
  return fetch(endpoint + 'scoreList', {
    method: 'GET',
  }).then((response) => response.json())
}

export const checkHandleTaken = (user_handle) => {
  const data = { user_handle }
  return fetch(endpoint + 'checkHandleTaken', {
    method: 'GET',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data),
  }).then((response) => response.json())
}

export const updateHighScore = (id, high_score) => {
  const data = { id, high_score }
  return fetch(endpoint + 'updateHighScore', {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data),
  }).then((response) => response.json())
}

export const updateHandle = (id, user_handle) => {
  const data = { id, user_handle }
  return fetch(endpoint + 'updateUserHandle', {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data),
  }).then((response) => response.json())
}

export const deleteProfile = (id) => {
  return fetch(endpoint + 'profile/' + id, {
    method: 'DELETE',
  }).then((response) => response.json())
}
