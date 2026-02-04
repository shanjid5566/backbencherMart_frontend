import { Route, Routes } from "react-router";
import HomeLayout from "./layouts/homeLayout/HomeLayout";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/public/product-details/ProductDetailsPage";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="product/:productId" element={<ProductDetailsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
