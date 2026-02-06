import { createAsyncThunk } from '@reduxjs/toolkit'
import apiService from '../../services/apiService'

// Fetch products with pagination
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params = { page: 1, limit: 10 }, { rejectWithValue }) => {
    try {
      // Call the products endpoint with pagination parameters
      const res = await apiService.get('/products', { params })
      // Response shape: { paginated: true, items: [...], meta: { page, limit, totalPages, totalItems } }
      return res
    } catch (err) {
      return rejectWithValue(err?.message || 'Failed to fetch products')
    }
  }
)

// Fetch all products without pagination
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      // Call the products endpoint without pagination parameters to get all products
      const res = await apiService.get('/products')
      // Response shape: { paginated: false, items: [...] }
      return res
    } catch (err) {
      return rejectWithValue(err?.message || 'Failed to fetch all products')
    }
  }
)

export const fetchTopSelling = createAsyncThunk(
  'products/fetchTopSelling',
  async (params = { limit: 4 }, { rejectWithValue }) => {
    try {
      // For now, fetch all products and filter/sort by rating or other criteria
      // You can modify this to use a specific endpoint if available
      const res = await apiService.get('/products', { params })
      // Filter and sort products by rating or sales metrics
      let products = res.items || []
      
      // Sort by average ratings (descending) and limit results
      products = products
        .sort((a, b) => (b.averageRatings || 0) - (a.averageRatings || 0))
        .slice(0, params.limit)
      
      return { items: products }
    } catch (err) {
      return rejectWithValue(err?.message || 'Failed to fetch top selling')
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
