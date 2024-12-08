import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const PublicRoute = ({ children }) => {
  const { authToken } = useAuth();

  if (authToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
