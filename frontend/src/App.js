// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import BookList from './pages/BookList';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Register from './pages/Register'; 
import AdminLogs from './pages/AdminLogs';

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
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  return (
<Router>
  <Navbar />
  <Routes> 
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
        <Route 
          path="/admin/logs" 
          element={token && role === 'admin' ? <AdminLogs /> : <Navigate to="/login" />} 
        />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
</Router>
  );
}

export default App;

