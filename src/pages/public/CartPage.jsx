import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart, updateCartItem, removeCartItem } from '../../features/cart/cartSlice'
import { FiTrash2, FiTag, FiArrowRight } from 'react-icons/fi';
import Container from '../../components/Container';
import Breadcrumb from '../../components/Breadcrumb';

const CartPage = () => {
  const dispatch = useDispatch()
  const token = useSelector((s) => s.auth?.token)
  const cartState = useSelector((s) => s.cart || { items: [], loading: false })
  const cartItems = cartState.items || []

  const [promoCode, setPromoCode] = useState('');

  useEffect(() => {
    if (token) dispatch(fetchCart())
  }, [token, dispatch])

  const updateQuantity = async (itemId, delta) => {
    const current = cartItems.find(i => i._id === itemId)
    if (!current) return
    const nextQty = Math.max(1, (current.quantity || 1) + delta)
    try {
      await dispatch(updateCartItem({ itemId, quantity: nextQty })).unwrap()
    } catch (error) {
      console.error('Failed to update quantity:', error)
      alert(`Failed to update quantity: ${error.message || 'Unknown error'}`)
    }
  }

  const removeItem = async (itemId) => {
    try {
      await dispatch(removeCartItem({ itemId })).unwrap()
    } catch (error) {
      console.error('Failed to remove item:', error)
      alert(`Failed to remove item: ${error.message || 'Unknown error'}`)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountPercent = 20;
  const discount = Math.round(subtotal * (discountPercent / 100));
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Cart', path: '/cart' }
  ];

  return (
    <div className="">
      <Container>
        {/* Breadcrumb */}
          <div className="py-4 md:py-6">
          <Breadcrumb category="Cart" />
        </div>

        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 dark:text-white">
          YOUR CART
        </h1>

        {(!token) ? (
          <div className="text-center py-12 md:py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">Please log in to view your cart</p>
            <Link
              to="/login"
              className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Log in
            </Link>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-12 md:py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">Your cart is empty</p>
            <Link
              to="/shop"
              className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-12 md:pb-16">
            {/* Cart Items - Left Side */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="border border-gray-200 dark:border-gray-700 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 space-y-4 md:space-y-6">
                {cartItems.map((item, index) => (
                  <div key={item._id}>
                    <div className="flex gap-3 sm:gap-4 md:gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-gray-100 dark:bg-gray-800 rounded-lg md:rounded-xl overflow-hidden flex items-center justify-center">
                          {item.thumbnail ? (
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null
                                e.target.src = 'https://via.placeholder.com/150?text=No+Image'
                              }}
                            />
                          ) : (
                            <div className="text-gray-400 text-center p-2">
                              <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-xs">No Image</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2 mb-2 md:mb-3">
                          <h3 className="text-sm sm:text-base md:text-lg font-semibold dark:text-white pr-2">
                            {item.title}
                          </h3>
                          <button
                            onClick={() => removeItem(item._id)}
                            className="flex-shrink-0 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>

                        <div className="space-y-1 mb-3 md:mb-4">
                          {item.selectedOptions?.size && (
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                              Size: <span className="text-gray-900 dark:text-gray-200">{item.selectedOptions.size}</span>
                            </p>
                          )}
                          {item.selectedOptions?.color && (
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                              Color: <span className="text-gray-900 dark:text-gray-200">{item.selectedOptions.color}</span>
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <p className="text-lg sm:text-xl md:text-2xl font-bold dark:text-white">
                            ${item.price}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 sm:gap-4 bg-gray-100 dark:bg-gray-800 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                            <button
                              onClick={() => updateQuantity(item._id, -1)}
                              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"
                              aria-label="Decrease quantity"
                            >
                              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="font-medium text-sm sm:text-base min-w-[20px] text-center dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item._id, 1)}
                              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"
                              aria-label="Increase quantity"
                            >
                              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Divider between items */}
                    {index < cartItems.length - 1 && (
                      <hr className="mt-4 md:mt-6 border-gray-200 dark:border-gray-700" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary - Right Side */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 sticky top-24">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 dark:text-white">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-semibold dark:text-white">${subtotal}</span>
                  </div>

                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600 dark:text-gray-400">
                      Discount (-{discountPercent}%)
                    </span>
                    <span className="font-semibold text-red-500">-${discount}</span>
                  </div>

                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600 dark:text-gray-400">Delivery Fee</span>
                    <span className="font-semibold dark:text-white">${deliveryFee}</span>
                  </div>

                  <hr className="border-gray-200 dark:border-gray-700" />

                  <div className="flex justify-between text-base sm:text-lg">
                    <span className="font-semibold dark:text-white">Total</span>
                    <span className="font-bold text-lg sm:text-xl dark:text-white">${total}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2 sm:gap-3">
                    <div className="relative flex-1">
                      <FiTag className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Add promo code"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-100 dark:bg-gray-800 dark:text-white border-0 rounded-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 placeholder:text-gray-400"
                      />
                    </div>
                    <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm sm:text-base whitespace-nowrap">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link 
                  to="/checkout"
                  className="w-full py-3 sm:py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold text-sm sm:text-base hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 group"
                >
                  Go to Checkout
                  <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CartPage;
