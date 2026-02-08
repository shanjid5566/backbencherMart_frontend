import { Route, Routes } from "react-router";
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeLayout from "./layouts/homeLayout/HomeLayout";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/public/product-details/ProductDetailsPage";
import ProductsPage from "./pages/public/ProductsPage";
import NewArrivalsPage from "./pages/public/NewArrivalsPage";
import CartPage from "./pages/public/CartPage";
import CheckoutPage from "./pages/public/CheckoutPage";
import PaymentSuccessPage from "./pages/public/PaymentSuccessPage";
import PaymentCancelPage from "./pages/public/PaymentCancelPage";
import LoginPage from "./pages/public/auth/Login";
import RegisterPage from "./pages/public/auth/Register";
import VerifyOtpPage from "./pages/public/auth/VerifyOtp";
import ProfilePage from "./pages/dashboard/ProfilePage";
import OrdersPage from "./pages/dashboard/OrdersPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import NotFound from "./pages/NotFound";

function App() {
  const themeMode = useSelector((state) => state.theme.mode);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={themeMode}
      />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />

        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="product/:productId" element={<ProductDetailsPage />} />
          <Route path="shop" element={<ProductsPage />} />
          <Route path="shop/:category" element={<ProductsPage />} />
          <Route path="new-arrivals" element={<NewArrivalsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order/success" element={<PaymentSuccessPage />} />
          <Route path="order/cancel" element={<PaymentCancelPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<ProfilePage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
