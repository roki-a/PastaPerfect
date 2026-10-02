// Pasta Perfect API client.

const BASE = import.meta.env.VITE_API_BASE_URL || ''

const USERNAME_KEY = 'pastaPerfectAppUsername'
const PASSWORD_KEY = 'pastaPerfectAppPassword'

export function getAppUsername() {
  return sessionStorage.getItem(USERNAME_KEY) || ''
}

export function getAppPassword() {
  return sessionStorage.getItem(PASSWORD_KEY) || ''
}

export function setAppCredentials(username, password) {
  sessionStorage.setItem(USERNAME_KEY, username)
  sessionStorage.setItem(PASSWORD_KEY, password)
}

export function clearAppCredentials() {
  sessionStorage.removeItem(USERNAME_KEY)
  sessionStorage.removeItem(PASSWORD_KEY)
}

async function request(path, options = {}) {
  const username = getAppUsername()
  const password = getAppPassword()

  const response = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(username && password
        ? {
            Authorization: `Basic ${btoa(`${username}:${password}`)}`,
          }
        : {}),
      ...(options.headers || {}),
    },
  })

  if (!response.ok) {
    let message = `${response.status} ${response.statusText}`

    try {
      const body = await response.json()

      if (body?.error) {
        message = body.error
      }
    } catch {
      // Response was not JSON.
    }

    throw new Error(message)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

// ---------------------------------------------------------
// GET ALL PASTA
// ---------------------------------------------------------

export const listPasta = (search = '') =>
  request(
    `/api/pasta?search=${encodeURIComponent(search)}`,
  )

// ---------------------------------------------------------
// GET ONE PASTA
// ---------------------------------------------------------

export const getPasta = (id) =>
  request(`/api/pasta/${id}`)

// ---------------------------------------------------------
// CREATE PASTA
// ---------------------------------------------------------

export const createPasta = (data) =>
  request('/api/pasta', {
    method: 'POST',
    body: JSON.stringify(data),
  })

// ---------------------------------------------------------
// UPDATE PASTA TIME
// ---------------------------------------------------------

export async function updatePastaTime(
  id,
  times,
) {
  return request(
    `/api/pasta/${id}/time`,
    {
      method: 'PUT',
      body: JSON.stringify(times),
    },
  )
}

// ---------------------------------------------------------
// RESET TIME
// ---------------------------------------------------------

export async function resetPastaTime(id) {
  return request(
    `/api/pasta/${id}/reset-time`,
    {
      method: 'POST',
    },
  )
}

// ---------------------------------------------------------
// UPDATE USER-ADDED PASTA
// ---------------------------------------------------------

export async function updatePasta(
  id,
  data,
) {
  return request(
    `/api/pasta/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
    },
  )
}

// ---------------------------------------------------------
// DELETE USER-ADDED PASTA
// ---------------------------------------------------------

export const deletePasta = (id) =>
  request(`/api/pasta/${id}`, {
    method: 'DELETE',
  })