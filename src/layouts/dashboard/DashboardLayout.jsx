import React, { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../features/authentication/authSlice'
import { FiUser, FiShoppingBag, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi'

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  
  const user = useSelector((s) => s.auth?.user)
  const token = useSelector((s) => s.auth?.token)

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!token && !localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [token, navigate])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const menuItems = [
    { path: '/dashboard', label: 'Profile', icon: FiUser },
    { path: '/dashboard/orders', label: 'My Orders', icon: FiShoppingBag },
    { path: '/dashboard/settings', label: 'Settings', icon: FiSettings },
  ]

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold dark:text-white">My Account</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {sidebarOpen ? <FiX className="w-6 h-6 dark:text-white" /> : <FiMenu className="w-6 h-6 dark:text-white" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:sticky top-0 left-0 z-40 w-64 h-screen bg-white dark:bg-gray-800 border-r dark:border-gray-700 transition-transform duration-300 ease-in-out lg:mt-0 mt-[73px]`}
      >
        <div className="h-full overflow-y-auto p-6">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={() => setSidebarOpen(false)}
            className="hidden lg:block mb-8 pb-6 border-b dark:border-gray-700"
          >
            <h1 className="text-2xl font-bold dark:text-white hover:opacity-80 transition-opacity">
              SHOP.CO
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-black dark:bg-white text-white dark:text-black font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              )
            })}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <FiLogOut className="w-5 h-5" />
              Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 mt-[73px]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 mt-[73px] lg:mt-0 overflow-y-auto">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
