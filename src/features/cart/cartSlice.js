import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiClient from '../../services/apiClient'

const initialState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchCart = createAsyncThunk('cart/fetch', async (_, { getState, rejectWithValue }) => {
  const token = getState().auth?.token || null
  if (!token) return rejectWithValue({ message: 'login_required' })
  try {
    const res = await apiClient.get('/cart')
    return res.data
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: err.message })
  }
})

export const addToCart = createAsyncThunk('cart/add', async (payload, { getState, rejectWithValue }) => {
  const token = getState().auth?.token || null
  if (!token) return rejectWithValue({ message: 'login_required' })
  try {
    const res = await apiClient.post('/cart/items', payload)
    return res.data
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: err.message })
  }
})

export const updateCartItem = createAsyncThunk('cart/updateItem', async ({ itemId, quantity }, { getState, rejectWithValue }) => {
  const token = getState().auth?.token || null
  if (!token) return rejectWithValue({ message: 'login_required' })
  try {
    const res = await apiClient.patch('/cart/items', { itemId, quantity })
    return res.data
  } catch (err) {
    console.error('Update cart item error:', {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message
    })
    return rejectWithValue(err.response?.data || { message: err.message })
  }
})

export const removeCartItem = createAsyncThunk('cart/removeItem', async ({ itemId }, { getState, rejectWithValue }) => {
  const token = getState().auth?.token || null
  if (!token) return rejectWithValue({ message: 'login_required' })
  try {
    const res = await apiClient.delete(`/cart/items/${itemId}`)
    return res.data
  } catch (err) {
    console.error('Delete cart item error:', {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message
    })
    return rejectWithValue(err.response?.data || { message: err.message })
  }
})

export const checkout = createAsyncThunk('cart/checkout', async (paymentData, { getState, rejectWithValue }) => {
  const token = getState().auth?.token || null
  if (!token) return rejectWithValue({ message: 'login_required' })
  try {
    const res = await apiClient.post('/cart/checkout', paymentData)
    return res.data
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: err.message })
  }
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart(state) {
      state.items = []
      state.error = null
      state.loading = false
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCart.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchCart.fulfilled, (state, action) => { state.loading = false; state.items = action.payload.items || action.payload.data?.items || [] })
      .addCase(fetchCart.rejected, (state, action) => { state.loading = false; state.error = action.payload || action.error })

      // addToCart
      .addCase(addToCart.pending, (state) => { state.loading = true; state.error = null })
      .addCase(addToCart.fulfilled, (state, action) => { state.loading = false; state.items = action.payload.items || action.payload.data?.items || state.items })
      .addCase(addToCart.rejected, (state, action) => { state.loading = false; state.error = action.payload || action.error })

      // updateCartItem
      .addCase(updateCartItem.pending, (state) => { state.loading = true; state.error = null })
      .addCase(updateCartItem.fulfilled, (state, action) => { state.loading = false; state.items = action.payload.items || action.payload.data?.items || state.items })
      .addCase(updateCartItem.rejected, (state, action) => { state.loading = false; state.error = action.payload || action.error })

      // removeCartItem
      .addCase(removeCartItem.pending, (state) => { state.loading = true; state.error = null })
      .addCase(removeCartItem.fulfilled, (state, action) => { state.loading = false; state.items = action.payload.items || action.payload.data?.items || state.items })
      .addCase(removeCartItem.rejected, (state, action) => { state.loading = false; state.error = action.payload || action.error })

      // checkout
      .addCase(checkout.pending, (state) => { state.loading = true; state.error = null })
      .addCase(checkout.fulfilled, (state, action) => { state.loading = false; state.items = []; })
      .addCase(checkout.rejected, (state, action) => { state.loading = false; state.error = action.payload || action.error })
  },
})

export const { clearCart } = cartSlice.actions
export default cartSlice.reducer
