import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getUserCart, createCheckoutSession } from '../../services/paymentService'
import Container from '../../components/Container'
import { FaShoppingCart, FaLock, FaSpinner } from 'react-icons/fa'

const CheckoutPage = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState(null)
  
  const [formData, setFormData] = useState({
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    phone: '',
  })
  
  const [formErrors, setFormErrors] = useState({})

  // Load cart data on component mount
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token') || localStorage.getItem('authToken')
      
      if (!token) {
        setError('Please login to continue')
        setTimeout(() => navigate('/login'), 2000)
        return
      }

      try {
        const cartData = await getUserCart()
        
        if (!cartData.items || cartData.items.length === 0) {
          setError('Your cart is empty')
          setTimeout(() => navigate('/cart'), 2000)
          return
        }
        
        setCart(cartData)
      } catch (err) {
        setError(err.message)
        if (err.message.includes('login')) {
          setTimeout(() => navigate('/login'), 2000)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [navigate])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  // Validate form
  const validateForm = () => {
    const errors = {}
    
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Valid email is required'
    }
    
    if (!formData.street.trim()) {
      errors.street = 'Street address is required'
    }
    
    if (!formData.city.trim()) {
      errors.city = 'City is required'
    }
    
    if (!formData.state.trim()) {
      errors.state = 'State is required'
    }
    
    if (!formData.zip.trim()) {
      errors.zip = 'ZIP code is required'
    }
    
    if (!formData.country.trim()) {
      errors.country = 'Country is required'
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle checkout submission
  const handleCheckout = async (e) => {
    e.preventDefault()
    
    console.log('🔵 handleCheckout called!')
    
    if (!validateForm()) {
      console.log('❌ Form validation failed')
      return
    }
    
    console.log('✅ Form validation passed')
    
    setProcessing(true)
    setError(null)
    
    try {
      // Get current domain for redirect URLs
      const baseUrl = window.location.origin
      
      console.log('🌐 Base URL:', baseUrl)
      
      const requestData = {
        metadata: {
          email: formData.email,
          shippingAddress: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            country: formData.country,
          },
          phone: formData.phone,
        },
        successUrl: `${baseUrl}/order/success`,
        cancelUrl: `${baseUrl}/order/cancel`,
      }
      
      console.log('📤 Creating checkout session with data:', requestData)
      
      const response = await createCheckoutSession(requestData)
      
      console.log('📥 Checkout session created:', response)
      
      const { url, sessionId, orderId } = response
      
      if (!url) {
        console.error('❌ No URL in response:', response)
        throw new Error('No checkout URL received from server')
      }
      
      // Store session info for later verification
      localStorage.setItem('lastSessionId', sessionId)
      localStorage.setItem('lastOrderId', orderId)
      
      // Redirect to Stripe checkout
      console.log('🚀 Redirecting to Stripe:', url)
      window.location.href = url
      
    } catch (err) {
      console.error('💥 Checkout error:', err)
      console.error('Error details:', err.response?.data || err.message)
      setError(err.message)
      setProcessing(false)
    }
  }

  // Calculate total
  const calculateTotal = () => {
    if (!cart || !cart.items) return 0
    return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading checkout...</p>
          </div>
        </div>
      </Container>
    )
  }

  if (error && !cart) {
    return (
      <Container>
        <div className="max-w-md mx-auto mt-20 p-6 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div className="py-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FaLock className="text-gray-600" />
                Shipping Information
              </h2>
              
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600">{error}</p>
                </div>
              )}
              
              <form onSubmit={handleCheckout}>
                {/* Email */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="john@example.com"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>

                {/* Street Address */}
                <div className="mb-4">
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.street ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="123 Main Street"
                  />
                  {formErrors.street && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.street}</p>
                  )}
                </div>

                {/* City and State */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="New York"
                    />
                    {formErrors.city && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.state ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="NY"
                    />
                    {formErrors.state && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.state}</p>
                    )}
                  </div>
                </div>

                {/* ZIP and Country */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.zip ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="10001"
                    />
                    {formErrors.zip && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.zip}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.country ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="US"
                    />
                    {formErrors.country && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.country}</p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
                >
                  {processing ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaLock />
                      Proceed to Payment
                    </>
                  )}
                </button>
                
                <p className="text-sm text-gray-500 text-center mt-4">
                  <FaLock className="inline mr-1" />
                  Secure checkout powered by Stripe
                </p>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaShoppingCart />
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cart?.items?.map((item) => (
                  <div key={item._id} className="flex gap-3 pb-4 border-b">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.title}</h3>
                      <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                      <p className="font-semibold text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Calculated at next step</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t pt-2 mt-2">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default CheckoutPage
