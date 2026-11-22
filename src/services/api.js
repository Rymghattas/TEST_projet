export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export async function apiRequest(path, options = {}) {
  const token = typeof window !== 'undefined'
    ? window.localStorage.getItem('token')
    : null
  const headers = new Headers({ 'Content-Type': 'application/json' })

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  new Headers(options.headers).forEach((value, name) => {
    headers.set(name, value)
  })

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorMessage = await response.text()
    throw new Error(errorMessage || `Erreur HTTP ${response.status}`)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}
