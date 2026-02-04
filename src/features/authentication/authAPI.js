import { createAsyncThunk } from '@reduxjs/toolkit'
import apiService from '../../services/apiService'

// Auth API thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await apiService.post('/auth/login', credentials)
      return res
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await apiService.post('/auth/register', payload)
      return res
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const res = await apiService.post('/auth/verify-otp', { email, code })
      return res
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export default {
  login,
  register,
  verifyOtp,
}
