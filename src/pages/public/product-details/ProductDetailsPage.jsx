import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Container from "../../../components/Container";
import Breadcrumb from "./components/Breadcrumb";
import ProductImageGallery from "./components/ProductImageGallery";
import ProductInfo from "./components/ProductInfo";
import ProductTabs from "./components/ProductTabs";
import RelatedProducts from "./components/RelatedProducts";
import apiService from "../../../services/apiService";
import { relatedProducts } from "../../../data/productData";
import { colors as catalogColors } from "../../../data/catalogData";

const SIZE_LABELS = {
  XS: "X-Small",
  S: "Small",
  M: "Medium",
  L: "Large",
  XL: "X-Large",
  XXL: "XX-Large",
  XXL_SHORT: "XXL",
  "3XL": "3X-Large",
  "4XL": "4X-Large",
};

const mapColorStringToObject = (colorStr) => {
  if (!colorStr) return { name: colorStr, hex: "#999" };
  const found = catalogColors.find(c => c.name.toLowerCase() === colorStr.toLowerCase());
  return found ? { name: found.name, hex: found.hex } : { name: colorStr, hex: "#999" };
};

const mapSize = (s) => {
  if (!s) return s;
  const up = s.toUpperCase();
  return SIZE_LABELS[up] || s;
};

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiService.get(`/products/${productId}`);
        // API returns { product: { ... } }
        const p = res.product || res;

        // Normalize to the UI shape expected by components
        const uiProduct = {
          id: p._id,
          name: p.name,
          price: p.price,
          originalPrice: p.oldPrice || p.originalPrice || null,
          discount: p.discountPercentage || p.discount || null,
          description: p.description || "",
          images: Array.isArray(p.image) && p.image.length > 0 ? p.image : (p.images || []),
          colors: (p.colors || []).map(mapColorStringToObject),
          sizes: (p.sizes || []).map(mapSize),
          inStock: p.inStock,
          stock: p.stock,
          rating: p.averageRatings || 0,
          totalReviews: p.totalReviews || 0,
          category: p.category,
          dressStyle: p.dressStyle,
          breadcrumb: ["Home", "Shop", p.category || p.dressStyle || "All"],
        };

        if (!cancelled) setProduct(uiProduct);
      } catch (err) {
        if (!cancelled) setError(err.message || String(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true };
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="font-semibold">Error loading product</p>
          <p className="mt-2">{String(error)}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300 flex items-center justify-center">
        <div className="text-center text-gray-500">No product found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
      <Container>
        <div className="py-6 lg:py-8">
          {/* Breadcrumb */}
          <Breadcrumb items={product.breadcrumb} />

          {/* Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-8 lg:mb-12">
            {/* Left: Image Gallery */}
            <ProductImageGallery images={product.images} productName={product.name} />

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
