import React, { useState } from "react";

const ProductImageGallery = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        {/* Thumbnails - horizontal below main on mobile, vertical left on large screens */}
        <div className="flex lg:flex-col gap-4 justify-center lg:justify-start order-last lg:order-first">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-16 sm:w-20 h-16 sm:h-20 lg:w-20 lg:h-20 rounded-xl overflow-hidden flex items-center justify-center transition-all bg-white dark:bg-gray-800 ${
                selectedImage === index
                  ? "ring-2 ring-black dark:ring-white scale-105"
                  : "ring-1 ring-transparent hover:ring-black/10 dark:hover:ring-white/10"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img src={image} alt={`${productName} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Main Image area */}
        <div className="flex-1">
          <div className="w-full rounded-2xl flex items-center justify-center" style={{ maxHeight: 720 }}>
            <img
              src={images[selectedImage]}
              alt={`${productName} - view ${selectedImage + 1}`}
              className="max-w-full max-h-[72vh] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;
