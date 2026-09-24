// Pasta Perfect API client.
//
// All requests to the Express backend are kept here so the
// React pages do not need to handle API details themselves.

const BASE = import.meta.env.VITE_API_BASE_URL || ''

async function request(path, options = {}) {
  const response = await fetch(`${BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })

  if (!response.ok) {
    let message = `${response.status} ${response.statusText}`

    try {
      const body = await response.json()

      if (body?.error) {
        message = body.error
      }
    } catch {
      // The response was not JSON.
    }

    throw new Error(message)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export const listPasta = (search = '') =>
  request(
    `/api/pasta?search=${encodeURIComponent(search)}`,
  )

export const getPasta = (id) =>
  request(`/api/pasta/${id}`)