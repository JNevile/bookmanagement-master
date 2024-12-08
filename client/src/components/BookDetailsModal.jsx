import React from 'react';

const BookDetailsModal = ({ isOpen, onClose, book }) => {
  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        {/* Book Details */}
        <div className="flex flex-col sm:flex-row">
          {/* Book Cover */}
          <div className="flex-shrink-0 mb-4 sm:mb-0">
            <img
              src={book.coverImage || 'https://via.placeholder.com/150'}
              alt={`${book.title} cover`}
              className="h-72 w-48 object-cover rounded-md"
            />
          </div>

          {/* Book Content */}
          <div className="flex-1 sm:ml-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {book.title}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Author:</strong> {book.author}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Publication Date:</strong>{' '}
              {book.publicationDate || 'Unknown'}
            </p>
            {book.keywords && book.keywords.length > 0 && (
              <p className="text-sm text-gray-600 mb-4">
                <strong>Keywords:</strong> {book.keywords.join(', ')}
              </p>
            )}
            <p className="text-sm text-gray-700">{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsModal;
