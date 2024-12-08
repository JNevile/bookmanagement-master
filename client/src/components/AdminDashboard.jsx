import React, { useState, useEffect } from 'react';
import SearchInput from './SearchInput';
import BookList from './BookList';
import BookFormModal from './BookFormModal';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:7000/books');
        if (!response.ok) throw new Error('Failed to fetch books.');

        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data); // Initialize filteredBooks
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const result = books.filter((book) => {
      const titleMatch = book.title.toLowerCase().includes(lowercasedQuery);
      const authorMatch = book.author.toLowerCase().includes(lowercasedQuery);
      const keywordMatch = book.keywords?.some((keyword) =>
        keyword.toLowerCase().includes(lowercasedQuery)
      );
      const publicationDateMatch =
        book.publicationDate &&
        book.publicationDate.includes(lowercasedQuery);

      return titleMatch || authorMatch || keywordMatch || publicationDateMatch;
    });

    setFilteredBooks(result);
  }, [searchQuery, books]);

  const handleAddBook = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
    setFilteredBooks((prevFilteredBooks) => [...prevFilteredBooks, newBook]);
  };

  const handleViewBook = (book) => {
    alert(`Viewing details of ${book.title}`);
  };

  const handleEditBook = (book) => {
    alert(`Editing ${book.title}`);
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Book
        </button>
      </div>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          <SearchInput searchQuery={searchQuery} onSearch={setSearchQuery} />
          <BookList
            books={filteredBooks}
            onView={handleViewBook}
            onEdit={handleEditBook}
          />
        </>
      )}

      <BookFormModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onBookAdded={handleAddBook}
      />
    </div>
  );
};

export default AdminDashboard;
