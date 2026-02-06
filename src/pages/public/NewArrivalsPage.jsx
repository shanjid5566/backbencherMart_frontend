import React, { useEffect } from 'react'
import Container from '../../components/Container'
import ProductCard from '../../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../features/products/productsAPI'
import { selectProducts, selectProductsLoading, selectProductsError } from '../../features/products/productsSlice'
import { useNavigate } from 'react-router'

const NewArrivalsPage = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const loading = useSelector(selectProductsLoading)
  const error = useSelector(selectProductsError)

  useEffect(() => {
    // Try to request newest products first. If API supports sort by createdAt use it.
    dispatch(fetchProducts({ page: 1, limit: 15, sort: '-createdAt' }))
  }, [dispatch])

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
      <Container>
        <div className="py-8">
          <h1 className="text-3xl font-extrabold mb-6">New Arrivals</h1>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-md" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-red-500">{error.message || String(error)}</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {products.map((p) => (
                <ProductCard
                  key={p._id || p.id}
                  image={p.image && p.image.length ? p.image[0] : (p.images && p.images[0]) || ''}
                  title={p.name || p.title}
                  rating={p.averageRatings}
                  price={p.price}
                  oldPrice={p.oldPrice}
                  discount={p.discountPercentage || p.discount}
                  onClick={() => navigate(`/product/${p._id || p.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default NewArrivalsPage
