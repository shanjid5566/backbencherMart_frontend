import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import Container from "./Container";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [panelClass, setPanelClass] = useState("-translate-y-full opacity-0");
  const menuRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  useEffect(() => {
    // if click outside close
    const onClick = (e) => {
      if (
        menuVisible &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        // animate out then hide (slide up)
        setPanelClass("-translate-y-full opacity-0");
        setTimeout(() => {
          setMenuVisible(false);
          setMobileOpen(false);
        }, 300);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuVisible]);

  // sync mobileOpen -> menuVisible with animation
  useEffect(() => {
    if (mobileOpen) {
      setMenuVisible(true);
      // allow mount then animate in (slide down)
      requestAnimationFrame(() => requestAnimationFrame(() => setPanelClass("translate-y-0 opacity-100")));
    } else if (menuVisible) {
      // if mobileOpen became false programmatically, animate out then unmount (slide up)
      setPanelClass("-translate-y-full opacity-0");
      setTimeout(() => setMenuVisible(false), 300);
    }
  }, [mobileOpen]);

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
                Shop
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
            <Link
              to="/on-sale"
              className="text-base hover:text-gray-600 transition-colors"
            >
              On Sale
            </Link>
            <Link
              to="/new-arrivals"
              className="text-base hover:text-gray-600 transition-colors"
            >
              New Arrivals
            </Link>
            <Link
              to="/brands"
              className="text-base hover:text-gray-600 transition-colors"
            >
              Brands
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-4 lg:mx-8 xl:mx-12">
            <div className="relative w-full">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Cart Icon - visible on lg+ */}
            <button className="hidden lg:inline-flex p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="View cart">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>

            {/* User/Profile Icon - visible on lg+ */}
            <button className="hidden lg:inline-flex p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Account">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((s) => !s)}
              className="lg:hidden p-2  rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative w-full">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
        </div>
      </Container>

      {/* Mobile menu overlay */}
      {menuVisible && (
        <div className="fixed inset-0 z-50">
          <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${panelClass.includes('opacity-100') ? 'opacity-100' : 'opacity-0'}`} />
          <div
            ref={menuRef}
            className={`absolute top-0 left-0 w-full bg-white shadow-md transform transition-all duration-300 ${panelClass}`}
          >
            <div className="mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-bold"
                >
                  BackBanchers Shop
                </Link>
                <button
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="p-2"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-4">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/on-sale"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg"
                >
                  On Sale
                </Link>
                <Link
                  to="/new-arrivals"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg"
                >
                  New Arrivals
                </Link>
                <Link
                  to="/brands"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg"
                >
                  Brands
                </Link>
                <Link
                  to="/shop"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg"
                >
                  Shop
                </Link>
              </nav>

              <div className="mt-6 border-t pt-4">
                <div className="flex gap-3">
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
        </div>
      )}
    </header>
  );
};

export default Header;
