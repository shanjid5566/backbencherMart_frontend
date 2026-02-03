import React from 'react';

export default function Container({ children, className = '' }) {
  return (
    <div className={`container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ${className}`}>
      {children}
    </div>
  );
}
