import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { FiSliders, FiChevronDown } from 'react-icons/fi';
import Container from '../../components/Container';
import Breadcrumb from '../../components/Breadcrumb';
import FilterSidebar from '../../components/FilterSidebar';
import CatalogProductCard from '../../components/CatalogProductCard';
import { dressStyles } from '../../data/catalogData';
import { fetchProducts } from '../../features/products/productsAPI';
import {
  selectProducts,
  selectProductsMeta,
  selectProductsLoading,
  selectProductsError
} from '../../features/products/productsSlice';

// Map sidebar filter IDs to API query parameter values
const CATEGORY_MAP = {
  't-shirts': 'T-Shirts',
  'shorts': 'Shorts',
  'shirts': 'Shirts',
  'hoodie': 'Hoodies',
  'jeans': 'Jeans'
};

const COLOR_MAP = {
  'green': 'Green',
  'red': 'Red',
  'yellow': 'Yellow',
  'orange': 'Orange',
  'cyan': 'Cyan',
  'blue': 'Blue',
  'purple': 'Purple',
  'pink': 'Pink',
  'white': 'White',
  'black': 'Black'
};

const SIZE_MAP = {
  'xx-small': 'XXS',
  'x-small': 'XS',
  'small': 'S',
  'medium': 'M',
  'large': 'L',
  'x-large': 'XL',
  'xx-large': 'XXL',
  '3x-large': '3XL',
  '4x-large': '4XL'
};

const ProductsPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  
  // Redux selectors
  const products = useSelector(selectProducts);
  const meta = useSelector(selectProductsMeta);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('most-popular');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filters state used by the FilterSidebar UI
  const [filters, setFilters] = useState({
    category: category || null,
    priceRange: { min: 0, max: 20000 },
    colors: [],
    sizes: [],
    style: null
  });

  // Applied filters — these are what actually get sent to the API
  const [appliedFilters, setAppliedFilters] = useState({
    category: category || null,
    style: null,
    colors: [],
    sizes: [],
    priceRange: { min: 0, max: 20000 }
  });

  // Check if any client-side filters are active (colors, sizes, price)
  const hasClientFilters = (
    (appliedFilters.colors && appliedFilters.colors.length > 0) ||
    (appliedFilters.sizes && appliedFilters.sizes.length > 0) ||
    (appliedFilters.priceRange && (
      appliedFilters.priceRange.min > 0 ||
      appliedFilters.priceRange.max < 20000
    ))
  );

  // Fetch products when page, appliedFilters, or sortBy changes
  useEffect(() => {
    const params = {};

    // Server-side filters — category & dressStyle
    if (appliedFilters.category) {
      params.category = CATEGORY_MAP[appliedFilters.category] || appliedFilters.category;
    }
    if (appliedFilters.style) {
      params.dressStyle = appliedFilters.style.charAt(0).toUpperCase() + appliedFilters.style.slice(1);
    }

    // Sorting (always server-side)
    if (sortBy === 'price-low') params.sort = 'price';
    else if (sortBy === 'price-high') params.sort = '-price';
    else if (sortBy === 'rating') params.sort = '-averageRatings';

    // If client-side filters are active, fetch ALL products (high limit)
    // so we can filter the full set client-side
    if (hasClientFilters) {
      params.limit = 1000; // large enough to get all products
      dispatch(fetchProducts(params));
    } else {
      // No client-side filters — use server-side pagination
      params.page = currentPage;
      params.limit = itemsPerPage;
      dispatch(fetchProducts(params));
    }
  }, [dispatch, currentPage, appliedFilters, sortBy, hasClientFilters]);

  // Handle URL category param changes
  useEffect(() => {
    if (category) {
      // Determine whether the route param refers to a dress style or a category
      React.startTransition(() => {
        const isStyle = dressStyles.some(d => d.id === category);

        if (isStyle) {
          // route is a dress style (casual/formal/party/gym)
          setFilters(prev => ({ ...prev, style: category, category: null }));
          setAppliedFilters(prev => ({ ...prev, style: category, category: null }));
        } else {
          // treat as category slug; try to map or fall back to capitalized string
          const mapped = CATEGORY_MAP[category];
          const fallback = category.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
          setFilters(prev => ({ ...prev, category }));
          setAppliedFilters(prev => ({ ...prev, category: mapped || fallback, style: null }));
        }

        setCurrentPage(1);
      });
    }
  }, [category]);

  // Ref to accumulate filter changes from applyFilters() which calls onFilterChange 5 times
  const pendingRef = React.useRef({});

  const handleFilterChange = (key, value) => {
    // Accumulate each key/value into the ref
    pendingRef.current[key] = value;

    // applyFilters() calls: category → colors → sizes → style → priceRange
    // priceRange is always the LAST call, so we apply everything at that point
    if (key === 'priceRange') {
      const batch = { ...pendingRef.current };
      pendingRef.current = {};

      // Update sidebar UI filters
      setFilters(prev => ({ ...prev, ...batch }));

      // Update applied filters — send ALL to the API
      setAppliedFilters({
        category: batch.category ?? null,
        style: batch.style ?? null,
        colors: batch.colors ?? [],
        sizes: batch.sizes ?? [],
        priceRange: batch.priceRange ?? { min: 0, max: 20000 },
      });

      setCurrentPage(1);
    }
  };

  // Client-side filtering for colors, sizes, and price (API doesn't support these)
  const filteredProducts = React.useMemo(() => {
    if (!hasClientFilters) return products;

    return products.filter(product => {
      // Color filter — map sidebar IDs to API color names and check
      if (appliedFilters.colors && appliedFilters.colors.length > 0) {
        const apiColors = appliedFilters.colors.map(c => (COLOR_MAP[c] || c).toLowerCase());
        const productColors = (product.colors || []).map(c => c.toLowerCase());
        const colorMatch = apiColors.some(c => productColors.includes(c));
        if (!colorMatch) return false;
      }

      // Size filter — map sidebar IDs to API size abbreviations and check
      if (appliedFilters.sizes && appliedFilters.sizes.length > 0) {
        const apiSizes = appliedFilters.sizes.map(s => (SIZE_MAP[s] || s).toUpperCase());
        const productSizes = (product.sizes || []).map(s => s.toUpperCase());
        const sizeMatch = apiSizes.some(s => productSizes.includes(s));
        if (!sizeMatch) return false;
      }

      // Price filter
      if (appliedFilters.priceRange) {
        if (appliedFilters.priceRange.min > 0 && product.price < appliedFilters.priceRange.min) return false;
        if (appliedFilters.priceRange.max < 20000 && product.price > appliedFilters.priceRange.max) return false;
      }

      return true;
    });
  }, [products, appliedFilters, hasClientFilters]);

  // Pagination: client-side when filters active, server-side otherwise
  const totalFilteredItems = filteredProducts.length;
  const totalPages = hasClientFilters
    ? Math.ceil(totalFilteredItems / itemsPerPage) || 1
    : (meta?.totalPages || 1);
  const totalItems = hasClientFilters
    ? totalFilteredItems
    : (meta?.totalItems || products.length);
  const paginatedProducts = hasClientFilters
    ? filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : filteredProducts;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Retry fetch on error
  const handleRetry = () => {
    dispatch(fetchProducts({ page: currentPage, limit: itemsPerPage }));
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
      <Container>
        <div className="py-6">
          <Breadcrumb category={filters.category} />

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex justify-center items-center py-12">
              <div className="text-red-600 dark:text-red-400 text-center">
                <p className="text-lg font-semibold mb-2">Error loading products</p>
                <p>{error}</p>
                <button 
                  onClick={handleRetry}
                  className="mt-4 px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Main Content */}
          {!loading && !error && (
            <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar - Desktop */}
            <div className="hidden lg:block lg:w-96 flex-shrink-0 lg:sticky lg:top-30 lg:self-start">
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <FilterSidebar filters={filters} onFilterChange={handleFilterChange} isMobile={false} />
              </div>
            </div>

            {/* Filters Sidebar - Mobile Drawer */}
            <div
              className={`lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
                showFilters ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              onClick={() => setShowFilters(false)}
            >
              <div
                className={`absolute left-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-dark-surface shadow-2xl transition-transform duration-300 flex flex-col ${
                  showFilters ? 'translate-x-0' : '-translate-x-full'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex-1 overflow-y-auto p-6">
                  <FilterSidebar 
                    filters={filters} 
                    onFilterChange={handleFilterChange}
                    onClose={() => setShowFilters(false)}
                    isMobile={true}
                  />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold capitalize dark:text-white mb-1">
                    {filters.style || filters.category || 'All Products'}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {totalItems > 0
                      ? `Showing ${((currentPage - 1) * itemsPerPage) + 1}-${Math.min(currentPage * itemsPerPage, totalItems)} of ${totalItems} Products`
                      : `Showing 0 Products`}
                  </p>
                </div>
                
                {/* Mobile Filter Icon */}
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Open filters"
                >
                  <FiSliders className="w-5 h-5 dark:text-white" />
                </button>
              </div>

              {/* Desktop Sort */}
              <div className="hidden sm:flex items-center justify-end gap-4 mb-6">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none px-4 py-2 pr-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white"
                  >
                    <option value="most-popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none dark:text-white" />
                </div>
              </div>

              {/* Products Grid */}
              {paginatedProducts.length === 0 ? (
                <div className="min-h-[240px] flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 p-8 mb-8">
                  <p className="text-lg font-semibold dark:text-white mb-2">No products found</p>
                  <p className="text-sm text-gray-400 mb-4">Try removing some filters or clear all filters to see more products.</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        // clear filters
                        const defaults = { category: category || null, priceRange: { min: 0, max: 20000 }, colors: [], sizes: [], style: null };
                        setFilters(defaults);
                        setAppliedFilters({ category: defaults.category, style: null, colors: [], sizes: [], priceRange: defaults.priceRange });
                        setCurrentPage(1);
                      }}
                      className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800"
                    >
                      Clear filters
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-8 mb-8">
                  {paginatedProducts.map((product) => (
                    <CatalogProductCard 
                      key={product._id} 
                      product={{
                        id: product._id,
                        name: product.name,
                        price: product.price,
                        oldPrice: product.oldPrice,
                        discount: product.discountPercentage,
                        image: product.image[0],
                        rating: product.averageRatings || 0,
                        reviews: product.totalReviews || 0,
                        category: product.category,
                        colors: product.colors,
                        sizes: product.sizes,
                        inStock: product.inStock,
                        description: product.description
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="dark:text-white">← Previous</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {renderPagination().map((page, index) => (
                      <button
                        key={index}
                        onClick={() => typeof page === 'number' && handlePageChange(page)}
                        disabled={page === '...'}
                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                          page === currentPage
                            ? 'bg-black text-white dark:bg-white dark:text-black'
                            : page === '...'
                            ? 'cursor-default dark:text-gray-400'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="dark:text-white">Next →</span>
                  </button>
                </div>
              )}
            </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProductsPage;
