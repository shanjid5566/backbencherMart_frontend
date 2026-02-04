import React from 'react'
import Container from './Container'
import { SiStripe, SiPaypal } from 'react-icons/si'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="">
      {/* Newsletter top bar - full width background, centered Container box overlaps next section */}
      <div className="w-full">
        <Container>
          <div className="mx-auto -mb-30 md:-mb-25 lg:-mb-16"> 
            <div className="bg-black text-white rounded-2xl p-6 md:p-8 shadow-lg relative z-30">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left max-w-2xl">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center lg:text-left">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h3>
                </div>

                <div className="w-full md:w-auto flex flex-col items-center gap-3">
                  <div className="relative w-full md:w-[360px] bg-gray-200 dark:bg-gray-200 rounded-full">
                    <input type="email" placeholder="Enter your email address" className="w-full pl-12 pr-4 py-3 rounded-full text-gray-800 " />
                  </div>
                  <button className="w-full md:w-[360px] px-6 py-3 rounded-full bg-white text-black font-medium">Subscribe to Newsletter</button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Top footer columns */}
      <div className="pt-30 lg:pt-20 bg-gray-200 dark:bg-gray-900 mx-0">
        <div className="">
          <div className="bg-transparent rounded-2xl py-6 md:py-8">
            <Container>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="col-span-1">
                  <h4 className="text-xl font-bold">BackBanchers Shop</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">We have clothes that suits your style and which you're proud to wear. From women to men.</p>
                  <div className="flex gap-3 mt-4">
                    <a href="#" aria-label="Twitter" className="w-8 h-8 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm">
                      <FaTwitter className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                    </a>
                    <a href="#" aria-label="Facebook" className="w-8 h-8 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm">
                      <FaFacebookF className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                    </a>
                    <a href="#" aria-label="Instagram" className="w-8 h-8 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm">
                      <FaInstagram className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                    </a>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold mb-3">Company</h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li>About</li>
                    <li>Features</li>
                    <li>Works</li>
                    <li>Career</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold mb-3">Help</h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li>Customer Support</li>
                    <li>Delivery Details</li>
                    <li>Terms & Conditions</li>
                    <li>Privacy Policy</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold mb-3">FAQ</h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li>Account</li>
                    <li>Manage Deliveries</li>
                    <li>Orders</li>
                    <li>Payments</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold mb-3">Resources</h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li>Free eBooks</li>
                    <li>Development Tutorial</li>
                    <li>How to - Blog</li>
                    <li>Youtube Playlist</li>
                  </ul>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>

      {/* Bottom footer with payments */}
      <div className="border-t border-gray-200 dark:border-gray-700 py-4 bg-gray-200 dark:bg-gray-900">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">BackBanchers Shop © {new Date().getFullYear()}. All Rights Reserved</div>

              <div className="flex items-center gap-3">
              <button aria-label="Stripe" className="bg-white rounded-md p-2 shadow-sm flex items-center justify-center">
                <SiStripe className="w-10 h-5 text-indigo-600" />
              </button>
              <button aria-label="PayPal" className="bg-white rounded-md p-2 shadow-sm flex items-center justify-center">
                <SiPaypal className="w-10 h-5 text-blue-700" />
              </button>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
