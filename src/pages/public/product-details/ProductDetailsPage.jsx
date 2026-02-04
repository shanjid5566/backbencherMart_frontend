import React from "react";
import { useParams } from "react-router";
import Container from "../../../components/Container";
import Breadcrumb from "./components/Breadcrumb";
import ProductImageGallery from "./components/ProductImageGallery";
import ProductInfo from "./components/ProductInfo";
import ProductTabs from "./components/ProductTabs";
import RelatedProducts from "./components/RelatedProducts";
import { products, relatedProducts } from "../../../data/productData";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const product = products[productId] || products["one-life-graphic-tshirt"];

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
      <Container>
        <div className="py-6 lg:py-8">
          {/* Breadcrumb */}
          <Breadcrumb items={product.breadcrumb} />

          {/* Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-8 lg:mb-12">
            {/* Left: Image Gallery */}
            <ProductImageGallery
              images={product.images}
              productName={product.name}
            />

            {/* Right: Product Info */}
            <ProductInfo product={product} />
          </div>

          {/* Tabs Section */}
          <ProductTabs totalReviews={product.totalReviews} />

          {/* Related Products */}
          <RelatedProducts products={relatedProducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductDetailsPage;
