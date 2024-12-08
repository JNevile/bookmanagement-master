import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const RestrictedRoute = ({ children }) => {
  const { authToken } = useContext(AuthContext);

  if (!authToken) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RestrictedRoute;
