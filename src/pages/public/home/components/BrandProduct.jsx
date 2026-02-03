import React from 'react'
import Container from '../../../../components/Container'

const BrandProduct = () => {
  const brands = [
    { name: 'VERSACE', style: 'font-serif' },
    { name: 'ZARA', style: 'font-bold tracking-wider' },
    { name: 'GUCCI', style: 'font-serif' },
    { name: 'PRADA', style: 'font-serif tracking-wide' },
    { name: 'Calvin Klein', style: 'font-light tracking-wide' }
  ]

  return (
    <section className="w-full bg-black py-8 sm:py-10 lg:py-12">
      <Container>
        <div className="flex flex-wrap justify-center sm:justify-between items-center gap-6 sm:gap-8 lg:gap-12">
          {brands.map((brand, index) => (
            <div key={index} className="text-white text-2xl sm:text-3xl lg:text-4xl">
              <h3 className={brand.style}>{brand.name}</h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default BrandProduct
