import React, { useEffect } from 'react'
import Container from '../../../../components/Container'
import ProductCard from '../../../../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../../../features/products/productsAPI'
import { selectAllProducts } from '../../../../features/products/productsSlice'


const NewArrivals = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectAllProducts)
  const loading = useSelector((state) => state.products.loading)
  const error = useSelector((state) => state.products.error)

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 4 }))
  }, [dispatch])

  const SkeletonCard = () => (
    <div className="animate-pulse">
      <div className="relative w-full aspect-square bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden rounded-sm" />

      <div className="mt-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />

        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            ))}
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12" />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-12" />
        </div>
      </div>
    </div>
  )

  return (
    <section className="w-full pt-12 pb-6 lg:pt-16 lg:pb-8">
      <Container>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">NEW ARRIVALS</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error.message || error}</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((p) => (
              <ProductCard
                key={p._id || p.id}
                image={p.image && p.image.length ? p.image[0] : ''}
                title={p.name || p.title}
                rating={p.averageRatings}
                price={p.price}
                oldPrice={p.oldPrice}
                discount={p.discountPercentage || p.discount}
              />
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button className="px-16 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 cursor-pointer">View All</button>
        </div>
      </Container>
    </section>
  )
}

export default NewArrivals
