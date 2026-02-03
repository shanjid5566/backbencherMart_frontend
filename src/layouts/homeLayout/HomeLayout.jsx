import React from 'react'
import { Outlet } from 'react-router'
import Announcement from '../../components/Announcement'
import Header from '../../components/Header'

const HomeLayout = () => {
  return (
    <div className="min-h-screen">
      <Announcement />
        <Header />
        <main>
          <Outlet />
        </main>
    </div>
  )
}

export default HomeLayout
