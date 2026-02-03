import React from 'react'
import Container from '../../../../components/Container'
import ProductCard from '../../../../components/ProductCard'

const products = [
  {
    id: 1,
    title: 'T-shirt with Tape Details',
    price: 120,
    rating: 4.5,
    img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=500',
  },
  {
    id: 2,
    title: 'Skinny Fit Jeans',
    price: 240,
    oldPrice: 260,
    discount: 20,
    rating: 3.5,
    img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500',
  },
  {
    id: 3,
    title: 'Checkered Shirt',
    price: 180,
    rating: 4.5,
    img: '/assets/product-3.png',
  },
  {
    id: 4,
    title: 'Sleeve Striped T-shirt',
    price: 130,
    oldPrice: 160,
    discount: 30,
    rating: 4.5,
    img: '/assets/product-4.png',
  },
]



const NewArrivals = () => {
  return (
    <section className="w-full py-12 lg:py-16">
      <Container>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">NEW ARRIVALS</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              image={p.img}
              title={p.title}
              rating={p.rating}
              price={p.price}
              oldPrice={p.oldPrice}
              discount={p.discount}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600">View All</button>
        </div>
      </Container>
    </section>
  )
}

export default NewArrivals
