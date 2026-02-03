import BrandProduct from './public/home/components/BrandProduct'
import Hero from './public/home/components/Hero'
import TopSelling from './public/home/components/TopSelling'
import NewArrivals from './public/home/components/NewArrivals'
import Reviews from './public/home/components/Reviews'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <BrandProduct />
      <NewArrivals />
      <TopSelling />
      <Reviews />
    </div>
  )
}

export default HomePage
