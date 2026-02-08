import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Container from "./Container";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiChevronDown,
  FiGrid,
  FiSun,
  FiMoon,
  FiLogOut,
} from "react-icons/fi";
import { toggleTheme, selectIsDarkMode } from "../features/theme/themeSlice";
import { fetchCart } from '../features/cart/cartSlice'
import { logout } from '../features/authentication/authSlice'

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDarkMode = useSelector(selectIsDarkMode);
  const reduxToken = useSelector((s) => s.auth?.token)
  const cartItems = useSelector((s) => s.cart?.items || [])
  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0)

  // Local auth state (fallback to localStorage so header works before reducer is added)
  const [authUser, setAuthUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'))
    } catch (e) {
      return null
    }
  })
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('token'))

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'user') setAuthUser(e.newValue ? JSON.parse(e.newValue) : null)
      if (e.key === 'token') setAuthToken(e.newValue)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  useEffect(() => {
    const token = reduxToken || authToken
    if (token) dispatch(fetchCart())
  }, [reduxToken, authToken, dispatch])

  const closeMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  /* ESC key close */
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeMenu();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeMenu]);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  /* Click outside close */
  useEffect(() => {
    if (!mobileOpen) return;

    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };

    document.addEventListener("pointerdown", onClick);
    return () => document.removeEventListener("pointerdown", onClick);
  }, [mobileOpen, closeMenu]);

  return (
    <header className="sticky top-0 w-full bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-gray-700 z-50 transition-colors duration-300">
      <Container>
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 mr-8 lg:mr-12">
            <h1 className="text-2xl sm:text-3xl lg:text-[24px] font-bold dark:text-white">
              BackBanchers Shop
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link to="/" className="text-base hover:text-gray-600 dark:text-gray-200 dark:hover:text-white">
              Home
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 text-base hover:text-gray-600 dark:text-gray-200 dark:hover:text-white transition-colors">
                Shop <FiChevronDown className="w-4 h-4" />
              </button>

              {/* Desktop dropdown */}
              <div className="absolute left-0 top-full mt-2 w-48 bg-gradient-to-b from-white to-gray-50 dark:from-dark-surface dark:to-gray-800 shadow-xl rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-1 group-hover:translate-y-0 transition-all ring-1 ring-black/5 dark:ring-white/10">
                <div className="px-3 py-2">
                  <Link to="/shop" className="flex items-center gap-2 px-2 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">
                    <FiGrid className="w-4 h-4" />
                    Show All
                  </Link>
                </div>
                <div className="border-t dark:border-gray-700" />
                <ul className="py-1">
                  <li>
                    <Link to="/shop/men" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200">Men</Link>
                  </li>
                  <li>
                    <Link to="/shop/women" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200">Women</Link>
                  </li>
                  <li>
                    <Link to="/shop/casual" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200">Casual</Link>
                  </li>
                  <li>
                    <Link to="/shop/formal" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200">Formal</Link>
                  </li>
                  <li>
                    <Link to="/shop/party" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200">Party</Link>
                  </li>
                  <li>
                    <Link to="/shop/gym" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200">Gym</Link>
                  </li>
                </ul>
              </div>
            </div>
            <Link to="/new-arrivals" className="text-base hover:text-gray-600 dark:text-gray-200 dark:hover:text-white">
              New Arrivals
            </Link>
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-4 lg:mx-8 xl:mx-12">
            <div className="relative w-full">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 transition-colors"
              />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <FiSun className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
              ) : (
                <FiMoon className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
            <Link to="/cart" className="hidden lg:inline-flex p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg relative">
              <FiShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>
            {(!authUser && !authToken) ? (
              <Link to="/login" className="hidden lg:inline-flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm font-medium">
                Log in
              </Link>
            ) : (
              <div className="hidden lg:block relative group">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <FiUser className="w-6 h-6" />
                </button>
                
                {/* User dropdown */}
                <div className="absolute -right-36 top-full mt-2 w-48 bg-white dark:bg-dark-surface shadow-xl rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-1 group-hover:translate-y-0 transition-all ring-1 ring-black/5 dark:ring-white/10">
                  <div className="py-1">
                    <Link 
                      to="/dashboard" 
                      className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white transition-colors"
                    >
                      <FiUser className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(logout())
                        navigate('/login')
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <FiLogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
            <button
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 rounded-lg"
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative w-full">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 transition-colors"
            />
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        <div
          ref={menuRef}
          className={`absolute top-0 left-0 w-full bg-white dark:bg-dark-surface shadow-md transform transition-all duration-300 ${
            mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
        >
          <div
            className="mx-auto px-6 py-6"
            style={{
              maxHeight: 'calc(100vh - 4rem)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain',
            }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <Link to="/" onClick={closeMenu} className="text-2xl font-bold dark:text-white">
                BackBanchers Shop
              </Link>
              <button onClick={closeMenu} className="p-2 dark:text-white">
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-4">
              <Link to="/" onClick={closeMenu} className="text-lg dark:text-gray-200">Home</Link>
              <Link to="/new-arrivals" onClick={closeMenu} className="text-lg dark:text-gray-200">New Arrivals</Link>
              <Link to="/brands" onClick={closeMenu} className="text-lg dark:text-gray-200">Brands</Link>

              {/* Mobile Shop accordion */}
              <div>
                <button
                  onClick={() => setMobileShopOpen((v) => !v)}
                  className="w-full flex items-center justify-between text-lg font-medium dark:text-white"
                >
                  <span>Shop</span>
                  <FiChevronDown className={`w-5 h-5 transition-transform ${mobileShopOpen ? 'rotate-180' : ''}`} />
                </button>

                <div className={`mt-2 pl-0 border-l border-transparent transition-all ${mobileShopOpen ? 'max-h-96 overflow-y-auto' : 'max-h-0 overflow-hidden'}`}>
                  <div className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-md p-3 ring-1 ring-black/5 dark:ring-white/10">
                    <Link to="/shop" onClick={closeMenu} className="flex items-center gap-2 py-2 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 font-semibold dark:text-white">
                      <FiGrid className="w-4 h-4" />
                      Show All
                    </Link>
                    <div className="mt-2 border-t dark:border-gray-600 pt-2">
                      <Link to="/shop/men" onClick={closeMenu} className="block py-2 px-2 hover:bg-white dark:hover:bg-gray-600 dark:text-gray-200">Men</Link>
                      <Link to="/shop/women" onClick={closeMenu} className="block py-2 px-2 hover:bg-white dark:hover:bg-gray-600 dark:text-gray-200">Women</Link>
                      <Link to="/shop/casual" onClick={closeMenu} className="block py-2 px-2 hover:bg-white dark:hover:bg-gray-600 dark:text-gray-200">Casual</Link>
                      <Link to="/shop/formal" onClick={closeMenu} className="block py-2 px-2 hover:bg-white dark:hover:bg-gray-600 dark:text-gray-200">Formal</Link>
                      <Link to="/shop/party" onClick={closeMenu} className="block py-2 px-2 hover:bg-white dark:hover:bg-gray-600 dark:text-gray-200">Party</Link>
                      <Link to="/shop/gym" onClick={closeMenu} className="block py-2 px-2 hover:bg-white dark:hover:bg-gray-600 dark:text-gray-200">Gym</Link>
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            <div className="mt-6 border-t dark:border-gray-700 pt-4 flex gap-3">
              <Link to="/cart" className="flex-1 py-3 bg-black dark:bg-white dark:text-black text-white rounded-md transition-colors relative flex items-center justify-center gap-2">
                <FiShoppingCart className="w-5 h-5" />
                View Cart
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </Link>
              {(!authUser && !authToken) ? (
                <Link to="/login" onClick={closeMenu} className="flex-1 py-3 border dark:border-gray-600 rounded-md dark:text-white text-center transition-colors">
                  Log in
                </Link>
              ) : (
                <Link to="/dashboard" onClick={closeMenu} className="flex-1 py-3 border dark:border-gray-600 rounded-md dark:text-white text-center transition-colors">
                  Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
