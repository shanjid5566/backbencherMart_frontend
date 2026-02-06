import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProducts,
  fetchAllProducts,
  fetchTopSelling
} from '../features/products/productsAPI'
import {
  selectProducts,
  selectAllProducts,
  selectProductsMeta,
  selectProductsLoading,
  selectAllProductsLoading,
  selectTopSellingProducts,
  selectTopSellingLoading,
  selectProductsError
} from '../features/products/productsSlice'

const ProductsExample = () => {
  const dispatch = useDispatch()
  
  // Selectors
  const products = useSelector(selectProducts)
  const allProducts = useSelector(selectAllProducts)
  const meta = useSelector(selectProductsMeta)
  const loading = useSelector(selectProductsLoading)
  const allProductsLoading = useSelector(selectAllProductsLoading)
  const topSellingProducts = useSelector(selectTopSellingProducts)
  const topSellingLoading = useSelector(selectTopSellingLoading)
  const error = useSelector(selectProductsError)

  useEffect(() => {
    // Fetch paginated products (page 1, limit 10)
    dispatch(fetchProducts({ page: 1, limit: 10 }))
    
    // Fetch all products
    dispatch(fetchAllProducts())
    
    // Fetch top selling products
    dispatch(fetchTopSelling({ limit: 4 }))
  }, [dispatch])

  const loadMoreProducts = () => {
    if (meta && meta.page < meta.totalPages) {
      dispatch(fetchProducts({ page: meta.page + 1, limit: 10 }))
    }
  }

  const handlePageChange = (page) => {
    dispatch(fetchProducts({ page, limit: 10 }))
  }

  if (loading || allProductsLoading || topSellingLoading) {
    return <div className="text-center py-8">Loading products...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      
      {/* Top Selling Products Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Top Selling Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topSellingProducts.map((product) => (
            <div key={product._id} className="border rounded-lg p-4 shadow-md">
              <img 
                src={product.image[0]} 
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xl font-bold">${product.price}</span>
                {product.oldPrice && (
                  <span className="text-gray-500 line-through">${product.oldPrice}</span>
                )}
              </div>
              {product.discountPercentage > 0 && (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                  {product.discountPercentage}% OFF
                </span>
              )}
              <div className="mt-2 text-sm text-gray-600">
                Rating: {product.averageRatings}/5 ({product.totalReviews} reviews)
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Paginated Products Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">All Products (Paginated)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border rounded-lg p-4 shadow-md">
              <img 
                src={product.image[0]} 
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xl font-bold">${product.price}</span>
                {product.oldPrice && (
                  <span className="text-gray-500 line-through">${product.oldPrice}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {product.colors.map((color) => (
                  <span key={color} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {color}
                  </span>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                Sizes: {product.sizes.join(', ')}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Stock: {product.stock} | Category: {product.category}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {meta && (
          <div className="mt-8 flex justify-center items-center space-x-4">
            <button
              onClick={() => handlePageChange(meta.page - 1)}
              disabled={meta.page <= 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {meta.page} of {meta.totalPages} ({meta.totalItems} total items)
            </span>
            <button
              onClick={() => handlePageChange(meta.page + 1)}
              disabled={meta.page >= meta.totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* All Products Count */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Total Products Available: {allProducts.length}
        </h2>
      </section>
    </div>
  )
}

export default ProductsExample