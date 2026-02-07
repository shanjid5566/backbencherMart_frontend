import React, { useState } from 'react'
import { FiLock, FiMail, FiBell, FiShield, FiTrash2 } from 'react-icons/fi'

const SettingsPage = () => {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [orderUpdates, setOrderUpdates] = useState(true)
  const [promotions, setPromotions] = useState(true)

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    // TODO: Dispatch change password action
    console.log('Changing password...')
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your account preferences and security
        </p>
      </div>

      <div className="space-y-8">
        {/* Change Password */}
        <section className="border-b dark:border-gray-700 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <FiLock className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold dark:text-white">Change Password</h2>
          </div>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                required
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Update Password
            </button>
          </form>
        </section>


        {/* Danger Zone */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <FiTrash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">Danger Zone</h2>
          </div>

          <div className="p-4 border-2 border-red-200 dark:border-red-900/50 rounded-lg">
            <h3 className="font-semibold text-red-900 dark:text-red-400 mb-2">
              Delete Account
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
              Delete My Account
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SettingsPage
