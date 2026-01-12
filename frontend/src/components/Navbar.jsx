// frontend/src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <h2>📚 LMS</h2>
      <div>
        {token ? (
          <>
            <Link to="/books" style={styles.link}>Books</Link>
            {role === 'admin' && <Link to="/admin-dashboard" style={styles.link}>Admin</Link>}
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={styles.link}>Login</Link>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#333', color: '#fff' },
  link: { color: '#fff', margin: '0 10px', textDecoration: 'none' },
  logoutBtn: { background: 'red', color: 'white', border: 'none', cursor: 'pointer', padding: '5px 10px' }
};

export default Navbar;