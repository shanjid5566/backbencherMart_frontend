import BrandProduct from './public/home/components/BrandProduct'
import Hero from './public/home/components/Hero'
import TopSelling from './public/home/components/TopSelling'
import BrowseByStyle from './public/home/components/BrowseByStyle'
import NewArrivals from './public/home/components/NewArrivals'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <BrandProduct />
      <NewArrivals />
      <TopSelling />
      <BrowseByStyle />
    </div>
  )
}

export default HomePage
