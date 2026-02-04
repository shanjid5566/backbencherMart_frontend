import React from 'react';
import { FiStar } from 'react-icons/fi';
import { Link } from 'react-router';

const CatalogProductCard = ({ product }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <FiStar key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-4 h-4">
            <FiStar className="w-4 h-4 text-yellow-400 absolute" />
            <div className="overflow-hidden w-2">
              <FiStar className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <FiStar key={i} className="w-4 h-4 text-gray-300 dark:text-gray-600" />
        );
      }
    }
    return stars;
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group block bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-[4/5] bg-white dark:bg-gray-700 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-sm sm:text-base mb-2 line-clamp-1 dark:text-white">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-0.5">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.rating}/5
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-lg sm:text-xl font-bold dark:text-white">
            ${product.price}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-lg sm:text-xl font-bold text-gray-400 line-through">
                ${product.originalPrice}
              </span>
              <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                -{product.discount}%
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CatalogProductCard;
