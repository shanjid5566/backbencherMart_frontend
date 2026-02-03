import React from 'react'
import { Outlet } from 'react-router'
import Announcement from '../../components/Announcement'
import Header from '../../components/Header'
import useThemeEffect from '../../hooks/useThemeEffect'

const HomeLayout = () => {
  // Apply dark class to root element based on Redux state
  useThemeEffect()

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
      <Announcement />
        <Header />
        <main>
          <Outlet />
        </main>
    </div>
  )
}

export default HomeLayout
