/* API client for the Django backend.
   Token auth: the studio admin logs in, stores the token, and sends it as
   `Authorization: Token <key>` on authenticated requests. */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
const TOKEN_KEY = 'edc.adminToken'

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    /* storage unavailable — ignore */
  }
}

export async function apiRequest(path, { method = 'GET', body, auth = false } = {}) {
  const headers = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (auth) {
    const token = getToken()
    if (token) headers['Authorization'] = `Token ${token}`
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    let detail = `Request failed (${res.status})`
    try {
      const data = await res.json()
      if (data) {
        if (data.detail) {
          detail = data.detail
        } else {
          // DRF field validation errors — surface the first one.
          const first = Object.values(data)[0]
          if (Array.isArray(first) && first.length) detail = String(first[0])
          else if (typeof first === 'string') detail = first
        }
      }
    } catch {
      /* non-JSON error body — keep the generic message */
    }
    const error = new Error(detail)
    error.status = res.status
    throw error
  }

  if (res.status === 204) return null
  return res.json()
}

export async function login(identifier, password) {
  const data = await apiRequest('/auth/login/', {
    method: 'POST',
    body: { username: identifier, password },
  })
  setToken(data.token)
  return data.user
}

export async function logout() {
  try {
    await apiRequest('/auth/logout/', { method: 'POST', auth: true })
  } catch {
    /* token already invalid — clear it locally anyway */
  }
  setToken(null)
}

export async function fetchMe() {
  const data = await apiRequest('/auth/me/', { auth: true })
  return data.user
}

/* Upload a file (multipart/form-data) — for the media library. */
export async function uploadFile(path, file, extraFields = {}) {
  const formData = new FormData()
  formData.append('file', file)
  Object.entries(extraFields).forEach(([k, v]) => formData.append(k, String(v)))

  const headers = {}
  const token = getToken()
  if (token) headers['Authorization'] = `Token ${token}`
  // Do NOT set Content-Type — the browser sets the multipart boundary.

  const res = await fetch(`${API_URL}${path}`, { method: 'POST', headers, body: formData })

  if (!res.ok) {
    let detail = `Upload failed (${res.status})`
    try {
      const data = await res.json()
      if (data && data.detail) {
        detail = data.detail
      } else if (data) {
        const first = Object.values(data)[0]
        if (Array.isArray(first) && first.length) detail = String(first[0])
        else if (typeof first === 'string') detail = first
      }
    } catch { /* non-JSON */ }
    const error = new Error(detail)
    error.status = res.status
    throw error
  }
  return res.json()
}

/* Generic content CRUD — used by the admin's collection editor. */
export const resources = {
  list: (name) => apiRequest(`/${name}/`),
  create: (name, data) => apiRequest(`/${name}/`, { method: 'POST', body: data, auth: true }),
  update: (name, slug, data) =>
    apiRequest(`/${name}/${slug}/`, { method: 'PUT', body: data, auth: true }),
  remove: (name, slug) =>
    apiRequest(`/${name}/${slug}/`, { method: 'DELETE', auth: true }),
}

export { API_URL }
