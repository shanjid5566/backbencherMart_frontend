// Mock product data
export const products = {
  "one-life-graphic-tshirt": {
    id: "one-life-graphic-tshirt",
    name: "ONE LIFE GRAPHIC T-SHIRT",
    rating: 4.5,
    totalReviews: 451,
    price: 260,
    originalPrice: 300,
    discount: 40,
    description: "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    category: "T-shirts",
    breadcrumb: ["Home", "Shop", "Men", "T-shirts"],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop"
    ],
    colors: [
      { name: "Olive", hex: "#4A5D3F", available: true },
      { name: "Teal", hex: "#2C5F5D", available: true },
      { name: "Navy", hex: "#1E3A5F", available: true }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    inStock: true
  }
};

export const reviews = [
  {
    id: 1,
    name: "Samantha D.",
    verified: true,
    rating: 4.5,
    date: "August 14, 2023",
    comment: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."
  },
  {
    id: 2,
    name: "Alex M.",
    verified: true,
    rating: 4,
    date: "August 15, 2023",
    comment: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."
  },
  {
    id: 3,
    name: "Ethan R.",
    verified: true,
    rating: 3.5,
    date: "August 16, 2023",
    comment: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt."
  },
  {
    id: 4,
    name: "Olivia P.",
    verified: true,
    rating: 4,
    date: "August 17, 2023",
    comment: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out."
  },
  {
    id: 5,
    name: "Liam K.",
    verified: true,
    rating: 4,
    date: "August 18, 2023",
    comment: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion."
  },
  {
    id: 6,
    name: "Ava H.",
    verified: true,
    rating: 4.5,
    date: "August 19, 2023",
    comment: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter."
  }
];

export const relatedProducts = [
  {
    id: "polo-contrast-trims",
    name: "Polo with Contrast Trims",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=300&fit=crop",
    rating: 4.0,
    price: 212,
    originalPrice: 242,
    discount: 20
  },
  {
    id: "gradient-graphic-tshirt",
    name: "Gradient Graphic T-shirt",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300&h=300&fit=crop",
    rating: 3.5,
    price: 145,
    originalPrice: null,
    discount: null
  },
  {
    id: "polo-tipping-details",
    name: "Polo with Tipping Details",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=300&h=300&fit=crop",
    rating: 4.5,
    price: 180,
    originalPrice: null,
    discount: null
  },
  {
    id: "black-striped-tshirt",
    name: "Black Striped T-shirt",
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=300&h=300&fit=crop",
    rating: 5.0,
    price: 120,
    originalPrice: 150,
    discount: 30
  }
];
