import { Link } from 'react-router'
import Container from '../../components/Container'
import { FaTimesCircle, FaShoppingCart, FaHome } from 'react-icons/fa'

const PaymentCancelPage = () => {
  return (
    <Container>
      <div className="max-w-2xl mx-auto mt-20">
        <div className="bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center shadow-lg">
          <FaTimesCircle className="text-6xl text-gray-600 dark:text-gray-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Payment Cancelled</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your payment was cancelled. Your items are still in your cart.
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <p className="text-blue-800 dark:text-blue-300 text-sm">
              💡 <strong>Tip:</strong> You can return to your cart and try checking out again when you're ready.
            </p>
          </div>

          <div className="space-x-4">
            <Link
              to="/cart"
              className="inline-flex items-center gap-2 bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-semibold shadow-md"
            >
              <FaShoppingCart />
              Back to Cart
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-gray-600 dark:bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-semibold shadow-md"
            >
              <FaHome />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default PaymentCancelPage
