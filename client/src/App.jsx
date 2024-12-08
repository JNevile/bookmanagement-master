import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import RestrictedRoute from './components/RestrictedRoute';
import PublicRoute from './components/PublicRoute';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* Public Route: Redirects to /dashboard if authenticated */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        {/* Restricted Route: Protects /dashboard */}
        <Route
          path="/dashboard"
          element={
            <RestrictedRoute>
              <AdminDashboard />
            </RestrictedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
