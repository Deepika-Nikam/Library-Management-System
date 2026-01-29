import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:5000/api/users/login', formData);
            
            const { token, role } = res.data;

            if (token) localStorage.setItem('token', token);
            if (role) localStorage.setItem('role', role);

            // Redirect to books
            window.location.href = '/books';
        } catch (err) {
            setError(err.response?.data?.error || err.response?.data?.msg || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <span style={styles.icon}>🔓</span>
                    <h2 style={styles.title}>Welcome Back</h2>
                    <p style={styles.subtitle}>Sign in to access your library account</p>
                </div>

                {error && <div style={styles.errorBox}>{error}</div>}

                <form onSubmit={onSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input 
                            type="email" name="email" placeholder="name@example.com" 
                            value={email} onChange={onChange} required style={styles.input} 
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input 
                            type="password" name="password" placeholder="••••••••" 
                            value={password} onChange={onChange} required style={styles.input} 
                        />
                    </div>
                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                <p style={styles.footerText}>
                    New to the library? <Link to="/register" style={styles.link}>Create an account</Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    page: { 
        height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#f8fafc' 
    },
    card: { 
        width: '400px', padding: '40px', background: 'white', 
        borderRadius: '20px', boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
        textAlign: 'center'
    },
    header: { marginBottom: '30px' },
    icon: { fontSize: '40px' },
    title: { fontSize: '24px', color: '#1e293b', margin: '10px 0 5px 0' },
    subtitle: { fontSize: '14px', color: '#64748b' },
    form: { display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
    label: { fontSize: '13px', fontWeight: '600', color: '#475569' },
    input: { 
        padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0',
        fontSize: '15px', outline: 'none', transition: '0.2s'
    },
    button: { 
        padding: '14px', background: '#3b82f6', color: 'white', 
        border: 'none', borderRadius: '10px', cursor: 'pointer',
        fontSize: '16px', fontWeight: '600', marginTop: '10px'
    },
    errorBox: { 
        background: '#fff1f2', color: '#e11d48', padding: '10px', 
        borderRadius: '8px', fontSize: '14px', marginBottom: '20px' 
    },
    footerText: { marginTop: '25px', fontSize: '14px', color: '#64748b' },
    link: { color: '#3b82f6', textDecoration: 'none', fontWeight: '600' }
};

export default Login;