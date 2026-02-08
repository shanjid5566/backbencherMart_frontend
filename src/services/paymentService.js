import apiClient from './apiClient'

/**
 * Payment Service - Handles all Stripe payment related API calls
 */

/**
 * Get Stripe publishable key
 * @returns {Promise} Stripe configuration
 */
export const getStripeConfig = async () => {
  try {
    const response = await apiClient.get('/v1/payment/config')
    return response.data
  } catch (error) {
    console.error('Error fetching Stripe config:', error)
    throw error
  }
}

/**
 * Create Stripe checkout session
 * @param {Object} requestData - Contains metadata, successUrl, and cancelUrl
 * @returns {Promise} Checkout session details with URL and session ID
 */
export const createCheckoutSession = async (requestData) => {
  try {
    console.log('Payment Service - Sending to backend:', requestData)
    
    const response = await apiClient.post('/v1/payment/create-checkout-session', requestData)
    
    console.log('Payment Service - Backend response:', response.data)
    
    return response.data
  } catch (error) {
    console.error('Error creating checkout session:', error)
    console.error('Error details:', error.response?.data)
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      throw new Error('Please login to continue')
    }
    
    if (error.response?.data?.error === 'Cart is empty') {
      throw new Error('Your cart is empty. Please add items before checkout.')
    }
    
    throw new Error(error.response?.data?.message || 'Checkout failed. Please try again.')
  }
}

/**
 * Verify payment status after Stripe checkout
 * @param {string} sessionId - Stripe checkout session ID
 * @returns {Promise} Payment verification result with order details
 */
export const verifyPayment = async (sessionId) => {
  try {
    console.log('Payment Service - Verifying session:', sessionId)
    
    const response = await apiClient.get(`/v1/payment/verify/${sessionId}`)
    
    console.log('Payment Service - Verify response:', response.data)
    
    // Backend returns: { success, paymentStatus, sessionStatus, order }
    return response.data
  } catch (error) {
    console.error('Error verifying payment:', error)
    console.error('Error response:', error.response?.data)
    
    if (error.response?.status === 401) {
      throw new Error('Authentication required')
    }
    
    throw new Error(error.response?.data?.message || error.response?.data?.error || 'Payment verification failed')
  }
}

/**
 * Get user's cart
 * @returns {Promise} Cart data with items
 */
export const getUserCart = async () => {
  try {
    const response = await apiClient.get('/cart')
    return response.data
  } catch (error) {
    console.error('Error fetching cart:', error)
    
    if (error.response?.status === 401) {
      throw new Error('Please login to view cart')
    }
    
    throw new Error(error.response?.data?.message || 'Failed to fetch cart')
  }
}
