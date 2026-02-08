import React from 'react'
import Container from '../../components/Container'
import useThemeEffect from '../../hooks/useThemeEffect'

export default function AuthLayout({ children }) {
  // Apply theme effect
  useThemeEffect()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-dark-surface flex items-center">
      <Container>
        <div className="max-w-xl mx-auto w-full py-12">
          <div className="bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 rounded-2xl shadow-lg p-6 sm:p-10">
            {children}
          </div>
        </div>
      </Container>
    </div>
  )
}
