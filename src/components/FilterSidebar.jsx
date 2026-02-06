import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronDown, FiCheck } from 'react-icons/fi';
import { categories, colors, sizes, dressStyles } from '../data/catalogData';

const FilterSidebar = ({ filters, onFilterChange, onClose, isMobile }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: false,
    price: false,
    colors: false,
    size: false,
    style: false
  });

  // Local temp filters for mobile drawer — only apply when user clicks Apply
  const defaultLocalFilters = {
    category: null,
    priceRange: { min: 0, max: 20000 },
    colors: [],
    sizes: [],
    style: null
  };

  const [localFilters, setLocalFilters] = useState(filters || defaultLocalFilters);

  useEffect(() => {
    // always sync incoming filters when `filters` prop changes
    setLocalFilters(filters || defaultLocalFilters);
  }, [filters]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryClick = (categoryId) => {
    setLocalFilters(prev => ({ ...prev, category: prev.category === categoryId ? null : categoryId }));
  };

  const handleColorClick = (colorId) => {
    setLocalFilters(prev => {
      const has = prev.colors.includes(colorId);
      return { ...prev, colors: has ? prev.colors.filter(c => c !== colorId) : [...prev.colors, colorId] };
    });
  };

  const handleSizeClick = (sizeId) => {
    setLocalFilters(prev => {
      const has = prev.sizes.includes(sizeId);
      return { ...prev, sizes: has ? prev.sizes.filter(s => s !== sizeId) : [...prev.sizes, sizeId] };
    });
  };

  const handleStyleClick = (styleId) => {
    setLocalFilters(prev => ({ ...prev, style: prev.style === styleId ? null : styleId }));
  };

  const handlePriceChange = (type, value) => {
    setLocalFilters(prev => ({ ...prev, priceRange: { ...prev.priceRange, [type]: parseInt(value) } }));
  };

  // active source of truth for rendering (use buffered localFilters everywhere)
  const activeFilters = localFilters;

  const hasActiveFilters = (
    activeFilters.category ||
    activeFilters.style ||
    (activeFilters.colors && activeFilters.colors.length > 0) ||
    (activeFilters.sizes && activeFilters.sizes.length > 0) ||
    (activeFilters.priceRange && (
      activeFilters.priceRange.min !== defaultLocalFilters.priceRange.min ||
      activeFilters.priceRange.max !== defaultLocalFilters.priceRange.max
    ))
  );

  const clearAll = () => setLocalFilters(defaultLocalFilters);

  const applyFilters = () => {
    onFilterChange('category', localFilters.category);
    onFilterChange('colors', localFilters.colors);
    onFilterChange('sizes', localFilters.sizes);
    onFilterChange('style', localFilters.style);
    onFilterChange('priceRange', localFilters.priceRange);
    if (onClose) onClose();
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <h2 className="text-xl font-bold dark:text-white">{isMobile ? 'Filter' : 'Filters'}</h2>
        {onClose && (
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-700 dark:text-gray-400 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Scrollable Content */}
      <div className={`flex-1 ${isMobile ? 'overflow-y-auto' : ''}`}>
        {isMobile ? (
          // Mobile Filter Design
          <div className="space-y-6">
            {/* Categories as Checkboxes */}
            <div className="space-y-3">
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={activeFilters.category === cat.id}
                      onChange={() => handleCategoryClick(cat.id)}
                      className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white cursor-pointer"
                    />
                    <span className="text-base dark:text-gray-200 capitalize">{cat.name}</span>
                  </div>
                  <span className="text-sm text-gray-400">({cat.count})</span>
                </label>
              ))}
            </div>

            {/* Colors Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <button
                onClick={() => toggleSection('colors')}
                className="flex items-center justify-between w-full mb-4"
              >
                <span className="text-sm font-bold uppercase tracking-wider dark:text-white">Color</span>
                {expandedSections.colors ? (
                  <FiChevronDown className="w-5 h-5 dark:text-gray-400" />
                ) : (
                  <FiChevronRight className="w-5 h-5 dark:text-gray-400" />
                )}
              </button>
              {expandedSections.colors && (
                <div className="grid grid-cols-5 gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorClick(color.id)}
                      className={`w-12 h-12 rounded-full border-2 transition-all relative ${
                        activeFilters.colors.includes(color.id)
                          ? 'border-gray-900 dark:border-white scale-110'
                          : 'border-gray-200 dark:border-gray-600'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {activeFilters.colors.includes(color.id) && (
                        <FiCheck className={`w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                          color.id === 'white' ? 'text-black' : 'text-white'
                        }`} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Size Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <button
                onClick={() => toggleSection('size')}
                className="flex items-center justify-between w-full mb-4"
              >
                <span className="text-sm font-bold uppercase tracking-wider dark:text-white">Size</span>
                {expandedSections.size ? (
                  <FiChevronDown className="w-5 h-5 dark:text-gray-400" />
                ) : (
                  <FiChevronRight className="w-5 h-5 dark:text-gray-400" />
                )}
              </button>
              {expandedSections.size && (
                <div className="grid grid-cols-3 gap-2.5">
                  {sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => handleSizeClick(size.id)}
                      className={`px-3 py-2.5 rounded-full text-sm font-medium transition-all ${
                        activeFilters.sizes.includes(size.id)
                          ? 'bg-black text-white dark:bg-white dark:text-black'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dress Style Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <button
                onClick={() => toggleSection('style')}
                className="flex items-center justify-between w-full mb-4"
              >
                <span className="text-sm font-bold uppercase tracking-wider dark:text-white">Brands</span>
                {expandedSections.style ? (
                  <FiChevronDown className="w-5 h-5 dark:text-gray-400" />
                ) : (
                  <FiChevronRight className="w-5 h-5 dark:text-gray-400" />
                )}
              </button>
              {expandedSections.style && (
                <div className="space-y-3">
                  {dressStyles.map((style) => (
                    <label
                      key={style.id}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={activeFilters.style === style.id}
                        onChange={() => handleStyleClick(style.id)}
                        className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white cursor-pointer"
                      />
                      <span className="text-base dark:text-gray-200">{style.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          // Desktop Filter Design (existing)
          <div>
            {/* Categories */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-5 mb-5">
              <button
                onClick={() => toggleSection('category')}
                className="flex items-center justify-between w-full mb-4"
              >
                <span className="font-semibold dark:text-white">Categories</span>
                {expandedSections.category ? (
                  <FiChevronDown className="w-5 h-5 dark:text-gray-400" />
                ) : (
                  <FiChevronRight className="w-5 h-5 dark:text-gray-400" />
                )}
              </button>
              {expandedSections.category && (
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeFilters.category === cat.id
                          ? 'bg-gray-100 dark:bg-gray-700 font-medium'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span className="dark:text-gray-200">{cat.name}</span>
                      <FiChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-5 mb-5">
              <button
                onClick={() => toggleSection('price')}
                className="flex items-center justify-between w-full mb-4"
              >
                <span className="font-semibold dark:text-white">Price</span>
                {expandedSections.price ? (
                  <FiChevronDown className="w-5 h-5 dark:text-gray-400" />
                ) : (
                  <FiChevronRight className="w-5 h-5 dark:text-gray-400" />
                )}
              </button>
              {expandedSections.price && (
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="20000"
                      step="100"
                      value={activeFilters.priceRange.max}
                      onChange={(e) => handlePriceChange('max', e.target.value)}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium dark:text-white">${activeFilters.priceRange.min}</span>
                    <span className="font-medium dark:text-white">${activeFilters.priceRange.max}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Colors */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-5 mb-5">
              <button
                onClick={() => toggleSection('colors')}
                className="flex items-center justify-between w-full mb-4"
              >
                <span className="font-semibold dark:text-white">Colors</span>
                {expandedSections.colors ? (
                  <FiChevronDown className="w-5 h-5 dark:text-gray-400" />
                ) : (
                  <FiChevronRight className="w-5 h-5 dark:text-gray-400" />
                )}
              </button>
              {expandedSections.colors && (
                <div className="grid grid-cols-5 gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorClick(color.id)}
                      className={`w-10 h-10 rounded-full border-2 transition-all relative ${
                        activeFilters.colors.includes(color.id)
                          ? 'border-gray-900 dark:border-white scale-110'
                          : 'border-gray-200 dark:border-gray-600'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {activeFilters.colors.includes(color.id) && (
                        <FiCheck className={`w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                          color.id === 'white' ? 'text-black' : 'text-white'
                        }`} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Size */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-5 mb-5">
              <button
                onClick={() => toggleSection('size')}
                className="flex items-center justify-between w-full mb-4"
              >
                <span className="font-semibold dark:text-white">Size</span>
                {expandedSections.size ? (
                  <FiChevronDown className="w-5 h-5 dark:text-gray-400" />
                ) : (
                  <FiChevronRight className="w-5 h-5 dark:text-gray-400" />
                )}
              </button>
              {expandedSections.size && (
                <div className="grid grid-cols-3 gap-2.5">
                  {sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => handleSizeClick(size.id)}
                      className={`px-3 py-2.5 rounded-full text-sm font-medium transition-all ${
                        activeFilters.sizes.includes(size.id)
                          ? 'bg-black text-white dark:bg-white dark:text-black'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dress Style */}
            <div className="pb-2">
              <button
                onClick={() => toggleSection('style')}
                className="flex items-center justify-between w-full mb-4"
              >
                <span className="font-semibold dark:text-white">Dress Style</span>
                {expandedSections.style ? (
                  <FiChevronDown className="w-5 h-5 dark:text-gray-400" />
                ) : (
                  <FiChevronRight className="w-5 h-5 dark:text-gray-400" />
                )}
              </button>
              {expandedSections.style && (
                <div className="space-y-3">
                  {dressStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => handleStyleClick(style.id)}
                      className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeFilters.style === style.id
                          ? 'bg-gray-100 dark:bg-gray-700 font-medium'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span className="dark:text-gray-200">{style.name}</span>
                      <FiChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Buttons */}
      {isMobile && (
        <div className="flex items-center gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <button 
            onClick={() => {
              // reset buffered mobile filters
              setLocalFilters(defaultLocalFilters);
            }}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline"
          >
            Clear all
          </button>
          <button 
            onClick={() => {
              // apply buffered filters to parent and close
              onFilterChange('category', localFilters.category);
              onFilterChange('colors', localFilters.colors);
              onFilterChange('sizes', localFilters.sizes);
              onFilterChange('style', localFilters.style);
              onFilterChange('priceRange', localFilters.priceRange);
              if (onClose) onClose();
            }}
            className="flex-1 px-6 py-3.5 bg-white dark:bg-black text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-full font-semibold transition-colors hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            Apply Filter
          </button>
        </div>
      )}

      {!isMobile && (
        <div className="flex items-center gap-3 mt-6">
          {hasActiveFilters ? (
            <button
              onClick={clearAll}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline"
            >
              Clear all
            </button>
          ) : (
            <div className="flex-0 w-24" />
          )}

          <button
            onClick={applyFilters}
            className="flex-1 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Apply Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;
