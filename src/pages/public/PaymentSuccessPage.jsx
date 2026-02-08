import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router'
import { verifyPayment } from '../../services/paymentService'
import Container from '../../components/Container'
import { FaCheckCircle, FaTimesCircle, FaSpinner, FaShoppingBag, FaHome } from 'react-icons/fa'

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState(null)
  const [error, setError] = useState(null)
  const [paymentStatus, setPaymentStatus] = useState(null)

  useEffect(() => {
    const verifyPaymentStatus = async () => {
      const sessionId = searchParams.get('session_id')
      
      console.log('Payment Success Page - Session ID:', sessionId)
      
      if (!sessionId) {
        setError('Invalid payment session. No session ID found.')
        setLoading(false)
        return
      }

      const token = localStorage.getItem('token') || localStorage.getItem('authToken')
      
      if (!token) {
        setError('Authentication required. Please login.')
        setLoading(false)
        setTimeout(() => navigate('/login'), 3000)
        return
      }

      try {
        console.log('Verifying payment with session ID:', sessionId)
        const result = await verifyPayment(sessionId)
        
        console.log('Payment verification result:', result)
        
        setPaymentStatus(result.paymentStatus)
        setOrder(result.order)
        
        if (result.paymentStatus === 'paid') {
          console.log('✅ Payment successful! Order ID:', result.order?._id)
          // Clear stored session data
          localStorage.removeItem('lastSessionId')
          localStorage.removeItem('lastOrderId')
        } else {
          console.warn('⚠️ Payment not completed. Status:', result.paymentStatus)
        }
        
      } catch (err) {
        console.error('Payment verification error:', err)
        setError(err.message || 'Payment verification failed')
      } finally {
        setLoading(false)
      }
    }

    verifyPaymentStatus()
  }, [searchParams, navigate])

  // Loading state
  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-[600px]">
          <div className="text-center">
            <FaSpinner className="animate-spin text-6xl text-blue-600 dark:text-blue-400 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Verifying Payment...</h2>
            <p className="text-gray-600 dark:text-gray-400">Please wait while we confirm your payment</p>
          </div>
        </div>
      </Container>
    )
  }

  // Error state
  if (error || !order) {
    return (
      <Container>
        <div className="max-w-2xl mx-auto mt-20">
          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-8 text-center">
            <FaTimesCircle className="text-6xl text-red-600 dark:text-red-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-red-800 dark:text-red-400 mb-4">Payment Verification Failed</h1>
            <p className="text-red-600 dark:text-red-300 mb-6">{error || 'Unable to verify payment'}</p>
            
            <div className="space-x-4">
              <Link
                to="/cart"
                className="inline-block bg-red-600 dark:bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
              >
                Return to Cart
              </Link>
              <Link
                to="/dashboard/orders"
                className="inline-block bg-gray-600 dark:bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              >
                View Orders
              </Link>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-6">
              If you believe this is an error, please contact support with your order details.
            </p>
          </div>
        </div>
      </Container>
    )
  }

  // Payment failed state
  if (paymentStatus !== 'paid') {
    return (
      <Container>
        <div className="max-w-2xl mx-auto mt-20">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg p-8 text-center">
            <FaTimesCircle className="text-6xl text-yellow-600 dark:text-yellow-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-yellow-800 dark:text-yellow-400 mb-4">Payment Incomplete</h1>
            <p className="text-yellow-700 dark:text-yellow-300 mb-6">
              Your payment was not completed. Payment status: {paymentStatus}
            </p>
            
            <div className="space-x-4">
              <Link
                to="/checkout"
                className="inline-block bg-yellow-600 dark:bg-yellow-700 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 dark:hover:bg-yellow-600 transition-colors"
              >
                Try Again
              </Link>
              <Link
                to="/cart"
                className="inline-block bg-gray-600 dark:bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              >
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </Container>
    )
  }

  // Success state
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-12">
        {/* Success Header */}
        <div className="text-center mb-8">
          <FaCheckCircle className="text-6xl text-green-600 dark:text-green-400 mx-auto mb-4 animate-bounce" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Thank you for your purchase</p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Order Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Order ID</p>
                <p className="font-mono font-semibold text-gray-900 dark:text-white">{order._id}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Order Date</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Payment Status</p>
                <p className="font-semibold text-green-600 dark:text-green-400 uppercase">{order.payment.status}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Order Status</p>
                <p className="font-semibold text-blue-600 dark:text-blue-400 uppercase">{order.status}</p>
              </div>
              {order.payment.transactionId && (
                <div className="md:col-span-2">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Transaction ID</p>
                  <p className="font-mono text-sm text-gray-900 dark:text-gray-200">{order.payment.transactionId}</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Items Ordered</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600">
                  {item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Quantity: {item.quantity}</p>
                    {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Options: {JSON.stringify(item.selectedOptions)}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">${item.price.toFixed(2)} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-gray-900 dark:text-white">Total Paid</span>
              <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                ${order.subTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>


        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/dashboard/orders"
            className="flex items-center justify-center gap-2 bg-blue-600 dark:bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-semibold shadow-md"
          >
            <FaShoppingBag />
            View All Orders
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-gray-600 dark:bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-semibold shadow-md"
          >
            <FaHome />
            Continue Shopping
          </Link>
        </div>
      </div>
    </Container>
  )
}

export default PaymentSuccessPage
