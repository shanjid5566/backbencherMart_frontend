import React from 'react';
import { Link } from 'react-router';
import { FiChevronRight } from 'react-icons/fi';

const Breadcrumb = ({ category }) => {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6">
      <Link to="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
        Home
      </Link>
      <FiChevronRight className="w-4 h-4 text-gray-400" />
      <span className="text-gray-900 dark:text-white font-medium capitalize">{category || 'All Products'}</span>
    </nav>
  );
};

export default Breadcrumb;
