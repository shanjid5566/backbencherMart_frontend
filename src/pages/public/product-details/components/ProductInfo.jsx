import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../../../features/cart/cartSlice'
import { FiMinus, FiPlus, FiCheck } from "react-icons/fi";

const ProductInfo = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch()

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

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      {/* Product Name */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold dark:text-white">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center text-xl sm:text-2xl">
          {renderStars(product.rating)}
        </div>
        <span className="text-sm sm:text-base dark:text-gray-300">
          {product.rating}/5
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-2xl sm:text-3xl lg:text-4xl font-bold dark:text-white">
          ${product.price}
        </span>
        {product.originalPrice && (
          <>
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-400 line-through">
              ${product.originalPrice}
            </span>
            <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-full">
              -{product.discount}%
            </span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
        {product.description}
      </p>

      <div className="border-t dark:border-gray-700" />

      {/* Color Selector */}
      <div>
        <h3 className="text-sm sm:text-base font-medium mb-3 dark:text-gray-200">
          Select Colors
        </h3>
        <div className="flex gap-3">
          {product.colors.map((color, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(index)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedColor === index
                  ? "border-black dark:border-white scale-110"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: color.hex }}
              aria-label={color.name}
            >
              {selectedColor === index && (
                <FiCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t dark:border-gray-700" />

      {/* Size Selector */}
      <div>
        <h3 className="text-sm sm:text-base font-medium mb-3 dark:text-gray-200">
          Choose Size
        </h3>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all ${
                selectedSize === size
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t dark:border-gray-700" />

      {/* Quantity and Add to Cart (side-by-side on mobile and desktop) */}
      <div className="flex flex-row gap-3 items-center w-full">
        {/* Quantity Selector (half width on mobile, fixed on desktop) */}
        <div className="w-1/2 sm:w-36 flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-2 gap-3">
          <button
            onClick={decrementQuantity}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all active:scale-95"
            aria-label="Decrease quantity"
          >
            <FiMinus className="w-4 h-4" />
          </button>
          <span className="font-semibold text-base dark:text-white min-w-[2rem] text-center">
            {quantity}
          </span>
          <button
            onClick={incrementQuantity}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all active:scale-95"
            aria-label="Increase quantity"
          >
            <FiPlus className="w-4 h-4" />
          </button>
        </div>

        {/* Add to Cart Button (half width on mobile, fills on desktop) */}
        <button
          onClick={async () => {
            const token = (typeof window !== 'undefined' && localStorage.getItem('token')) || null
            if (!token) {
              // redirect to login if not authenticated
              window.location.href = '/login'
              return
            }
            const payload = {
              productId: product.id,
              quantity,
              selectedOptions: { color: product.colors[selectedColor]?.name, size: selectedSize },
            }
            try {
              await dispatch(addToCart(payload)).unwrap()
            } catch (e) {
              // ignore - error handled in slice/UI elsewhere
            }
          }}
          className="w-1/2 sm:flex-1 sm:max-w-md bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full px-6 py-3 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all active:scale-[0.98] text-sm sm:text-base"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
