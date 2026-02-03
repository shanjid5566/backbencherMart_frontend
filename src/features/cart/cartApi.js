import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => 'cart',
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation({
      query: (item) => ({ url: 'cart', method: 'POST', body: item }),
      invalidatesTags: ['Cart'],
    }),
    removeFromCart: builder.mutation({
      query: (id) => ({ url: `cart/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Cart'],
    }),
  }),
})

export const { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation } = cartApi
