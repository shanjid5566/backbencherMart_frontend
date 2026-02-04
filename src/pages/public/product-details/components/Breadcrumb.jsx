import React from "react";
import { Link } from "react-router";
import { FiChevronRight } from "react-icons/fi";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 text-sm sm:text-base mb-6 lg:mb-8 overflow-x-auto">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index === items.length - 1 ? (
            <span className="text-gray-900 dark:text-white font-medium whitespace-nowrap">
              {item}
            </span>
          ) : (
            <>
              <Link
                to={index === 0 ? "/" : `/${item.toLowerCase()}`}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors whitespace-nowrap"
              >
                {item}
              </Link>
              <FiChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
