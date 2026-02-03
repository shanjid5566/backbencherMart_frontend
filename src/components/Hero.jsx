import React from 'react'

const Hero = () => {
  return (
    <section className="w-full bg-[#F2F0F1]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 py-8 sm:py-12 lg:py-16 xl:py-20">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-bold leading-tight mb-5 sm:mb-6 lg:mb-8">
              FIND CLOTHES
              <br />
              THAT MATCHES
              <br />
              YOUR STYLE
            </h1>
            
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-lg">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>

            <button className="bg-black text-white px-12 sm:px-16 py-3 sm:py-4 rounded-full text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors w-full sm:w-auto max-w-[210px]">
              Shop Now
            </button>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 lg:mt-16">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl lg:text-[40px] font-bold mb-1 sm:mb-2">200+</span>
                <span className="text-xs sm:text-sm text-gray-600">International Brands</span>
              </div>
              <div className="flex flex-col border-l border-gray-300 pl-4 sm:pl-6 lg:pl-8">
                <span className="text-2xl sm:text-3xl lg:text-[40px] font-bold mb-1 sm:mb-2">2,000+</span>
                <span className="text-xs sm:text-sm text-gray-600">High-Quality Products</span>
              </div>
              <div className="flex flex-col border-l border-gray-300 pl-4 sm:pl-6 lg:pl-8">
                <span className="text-2xl sm:text-3xl lg:text-[40px] font-bold mb-1 sm:mb-2">30,000+</span>
                <span className="text-xs sm:text-sm text-gray-600">Happy Customers</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[600px] aspect-[4/3] lg:aspect-auto lg:h-[500px] xl:h-[600px]">
              {/* Decorative Stars */}
              <svg 
                className="absolute top-12 right-8 sm:right-12 lg:right-4 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                viewBox="0 0 104 104"
                fill="none"
              >
                <path d="M52 0L56.7553 35.2447L92 40L56.7553 44.7553L52 80L47.2447 44.7553L12 40L47.2447 35.2447L52 0Z" fill="black"/>
              </svg>
              
              <svg 
                className="absolute top-32 sm:top-40 left-4 sm:left-8 lg:left-0 w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14"
                viewBox="0 0 104 104"
                fill="none"
              >
                <path d="M52 0L56.7553 35.2447L92 40L56.7553 44.7553L52 80L47.2447 44.7553L12 40L47.2447 35.2447L52 0Z" fill="black"/>
              </svg>

              {/* Placeholder for image - Replace with actual image */}
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <p className="text-sm sm:text-base mb-2">Hero Image Placeholder</p>
                  <p className="text-xs">Add your product image here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
