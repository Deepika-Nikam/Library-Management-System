// frontend/src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  const role = localStorage.getItem('role');

const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload(); // Force a clean state
  };

  console.log("Current Token:", token);
console.log("Current Role:", userRole);
  return (
    <nav style={styles.nav}>
      <h2>📚 LMS</h2>
      <div>
        {token ? (
          // Links visible only when LOGGED IN
          <>
            <Link to="/books" style={styles.link}>Books</Link>
            <Link to="/profile" style={styles.link}>My Loans</Link>
            {token && userRole === 'admin' && (
          <>
            <Link to="/admin-dashboard" style={styles.link}>Admin Panel</Link>
            <Link to="/admin/logs" style={styles.adminLink}>Admin Logs</Link>
          </>
        )}
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </>
        ) : (
          // Links visible only when LOGGED OUT
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
        
      </div>
    </nav>
  );
};

const styles = {
  nav: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    padding: '1rem', 
    background: '#333', 
    color: '#fff',
    alignItems: 'center'
  },
  link: { 
    color: '#fff', 
    margin: '0 10px', 
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  logoutBtn: { 
    background: '#dc3545', 
    color: 'white', 
    border: 'none', 
    cursor: 'pointer', 
    padding: '5px 12px',
    borderRadius: '4px',
    marginLeft: '10px'
  }
};

export default Navbar;