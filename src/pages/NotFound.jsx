import React from 'react'
import { Link } from 'react-router'
import Container from '../components/Container'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300 flex items-center">
      <Container>
        <div className="py-24 text-center">
          <h1 className="text-5xl font-extrabold dark:text-white mb-4">404</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">Page not found</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">We couldn't find the page you're looking for.</p>

          <div className="flex items-center justify-center gap-4">
            <Link to="/" className="px-6 py-3 bg-black text-white rounded-full">Go home</Link>
            <Link to="/shop" className="px-6 py-3 border border-gray-200 rounded-full text-gray-700 dark:text-gray-200">Browse shop</Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default NotFound
