import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import BookList from './pages/BookList';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Register from './pages/Register'; 

const ProtectedRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (roleRequired && userRole !== roleRequired) {
    return <Navigate to="/books" />; 
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
    <Route path="/admin/*" element={ role === 'admin'? <AdminDashboard /> : <Navigate to="/books" />}/>
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
  <ToastContainer position="top-right" autoClose={3000} />
</Router>
  );
}

export default App;

