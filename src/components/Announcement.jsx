import React, { useState } from 'react'

const Announcement = () => {
  const [showAnnouncement, setShowAnnouncement] = useState(true)

  if (!showAnnouncement) return null

  return (
    <div className="w-full bg-black text-white">
      <div className="relative flex items-center justify-center px-8 sm:px-12 py-2 sm:py-2.5 md:py-3">
        <div className="flex flex-row items-center justify-center gap-1 text-center">
          <p className="text-[11px] sm:text-sm md:text-base font-normal whitespace-nowrap">
            Sign up and get 20% off to your first order.
          </p>
          <a 
            href="#signup" 
            className="text-[11px] sm:text-sm md:text-base font-medium underline underline-offset-2 sm:underline-offset-4 hover:no-underline transition-all whitespace-nowrap ml-1"
          >
            Sign Up Now
          </a>
        </div>
        
        <button
          onClick={() => setShowAnnouncement(false)}
          className="absolute right-3 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-1"
          aria-label="Close announcement"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 sm:h-5 sm:w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Announcement
