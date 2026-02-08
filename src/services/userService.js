import apiClient from './apiClient'

const userService = {
  /**
   * Get user profile with statistics
   * @returns {Promise} User profile data
   */
  getProfile: async () => {
    const response = await apiClient.get('/user/profile')
    return response.data
  },

  /**
   * Update user profile
   * @param {Object} profileData - Profile data to update
   * @returns {Promise} Updated user data
   */
  updateProfile: async (profileData) => {
    const response = await apiClient.put('/user/profile', profileData)
    return response.data
  },

  /**
   * Get user orders with optional status filter
   * @param {string} status - Order status filter (all, processing, shipped, delivered, cancelled)
   * @returns {Promise} Orders data
   */
  getOrders: async (status = 'all') => {
    const url = status && status !== 'all' 
      ? `/user/orders?status=${status}` 
      : '/user/orders'
    const response = await apiClient.get(url)
    return response.data
  },

  /**
   * Change user password
   * @param {Object} passwordData - Current and new passwords
   * @returns {Promise} Success message
   */
  changePassword: async (passwordData) => {
    const response = await apiClient.put('/user/change-password', passwordData)
    return response.data
  },

  /**
   * Delete user account
   * @param {string} password - User password for confirmation
   * @returns {Promise} Success message
   */
  deleteAccount: async (password) => {
    const response = await apiClient.delete('/user/account', {
      data: { password }
    })
    return response.data
  }
}

export default userService
