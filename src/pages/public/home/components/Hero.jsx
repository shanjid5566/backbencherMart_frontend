import React from 'react'
import Container from '../../../../components/Container'

const Hero = () => {
  return (
    <section className="w-full bg-[#F2F0F1]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12 py-10 sm:py-14 lg:py-20">
          {/* Left Content */}
          <div className="order-1 lg:order-1 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[72px] font-extrabold leading-tight tracking-tight mb-4 sm:mb-6 lg:mb-8 text-center lg:text-left">
              FIND CLOTHES
              <br />
              THAT MATCHES
              <br />
              YOUR STYLE
            </h1>

            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-xl text-center lg:text-left">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-6 flex-col sm:flex-row">
              <button className="bg-black text-white px-10 sm:px-14 py-3 sm:py-4 rounded-full text-sm sm:text-base font-medium hover:bg-gray-900 transition-colors shadow-md w-full sm:w-auto">
                Shop Now
              </button>
            </div>

            {/* Stats */}
            <div className="mt-8 sm:mt-12 lg:mt-16">
              {/* Mobile: two cols for first row, third centered below */}
              <div className="sm:hidden grid grid-cols-2 gap-x-6 gap-y-4 items-center">
                <div className="text-center">
                  <div className="text-2xl font-bold">200+</div>
                  <div className="text-xs text-gray-600">International Brands</div>
                </div>

                <div className="text-center border-l border-gray-300 pl-4">
                  <div className="text-2xl font-bold">2,000+</div>
                  <div className="text-xs text-gray-600">High-Quality Products</div>
                </div>

                <div className="col-span-2 text-center mt-2">
                  <div className="text-2xl font-bold">30,000+</div>
                  <div className="text-xs text-gray-600">Happy Customers</div>
                </div>
              </div>

              {/* Desktop / tablet: original layout */}
              <div className="hidden sm:flex flex-col sm:flex-row items-center sm:items-stretch gap-6 sm:gap-8">
                <div className="flex-1 text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">200+</div>
                  <div className="text-xs sm:text-sm text-gray-600">International Brands</div>
                </div>

                <div className="hidden sm:block w-px bg-gray-300" />

                <div className="flex-1 text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">2,000+</div>
                  <div className="text-xs sm:text-sm text-gray-600">High-Quality Products</div>
                </div>

                <div className="hidden sm:block w-px bg-gray-300" />

                <div className="flex-1 text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">30,000+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image (hidden on mobile/tablet) */}
          <div className="hidden lg:flex order-2 items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[700px] lg:h-[520px] xl:h-[640px]">
              {/* Decorative shapes */}
              <div className="absolute -top-6 right-8 hidden lg:block">
                <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-black rounded-full transform rotate-45" style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'}} />
              </div>

              <div className="absolute top-24 left-6 hidden lg:block">
                <div className="w-6 h-6 sm:w-10 sm:h-10 bg-black rounded-full transform rotate-45" style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'}} />
              </div>

              {/* Hero image placeholder - replace with actual image */}
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-end justify-end overflow-hidden">
                <img src="https://i.ibb.co.com/CyKZj7L/Rectangle-2.png" alt="hero" className="object-cover h-full w-full lg:ml-12 lg:object-right" onError={(e)=>{e.currentTarget.style.display='none'}} />
                <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-transparent" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Hero
