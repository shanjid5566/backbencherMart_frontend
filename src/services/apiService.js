import apiClient from './apiClient'

const parseError = (error) => {
  if (!error) return { message: 'Unknown error' }
  if (error.response) {
    return {
      message: error.response.data?.message || error.response.statusText,
      status: error.response.status,
      data: error.response.data,
    }
  }
  return { message: error.message }
}

const apiService = {
  get: async (url, config = {}) => {
    try {
      const res = await apiClient.get(url, config)
      return res.data
    } catch (err) {
      throw parseError(err)
    }
  },

  post: async (url, body = {}, config = {}) => {
    try {
      const res = await apiClient.post(url, body, config)
      return res.data
    } catch (err) {
      throw parseError(err)
    }
  },

  put: async (url, body = {}, config = {}) => {
    try {
      const res = await apiClient.put(url, body, config)
      return res.data
    } catch (err) {
      throw parseError(err)
    }
  },

  delete: async (url, config = {}) => {
    try {
      const res = await apiClient.delete(url, config)
      return res.data
    } catch (err) {
      throw parseError(err)
    }
  },
}

export default apiService
