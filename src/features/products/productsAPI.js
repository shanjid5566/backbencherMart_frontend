// ============================================
// BACKEND DISABLED - UNCOMMENT WHEN BACKEND IS READY
// ============================================

import { createAsyncThunk } from '@reduxjs/toolkit'
import apiService from '../../services/apiService'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params = { page: 1, limit: 4 }, { rejectWithValue }) => {
    try {
      // Call the backend products endpoint. Adjust path if your backend differs.
      const res = await apiService.get('/products', { params })
      // Expecting response shape: { paginated: true, items: [...], meta: {...} }
      return res
    } catch (err) {
      return rejectWithValue(err || err.message || 'Failed to fetch products')
    }
  }
)

export const deleteProducts = createAsyncThunk(
  'products/deleteProducts',
  async (_, { rejectWithValue }) => {
    try {
      // Returning mock response - Replace with actual API call
      return { success: false, message: 'Backend not connected' }

      // Uncomment below when backend is ready:
      // const response = await DELETE(ROUTES_CONFIG.public.PRODUCTS)
      // return response
    // eslint-disable-next-line no-unreachable
    } catch (err) {
      // return rejectWithValue(handleApiError(err))
      return rejectWithValue(err.message || 'Failed to delete products')
    }
  }
)
