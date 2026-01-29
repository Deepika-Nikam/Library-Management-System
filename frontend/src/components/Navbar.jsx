import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Used to highlight the active link
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login'; 
};

  // Helper function to see if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <div style={styles.logoContainer} onClick={() => navigate('/books')}>
        <span style={styles.logoIcon}>📚</span>
        <h2 style={styles.logoText}>LMS <span style={styles.logoSubtext}>Pro</span></h2>
      </div>

      <div style={styles.linksContainer}>
        {token ? (
          <>
            <Link 
              to="/books" 
              style={{...styles.link, ...(isActive('/books') ? styles.activeLink : {})}}
            >
              Books
            </Link>
            <Link 
              to="/profile" 
              style={{...styles.link, ...(isActive('/profile') ? styles.activeLink : {})}}
            >
              My Loans
            </Link>
            
            {userRole === 'admin' && (
              <Link 
                to="/admin" 
                style={{...styles.link, ...(isActive('/admin') ? styles.activeLink : {})}}
              >
                Admin Panel
              </Link>
            )}

            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.registerBtn}>Get Started</Link>
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
    padding: '0.8rem 2.5rem', 
    background: 'rgba(44, 62, 80, 0.95)', // Deep elegant blue-grey
    backdropFilter: 'blur(10px)', // Frosted glass effect
    color: '#fff',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    fontFamily: "'Inter', sans-serif"
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    gap: '10px'
  },
  logoIcon: { fontSize: '24px' },
  logoText: { 
    margin: 0, 
    fontSize: '22px', 
    letterSpacing: '1px',
    fontWeight: '700'
  },
  logoSubtext: { color: '#3498db', fontWeight: '300' },
  linksContainer: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '15px' 
  },
  link: { 
    color: '#bdc3c7', 
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    padding: '8px 12px',
    borderRadius: '6px'
  },
  activeLink: { 
    color: '#fff', 
    background: 'rgba(255,255,255,0.1)' 
  },
  registerBtn: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '8px 18px',
    borderRadius: '20px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'transform 0.2s ease'
  },
  logoutBtn: { 
    background: 'transparent', 
    color: '#e74c3c', 
    border: '1.5px solid #e74c3c', 
    cursor: 'pointer', 
    padding: '6px 16px',
    borderRadius: '20px',
    fontWeight: '600',
    fontSize: '14px',
    marginLeft: '10px',
    transition: 'all 0.3s ease'
  }
};

export default Navbar;