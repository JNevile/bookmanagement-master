import React from 'react';

const SearchInput = ({ searchQuery, onSearch }) => (
  <div className="mb-4">
    <input
      type="text"
      placeholder="Search by title, author, keyword, or publication date..."
      value={searchQuery}
      onChange={(e) => onSearch(e.target.value)}
      aria-label="Search books"
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default SearchInput;
