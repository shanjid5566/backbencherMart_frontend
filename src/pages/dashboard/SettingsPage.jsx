import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { changePassword, deleteAccount } from '../../features/user/userSlice'
import { logout } from '../../features/authentication/authSlice'
import { FiLock, FiTrash2, FiLoader } from 'react-icons/fi'

const SettingsPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const passwordLoading = useSelector((s) => s.user?.passwordLoading)
  const deleteLoading = useSelector((s) => s.user?.deleteLoading)

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New password and confirm password do not match')
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters')
      return
    }

    try {
      await dispatch(changePassword(passwordData)).unwrap()
      toast.success('Password changed successfully!')
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (error) {
      toast.error(error || 'Failed to change password')
    }
  }

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast.error('Please enter your password to confirm')
      return
    }

    try {
      await dispatch(deleteAccount(deletePassword)).unwrap()
      toast.success('Account deleted successfully')
      dispatch(logout())
      navigate('/login')
    } catch (error) {
      toast.error(error || 'Failed to delete account')
    }
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
              disabled={passwordLoading}
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {passwordLoading && <FiLoader className="w-4 h-4 animate-spin" />}
              {passwordLoading ? 'Updating...' : 'Update Password'}
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
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Delete My Account
            </button>
          </div>
        </section>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
              Delete Account
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
            </p>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                Enter your password to confirm
              </label>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="Your password"
                className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteAccount}
                disabled={deleteLoading || !deletePassword}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {deleteLoading && <FiLoader className="w-4 h-4 animate-spin" />}
                {deleteLoading ? 'Deleting...' : 'Yes, Delete My Account'}
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setDeletePassword('')
                }}
                disabled={deleteLoading}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SettingsPage
