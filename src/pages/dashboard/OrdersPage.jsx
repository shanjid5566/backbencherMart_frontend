import React, { useState } from 'react'
import { FiPackage, FiTruck, FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi'

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState('all')

  // Demo orders - replace with actual data from backend
  const [orders] = useState([
    {
      id: 'ORD-001',
      date: '2026-02-05',
      status: 'delivered',
      total: 145.00,
      items: 2,
      products: ['Gradient Graphic T-shirt', 'Checkered Shirt']
    },
    {
      id: 'ORD-002',
      date: '2026-02-03',
      status: 'shipped',
      total: 240.00,
      items: 1,
      products: ['Skinny Fit Jeans']
    },
    {
      id: 'ORD-003',
      date: '2026-01-28',
      status: 'processing',
      total: 320.00,
      items: 3,
      products: ['T-shirt', 'Jeans', 'Sneakers']
    },
    {
      id: 'ORD-004',
      date: '2026-01-20',
      status: 'cancelled',
      total: 89.00,
      items: 1,
      products: ['Baseball Cap']
    },
    {
      id: 'ORD-005',
      date: '2026-01-15',
      status: 'delivered',
      total: 199.00,
      items: 2,
      products: ['Hoodie', 'Track Pants']
    }
  ])

  const tabs = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length },
    { id: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
    { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length }
  ]

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab)

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FiCheckCircle className="w-5 h-5 text-green-500" />
      case 'shipped':
        return <FiTruck className="w-5 h-5 text-blue-500" />
      case 'processing':
        return <FiClock className="w-5 h-5 text-yellow-500" />
      case 'cancelled':
        return <FiXCircle className="w-5 h-5 text-red-500" />
      default:
        return <FiPackage className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'shipped':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'processing':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'cancelled':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold dark:text-white">My Orders</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Track and manage your orders
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b dark:border-gray-700">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-black dark:border-white text-black dark:text-white'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <FiPackage className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {activeTab === 'all' ? 'No orders yet' : `No ${activeTab} orders`}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {activeTab === 'all' 
              ? 'Start shopping to see your orders here'
              : `You don't have any ${activeTab} orders at the moment.`
            }
          </p>
          {activeTab === 'all' && (
            <a
              href="/shop"
              className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Browse Products
            </a>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border dark:border-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <h3 className="font-semibold text-lg dark:text-white">
                      Order {order.id}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Placed on {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="border-t dark:border-gray-700 pt-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {order.items} {order.items === 1 ? 'item' : 'items'}
                    </p>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      {order.products.map((product, idx) => (
                        <span key={idx}>
                          {product}
                          {idx < order.products.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total</p>
                    <p className="text-2xl font-bold dark:text-white">${order.total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white">
                    View Details
                  </button>
                  {order.status === 'delivered' && (
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrdersPage
