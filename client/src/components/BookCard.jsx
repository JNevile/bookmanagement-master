import React, { useState } from "react";
import BookDetailsModal from "./BookDetailsModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EditingModal from "./EditingModal";
import { useAuth } from "../AuthContext";

const BookCard = ({ book, onEdit, onDelete }) => {
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditingModalOpen, setEditingModalOpen] = useState(false);
  const { authToken } = useAuth();

  const handleView = () => setDetailsModalOpen(true);
  const handleCloseDetailsModal = () => setDetailsModalOpen(false);

  const handleDelete = () => {
    onDelete(book.id); // Trigger delete handler passed as a prop
    setDeleteModalOpen(false); // Close confirmation modal
  };

  const handleSaveChanges = async (updatedBook) => {
    try {
      const response = await fetch(`http://localhost:7000/books/${book.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedBook),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert("Error updating book");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <li className="relative bg-white border rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {/* Book Image */}
        <div className="h-56 w-full bg-gray-100 flex justify-center items-center">
          <img
            src={book.coverImage || "https://via.placeholder.com/200x300"}
            alt={`${book.title} cover`}
            className="h-full w-auto object-cover"
          />
        </div>

        {/* Book Content */}
        <div className="p-5">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {book.title}
          </h2>
          <p className="text-sm text-gray-600 mt-1 truncate">
            <strong>Author:</strong> {book.author}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <strong>Publication:</strong> {book.publicationDate || "Unknown"}
          </p>
          {book.keywords && (
            <p className="text-xs text-gray-500 mt-2 truncate">
              <strong>Keywords:</strong> {book.keywords.join(", ")}
            </p>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex justify-between space-x-2">
            <button
              onClick={handleView}
              className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              View
            </button>
            <button
              onClick={() => setEditingModalOpen(true)}
              className="flex-1 px-4 py-2 text-sm font-medium text-green-600 border border-green-600 rounded-lg hover:bg-green-600 hover:text-white transition"
            >
              Edit
            </button>
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="flex-1 px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition"
            >
              Delete
            </button>
          </div>
        </div>

        {/* New Tag */}
        {book.isNew && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            New
          </span>
        )}
      </li>

      {/* Modals */}
      <BookDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        book={book}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        bookTitle={book.title}
      />
      <EditingModal
        isOpen={isEditingModalOpen}
        onClose={() => setEditingModalOpen(false)}
        handleSaveChanges={handleSaveChanges} // Pass the save handler
        book={book}
      />
    </>
  );
};

export default BookCard;
