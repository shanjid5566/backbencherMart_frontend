import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || ''

console.log('API Base URL:', baseURL)
console.log('Environment:', import.meta.env.VITE_API_BASE_URL)

const apiClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false,
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

apiClient.interceptors.request.use(
  (config) => {
    try {
      // support both `token` (used by authSlice) and `authToken` (older key)
      const token = localStorage.getItem('token') || localStorage.getItem('authToken')
      if (token) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch (e) {
      // ignore
    }
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Token refresh disabled since /auth/refresh endpoint is not available
    // If backend adds refresh support, uncomment and adapt the interceptor below
    return Promise.reject(error)
  }
)

export function setAuthToken(token) {
  if (token) {
    // persist under both keys for compatibility
    localStorage.setItem('authToken', token)
    localStorage.setItem('token', token)
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

export function clearAuthToken() {
  localStorage.removeItem('authToken')
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  delete apiClient.defaults.headers.common['Authorization']
}

export default apiClient
