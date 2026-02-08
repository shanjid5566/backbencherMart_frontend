import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchUserProfile, updateUserProfile } from '../../features/user/userSlice'
import { FiEdit2, FiMail, FiPhone, FiMapPin, FiUser, FiLoader } from 'react-icons/fi'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const profile = useSelector((s) => s.user?.profile)
  const statistics = useSelector((s) => s.user?.statistics)
  const profileLoading = useSelector((s) => s.user?.profileLoading)
  const loading = useSelector((s) => s.user?.loading)

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: {
      label: 'Home',
      line1: '',
      line2: '',
      city: '',
      state: '',
      postalCode: '',
      phone: ''
    }
  })

  useEffect(() => {
    dispatch(fetchUserProfile())
  }, [dispatch])

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        address: profile.addresses?.[0] || {
          label: 'Home',
          line1: '',
          line2: '',
          city: '',
          state: '',
          postalCode: '',
          phone: ''
        }
      })
    }
  }, [profile])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]
      setFormData({
        ...formData,
        address: { ...formData.address, [addressField]: value }
      })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(updateUserProfile(formData)).unwrap()
      toast.success('Profile updated successfully!')
      setIsEditing(false)
    } catch (error) {
      toast.error(error || 'Failed to update profile')
    }
  }

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FiLoader className="w-8 h-8 animate-spin dark:text-white" />
      </div>
    )
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
      <div className="mb-8 pb-8 border-b dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Account Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
            <p className="text-2xl font-bold dark:text-white mt-1">
              {statistics?.totalOrders || 0}
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
            <p className="text-2xl font-bold dark:text-white mt-1">
              ${statistics?.totalSpent || '0.00'}
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
            <p className="text-2xl font-bold dark:text-white mt-1">
              {statistics?.memberSince || new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>

      <div className="dark:border-gray-700 pt-6">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
            </div>

            <div className="border-t dark:border-gray-600 pt-6">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Address Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    name="address.line1"
                    value={formData.address.line1}
                    onChange={handleChange}
                    placeholder="Street address"
                    className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    name="address.line2"
                    value={formData.address.line2}
                    onChange={handleChange}
                    placeholder="Apartment, suite, etc."
                    className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                      City
                    </label>
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                      State
                    </label>
                    <input
                      type="text"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="address.postalCode"
                      value={formData.address.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="address.phone"
                    value={formData.address.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXX-XXXXXX"
                    className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading && <FiLoader className="w-4 h-4 animate-spin" />}
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                disabled={loading}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
                  {profile?.firstName && profile?.lastName
                    ? `${profile.firstName} ${profile.lastName}`
                    : 'Not provided'}
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
                  {profile?.email || 'Not provided'}
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
                  {profile?.addresses?.[0]?.phone || 'Not provided'}
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
                  {profile?.addresses?.[0]
                    ? `${profile.addresses[0].line1}${
                        profile.addresses[0].line2 ? ', ' + profile.addresses[0].line2 : ''
                      }, ${profile.addresses[0].city}, ${profile.addresses[0].state} ${
                        profile.addresses[0].postalCode
                      }`
                    : 'Not provided'}
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
