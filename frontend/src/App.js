// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import BookList from './pages/BookList';
import AdminDashboard from './pages/AdminDashboard'; // We will create this next
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Register from './pages/Register'; 

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
  <Routes> {/* Everything related to a page must be inside here */}
    <Route path="/login" element={<Login />} />
    <Route path="/books" element={<BookList />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/register" element={<Register />} />
    {/* ... other routes */}
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


// frontend/src/App.js
// Don't forget the import!

// Inside your <Routes>

// src/App.js
