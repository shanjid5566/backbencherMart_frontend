import { createAsyncThunk } from '@reduxjs/toolkit'
import apiService from '../../services/apiService'

// Auth API thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await apiService.post('/auth/login', credentials, {
        skipAuth: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
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
      const res = await apiService.post('/auth/register', payload, {
        skipAuth: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return res
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ email, code, otp }, { rejectWithValue }) => {
    try {
      const verificationCode = otp || code
      try {
        const res = await apiService.post(
          '/auth/verify-otp',
          { email, otp: verificationCode },
          {
            skipAuth: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        return res
      } catch (otpErr) {
        const needsCodeField =
          otpErr?.message && otpErr.message.toLowerCase().includes('email and code required')

        if (!needsCodeField) {
          throw otpErr
        }

        const fallbackRes = await apiService.post(
          '/auth/verify-otp',
          { email, code: verificationCode },
          {
            skipAuth: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        return fallbackRes
      }
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
