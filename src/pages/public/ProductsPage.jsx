import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { FiSliders, FiChevronDown } from 'react-icons/fi';
import Container from '../../components/Container';
import Breadcrumb from '../../components/Breadcrumb';
import FilterSidebar from '../../components/FilterSidebar';
import CatalogProductCard from '../../components/CatalogProductCard';
import { catalogProducts } from '../../data/catalogData';

const ProductsPage = () => {
  const { category } = useParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('most-popular');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [filters, setFilters] = useState({
    category: category || null,
    priceRange: { min: 0, max: 300 },
    colors: [],
    sizes: [],
    style: null
  });

  useEffect(() => {
    if (category) {
      setFilters(prev => ({ ...prev, category }));
    }
  }, [category]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1);
  };

  // Filter products
  const filteredProducts = catalogProducts.filter(product => {
    const categoryMatch = !filters.category || product.category === filters.category;
    const priceMatch = product.price >= filters.priceRange.min && product.price <= filters.priceRange.max;
    const colorMatch = filters.colors.length === 0 || product.colors.some(c => filters.colors.includes(c));
    const sizeMatch = filters.sizes.length === 0 || product.sizes.some(s => filters.sizes.includes(s));
    const styleMatch = !filters.style || product.style === filters.style;
    
    return categoryMatch && priceMatch && colorMatch && sizeMatch && styleMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                    {filters.category || 'All Products'}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedProducts.length)} of {sortedProducts.length} Products
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
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-8 mb-8">
                {paginatedProducts.map((product) => (
                  <CatalogProductCard key={product.id} product={product} />
                ))}
              </div>

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
        </div>
      </Container>
    </div>
  );
};

export default ProductsPage;
