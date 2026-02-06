# Redux Products API Integration Guide

This guide explains how to use Redux to fetch products from your e-commerce API.

## Available Redux Actions

### 1. `fetchProducts(params)`
Fetches paginated products from `/products` endpoint.

```javascript
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../features/products/productsAPI';

const dispatch = useDispatch();

// Fetch first page with 10 items
dispatch(fetchProducts({ page: 1, limit: 10 }));

// Fetch specific page
dispatch(fetchProducts({ page: 2, limit: 20 }));
```

### 2. `fetchAllProducts()`
Fetches all products without pagination from `/products` endpoint.

```javascript
import { fetchAllProducts } from '../features/products/productsAPI';

// Fetch all products
dispatch(fetchAllProducts());
```

### 3. `fetchTopSelling(params)`
Fetches top selling products (sorted by ratings).

```javascript
import { fetchTopSelling } from '../features/products/productsAPI';

// Fetch top 4 products
dispatch(fetchTopSelling({ limit: 4 }));
```

## Available Selectors

```javascript
import { useSelector } from 'react-redux';
import {
  selectProducts,
  selectAllProducts,
  selectProductsMeta,
  selectProductsLoading,
  selectAllProductsLoading,
  selectTopSellingProducts,
  selectTopSellingLoading,
  selectProductsError
} from '../features/products/productsSlice';

// In your component
const products = useSelector(selectProducts); // Paginated products
const allProducts = useSelector(selectAllProducts); // All products
const meta = useSelector(selectProductsMeta); // Pagination info
const loading = useSelector(selectProductsLoading);
const topSelling = useSelector(selectTopSellingProducts);
```

## API Response Structure

### Paginated Response
```javascript
{
  "paginated": true,
  "items": [...products],
  "meta": {
    "page": 1,
    "limit": 10,
    "totalPages": 8,
    "totalItems": 75
  }
}
```

### Non-paginated Response
```javascript
{
  "paginated": false,
  "items": [...all products]
}
```

## Product Object Structure

Each product in the `items` array has this structure:

```javascript
{
  "_id": "product-id",
  "name": "Product Name",
  "price": 1200,
  "oldPrice": 1500,
  "discountPercentage": 20,
  "category": "Category Name",
  "dressStyle": "Casual",
  "image": ["image-url1", "image-url2"],
  "colors": ["Black", "White"],
  "sizes": ["S", "M", "L"],
  "inStock": true,
  "description": "Product description",
  "stock": 100,
  "averageRatings": 4.5,
  "totalReviews": 10
}
```

## Usage Examples

### 1. Basic Product List Component

```javascript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsAPI';
import { selectProducts, selectProductsLoading } from '../features/products/productsSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 12 }));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <div key={product._id} className="border p-4">
          <img src={product.image[0]} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};
```

### 2. Pagination Component

```javascript
const PaginationExample = () => {
  const dispatch = useDispatch();
  const meta = useSelector(selectProductsMeta);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(fetchProducts({ page, limit: 10 }));
  };

  if (!meta) return null;

  return (
    <div className="flex gap-2">
      <button 
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </button>
      
      <span>Page {meta.page} of {meta.totalPages}</span>
      
      <button 
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= meta.totalPages}
      >
        Next
      </button>
    </div>
  );
};
```

### 3. Search/Filter Component

```javascript
const ProductSearch = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useState({ page: 1, limit: 10 });

  const handleSearch = () => {
    dispatch(fetchProducts(searchParams));
  };

  return (
    <div>
      {/* Add filters and search inputs here */}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};
```

## Error Handling

```javascript
const ProductsWithError = () => {
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product._id}>{product.name}</div>
      ))}
    </div>
  );
};
```

## Tips

1. **Performance**: Use pagination for better performance with large product catalogs
2. **Caching**: Redux Toolkit automatically caches results
3. **Loading States**: Always handle loading and error states in your UI
4. **Filters**: You can extend the API calls to include search/filter parameters
5. **Real-time Updates**: Dispatch actions when products need to be refreshed

## Environment Setup

Make sure your `.env` file has the correct API base URL:

```
VITE_API_BASE_URL=http://your-api-domain.com/api
```

The API client will automatically use this base URL for all product requests.