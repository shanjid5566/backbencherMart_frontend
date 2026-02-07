import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FiEdit2, FiMail, FiPhone, FiMapPin, FiUser } from 'react-icons/fi'

const ProfilePage = () => {
  const user = useSelector((s) => s.auth?.user)
  const [isEditing, setIsEditing] = useState(false)

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Dispatch update profile action
    setIsEditing(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold dark:text-white">My Profile</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your personal information
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          <FiEdit2 className="w-4 h-4" />
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

            {/* Account Stats */}
      <div className="mt-8 pt-8 border-t dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Account Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
            <p className="text-2xl font-bold dark:text-white mt-1">0</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
            <p className="text-2xl font-bold dark:text-white mt-1">$0.00</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
            <p className="text-2xl font-bold dark:text-white mt-1">
              {user?.createdAt ? new Date(user.createdAt).getFullYear() : '2026'}
            </p>
          </div>
        </div>
      </div>

      <div className=" dark:border-gray-700 pt-6">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+880 1XXX-XXXXXX"
                className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                placeholder="Enter your full address"
                className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <FiUser className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                <p className="text-lg font-medium dark:text-white mt-1">
                  {user?.name || 'Not provided'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <FiMail className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                <p className="text-lg font-medium dark:text-white mt-1">
                  {user?.email || 'Not provided'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <FiPhone className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                <p className="text-lg font-medium dark:text-white mt-1">
                  {user?.phone || 'Not provided'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <FiMapPin className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                <p className="text-lg font-medium dark:text-white mt-1">
                  {user?.address || 'Not provided'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>


    </div>
  )
}

export default ProfilePage
