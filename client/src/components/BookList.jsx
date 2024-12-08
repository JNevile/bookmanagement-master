import React from 'react';
import { useAuth } from '../AuthContext';
import BookCard from './BookCard';

const BookList = ({ books, setBooks, onView, onEdit }) => {
  const { authToken } = useAuth(); // Access authToken from context

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:7000/books/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.ok) {
        window.location.reload();
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));

      } else {
        alert('Error deleting book');
      }
    } catch (error) {
      console.error('Delete book error:', error);
    }
  };

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.length > 0 ? (
        books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onView={onView}
            onEdit={onEdit}
            onDelete={handleDelete} // Pass delete handler
          />
        ))
      ) : (
        <p className="text-gray-500 col-span-full text-center">
          No books match your search criteria.
        </p>
      )}
    </ul>
  );
};

export default BookList;
