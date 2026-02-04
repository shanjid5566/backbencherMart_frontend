import React from "react";
import { Link } from "react-router";

const RelatedProducts = ({ products }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-400">★</span>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">⯨</span>
      );
    }
    const remaining = 5 - Math.ceil(rating);
    for (let i = 0; i < remaining; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">★</span>
      );
    }
    return stars;
  };

  return (
    <div className="mt-12 lg:my-16">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-12 dark:text-white">
        YOU MIGHT ALSO LIKE
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group"
          >
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden mb-3 lg:mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-2 dark:text-white line-clamp-1">
              {product.name}
            </h3>

            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center text-sm sm:text-base">
                {renderStars(product.rating)}
              </div>
              <span className="text-xs sm:text-sm dark:text-gray-300">
                {product.rating}/5
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg sm:text-xl lg:text-2xl dark:text-white">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg sm:text-xl lg:text-2xl text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium rounded-full">
                    -{product.discount}%
                  </span>
                </>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
