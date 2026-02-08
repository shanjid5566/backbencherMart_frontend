import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../../services/userService'

// Async thunks
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const data = await userService.getProfile()
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const data = await userService.updateProfile(profileData)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

export const fetchUserOrders = createAsyncThunk(
  'user/fetchOrders',
  async (status = 'all', { rejectWithValue }) => {
    try {
      const data = await userService.getOrders(status)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const data = await userService.changePassword(passwordData)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

export const deleteAccount = createAsyncThunk(
  'user/deleteAccount',
  async (password, { rejectWithValue }) => {
    try {
      const data = await userService.deleteAccount(password)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

const initialState = {
  profile: null,
  statistics: null,
  orders: [],
  ordersCount: 0,
  loading: false,
  error: null,
  profileLoading: false,
  ordersLoading: false,
  passwordLoading: false,
  deleteLoading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearUserData: (state) => {
      state.profile = null
      state.statistics = null
      state.orders = []
      state.ordersCount = 0
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.profileLoading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profileLoading = false
        state.profile = action.payload.user
        state.statistics = action.payload.statistics
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.profileLoading = false
        state.error = action.payload
      })

      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload.user
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Fetch Orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.ordersLoading = true
        state.error = null
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.ordersLoading = false
        state.orders = action.payload.orders
        state.ordersCount = action.payload.count
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.ordersLoading = false
        state.error = action.payload
      })

      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.passwordLoading = true
        state.error = null
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.passwordLoading = false
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.passwordLoading = false
        state.error = action.payload
      })

      // Delete Account
      .addCase(deleteAccount.pending, (state) => {
        state.deleteLoading = true
        state.error = null
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.deleteLoading = false
        state.profile = null
        state.statistics = null
        state.orders = []
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.deleteLoading = false
        state.error = action.payload
      })
  }
})

export const { clearError, clearUserData } = userSlice.actions
export default userSlice.reducer
