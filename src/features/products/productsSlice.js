import { createSlice } from '@reduxjs/toolkit'
import { fetchProducts, fetchAllProducts, deleteProducts, fetchTopSelling } from './productsAPI'

const initialState = {
  list: [],
  allProducts: [],
  meta: null,
  success: null,
  error: null,
  loading: false,
  allProductsLoading: false,
  allProductsError: null,
  topSellingList: [],
  topSellingLoading: false,
  topSellingError: null,
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

      // Fetch all products
      .addCase(fetchAllProducts.pending, (state) => {
        state.allProductsLoading = true
        state.allProductsError = null
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.allProductsLoading = false
        state.allProductsError = null
        state.allProducts = action.payload?.items || []
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.allProductsLoading = false
        state.allProductsError = action.payload || 'Failed to fetch all products'
      })

      // Top selling
      .addCase(fetchTopSelling.pending, (state) => {
        state.topSellingLoading = true
        state.topSellingError = null
      })
      .addCase(fetchTopSelling.fulfilled, (state, action) => {
        state.topSellingLoading = false
        // payload expected: { items: [...] }
        state.topSellingList = action.payload?.items || []
      })
      .addCase(fetchTopSelling.rejected, (state, action) => {
        state.topSellingLoading = false
        state.topSellingError = action.payload || 'Failed to fetch top selling products'
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
export const selectProducts = (state) => state.products.list
export const selectAllProducts = (state) => state.products.allProducts
export const selectProductsMeta = (state) => state.products.meta
export const selectProductsLoading = (state) => state.products.loading
export const selectAllProductsLoading = (state) => state.products.allProductsLoading
export const selectTopSellingProducts = (state) => state.products.topSellingList
export const selectTopSellingLoading = (state) => state.products.topSellingLoading
export const selectProductsError = (state) => state.products.error
export default productsSlice.reducer
