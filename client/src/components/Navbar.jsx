import React from 'react';
import { useAuth } from '../AuthContext'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { authToken, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear the authentication state
    navigate('/'); // Redirect to the login page
  };

  return (
    <nav className="bg-gray-800 text-white py-4 px-6 shadow-md">
      <div className="flex justify-between items-center">
        {/* App Name */}
        <h1 className="text-lg font-bold">Book Management</h1>
        
        {/* Conditional Logout Button */}
        {authToken && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-sm font-medium px-4 py-2 rounded transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
