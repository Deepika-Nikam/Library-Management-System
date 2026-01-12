// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import BookList from './pages/BookList';
import AdminDashboard from './pages/AdminDashboard'; // We will create this next
import Navbar from './components/Navbar';

// Helper: Protected Route Component
const ProtectedRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (roleRequired && userRole !== roleRequired) {
    return <Navigate to="/books" />; // Send students back if they try to access admin
  }

  return children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Student/General Routes */}
        <Route 
          path="/books" 
          element={
            <ProtectedRoute>
              <BookList />
            </ProtectedRoute>
          } 
        />

        {/* Admin Only Routes */}
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;