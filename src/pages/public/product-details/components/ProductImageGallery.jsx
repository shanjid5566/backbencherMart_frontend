import React, { useState } from "react";

const ProductImageGallery = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col gap-3 lg:gap-5">
      {/* Main Image */}
      <div className="w-full aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden">
        <img
          src={images[selectedImage]}
          alt={`${productName} - view ${selectedImage + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-3 lg:gap-5">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-1 aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl lg:rounded-2xl overflow-hidden border-2 transition-all ${
              selectedImage === index
                ? "border-black dark:border-white"
                : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <img
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
