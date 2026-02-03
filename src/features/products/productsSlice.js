import { createSlice } from '@reduxjs/toolkit'
import { fetchProducts, deleteProducts } from './productsAPI'

const initialState = {
  list: [],
  success: null,
  error: null,
  loading: false,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProductsError: (state) => {
      state.error = null
    },
    resetProducts: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        // backend may return `items` or `products` depending on contract
        state.list = action.payload?.items || action.payload?.products || []
        // optionally keep pagination meta
        if (action.payload?.meta) state.meta = action.payload.meta
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload || 'Failed to fetch products'
      })

      .addCase(deleteProducts.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = null
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.loading = false
        state.success = action.payload?.success ?? true
        state.error = null
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload || 'Failed to delete products'
      })
  },
})

export const { resetProductsError, resetProducts } = productsSlice.actions

// Selectors
export const selectAllProducts = (state) => state.products.list
export default productsSlice.reducer
