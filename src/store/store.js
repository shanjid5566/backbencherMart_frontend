import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from '../features/api/apiSlice'
import { cartApi } from '../features/cart/cartApi'
import cartReducer from '../features/cart/cartSlice'
import productsReducer from '../features/products/productsSlice'
import themeReducer from '../features/theme/themeSlice'
import authReducer from '../features/authentication/authSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    products: productsReducer,
    cart: cartReducer,
    theme: themeReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, cartApi.middleware),
})

setupListeners(store.dispatch)

export default store
