import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || ''

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
      const token = localStorage.getItem('authToken')
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
    const originalRequest = error.config
    if (!originalRequest) return Promise.reject(error)

    const status = error.response ? error.response.status : null

    // Attempt refresh flow on 401
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = 'Bearer ' + token
            return apiClient(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      isRefreshing = true
      const refreshToken = localStorage.getItem('refreshToken')

      try {
        // NOTE: adapt refresh endpoint to your backend
        const resp = await axios.post(`${baseURL}/auth/refresh`, { refreshToken })
        const { authToken: newToken, refreshToken: newRefresh } = resp.data
        localStorage.setItem('authToken', newToken)
        if (newRefresh) localStorage.setItem('refreshToken', newRefresh)
        apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + newToken
        processQueue(null, newToken)
        isRefreshing = false
        originalRequest.headers.Authorization = 'Bearer ' + newToken
        return apiClient(originalRequest)
      } catch (err) {
        processQueue(err, null)
        isRefreshing = false
        // optional: clear stored tokens and redirect to login
        localStorage.removeItem('authToken')
        localStorage.removeItem('refreshToken')
        // window.location.href = '/login'
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('authToken', token)
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

export function clearAuthToken() {
  localStorage.removeItem('authToken')
  localStorage.removeItem('refreshToken')
  delete apiClient.defaults.headers.common['Authorization']
}

export default apiClient
