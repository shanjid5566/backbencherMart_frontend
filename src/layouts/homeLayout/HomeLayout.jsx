import React from 'react'
import { Outlet } from 'react-router'
import Announcement from '../../components/Announcement'
import Header from '../../components/Header'
import useThemeEffect from '../../hooks/useThemeEffect'
import useSmoothScroll from '../../hooks/useSmoothScroll'
import Footer from '../../components/Footer'

const HomeLayout = () => {
  // Apply dark class to root element based on Redux state
  useThemeEffect()
  
  // Initialize Lenis smooth scrolling
  useSmoothScroll()

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
      <Announcement />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default HomeLayout
