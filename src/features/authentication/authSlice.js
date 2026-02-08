import { createSlice } from '@reduxjs/toolkit'
import { login, register, verifyOtp } from './authAPI'

// Load token and user from localStorage on app initialization
const getInitialAuthState = () => {
  try {
    const token = localStorage.getItem('token')
    const userString = localStorage.getItem('user')
    const user = userString ? JSON.parse(userString) : null
    
    return {
      user,
      token,
      loading: false,
      error: null,
      verifyPendingEmail: null,
    }
  } catch (error) {
    console.error('Error loading auth state from localStorage:', error)
    return {
      user: null,
      token: null,
      loading: false,
      error: null,
      verifyPendingEmail: null,
    }
  }
}

const initialState = getInitialAuthState()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      state.error = null
      state.verifyPendingEmail = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    resetAuthError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        const payload = action.payload || {}
        state.token = payload.token || payload.data?.token || null
        state.user = payload.user || payload.data?.user || null
        if (state.token) localStorage.setItem('token', state.token)
        if (state.user) localStorage.setItem('user', JSON.stringify(state.user))
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error || 'Login failed'
      })

      // register
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        const payload = action.payload || {}
        // backend may return the email that needs verification
        state.verifyPendingEmail = payload.email || payload.pendingEmail || payload.data?.email || null
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error || 'Registration failed'
      })

      // verifyOtp
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        const payload = action.payload || {}
        state.token = payload.token || payload.data?.token || null
        state.user = payload.user || payload.data?.user || null
        state.verifyPendingEmail = null
        if (state.token) localStorage.setItem('token', state.token)
        if (state.user) localStorage.setItem('user', JSON.stringify(state.user))
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error || 'Verification failed'
      })
  },
})

export const { logout, resetAuthError } = authSlice.actions

export default authSlice.reducer
