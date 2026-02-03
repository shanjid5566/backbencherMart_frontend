import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import Container from "./Container";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiChevronDown,
  FiGrid,
} from "react-icons/fi";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);

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
    <header className="w-full bg-white border-b border-gray-200 z-40 relative">
      <Container>
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl sm:text-3xl lg:text-[24px] font-bold">
              BackBanchers Shop
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <div className="relative group">
              <button className="flex items-center gap-1 text-base hover:text-gray-600 transition-colors">
                Shop <FiChevronDown className="w-4 h-4" />
              </button>

              {/* Desktop dropdown */}
              <div className="absolute left-0 top-full mt-2 w-48 bg-gradient-to-b from-white to-gray-50 shadow-xl rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-1 group-hover:translate-y-0 transition-all ring-1 ring-black/5">
                <div className="px-3 py-2">
                  <a href="/shop" className="flex items-center gap-2 px-2 py-2 rounded-md text-sm font-semibold hover:bg-gray-100">
                    <FiGrid className="w-4 h-4" />
                    Show All
                  </a>
                </div>
                <div className="border-t" />
                <ul className="py-1">
                  <li>
                    <a href="/shop/casual" className="block px-4 py-2 text-sm hover:bg-gray-100">Casual</a>
                  </li>
                  <li>
                    <a href="/shop/formal" className="block px-4 py-2 text-sm hover:bg-gray-100">Formal</a>
                  </li>
                  <li>
                    <a href="/shop/party" className="block px-4 py-2 text-sm hover:bg-gray-100">Party</a>
                  </li>
                  <li>
                    <a href="/shop/gym" className="block px-4 py-2 text-sm hover:bg-gray-100">Gym</a>
                  </li>
                </ul>
              </div>
            </div>
            <Link to="/on-sale" className="text-base hover:text-gray-600">
              On Sale
            </Link>
            <Link to="/new-arrivals" className="text-base hover:text-gray-600">
              New Arrivals
            </Link>
            <Link to="/brands" className="text-base hover:text-gray-600">
              Brands
            </Link>
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-4 lg:mx-8 xl:mx-12">
            <div className="relative w-full">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button className="hidden lg:inline-flex p-2 hover:bg-gray-100 rounded-lg">
              <FiShoppingCart className="w-6 h-6" />
            </button>
            <button className="hidden lg:inline-flex p-2 hover:bg-gray-100 rounded-lg">
              <FiUser className="w-6 h-6" />
            </button>
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
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
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
          className={`absolute top-0 left-0 w-full bg-white shadow-md transform transition-all duration-300 ${
            mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
        >
          <div className="mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <Link to="/" onClick={closeMenu} className="text-2xl font-bold">
                BackBanchers Shop
              </Link>
              <button onClick={closeMenu} className="p-2">
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-4">
              <Link to="/" onClick={closeMenu} className="text-lg">Home</Link>
              <Link to="/on-sale" onClick={closeMenu} className="text-lg">On Sale</Link>
              <Link to="/new-arrivals" onClick={closeMenu} className="text-lg">New Arrivals</Link>
              <Link to="/brands" onClick={closeMenu} className="text-lg">Brands</Link>

              {/* Mobile Shop accordion */}
              <div>
                <button
                  onClick={() => setMobileShopOpen((v) => !v)}
                  className="w-full flex items-center justify-between text-lg font-medium"
                >
                  <span>Shop</span>
                  <FiChevronDown className={`w-5 h-5 transition-transform ${mobileShopOpen ? 'rotate-180' : ''}`} />
                </button>

                <div className={`mt-2 pl-0 border-l border-transparent overflow-hidden transition-all ${mobileShopOpen ? 'max-h-56' : 'max-h-0'}`}>
                  <div className="bg-gradient-to-r from-white to-gray-50 rounded-md p-3 ring-1 ring-black/5">
                    <Link to="/shop" onClick={closeMenu} className="flex items-center gap-2 py-2 px-2 rounded-md hover:bg-gray-100 font-semibold">
                      <FiGrid className="w-4 h-4" />
                      Show All
                    </Link>
                    <div className="mt-2 border-t pt-2">
                      <Link to="/shop/casual" onClick={closeMenu} className="block py-2 px-2 hover:bg-white">Casual</Link>
                      <Link to="/shop/formal" onClick={closeMenu} className="block py-2 px-2 hover:bg-white">Formal</Link>
                      <Link to="/shop/party" onClick={closeMenu} className="block py-2 px-2 hover:bg-white">Party</Link>
                      <Link to="/shop/gym" onClick={closeMenu} className="block py-2 px-2 hover:bg-white">Gym</Link>
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            <div className="mt-6 border-t pt-4 flex gap-3">
              <button className="flex-1 py-3 bg-black text-white rounded-md">
                View Cart
              </button>
              <button className="flex-1 py-3 border rounded-md">
                Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
