import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '', email: '', password: '', role: 'student'
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/register', formData);
            toast.success("✨ Account created! You can now login.");
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <span style={styles.icon}>📝</span>
                    <h2 style={styles.title}>Join the Library</h2>
                    <p style={styles.subtitle}>Start your reading journey today</p>
                </div>

                {error && <div style={styles.errorBox}>{error}</div>}

                <form onSubmit={onSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Full Name</label>
                        <input name="username" placeholder="John Doe" onChange={onChange} required style={styles.input} />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input name="email" type="email" placeholder="john@example.com" onChange={onChange} required style={styles.input} />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input name="password" type="password" placeholder="At least 6 characters" onChange={onChange} required style={styles.input} />
                    </div>
                    
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Account Type</label>
                        <select name="role" onChange={onChange} style={styles.input}>
                            <option value="student">Student</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>

                    <button type="submit" style={styles.button}>Create Account</button>
                </form>

                <p style={styles.footerText}>
                    Already have an account? <Link to="/login" style={styles.link}>Sign In</Link>
                </p>
            </div>
        </div>
    );
};

// Reusing style structure for consistency, changing primary colors
const styles = {
    page: { height: '95vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' },
    card: { width: '420px', padding: '40px', background: 'white', borderRadius: '20px', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', textAlign: 'center' },
    header: { marginBottom: '25px' },
    icon: { fontSize: '40px' },
    title: { fontSize: '24px', color: '#1e293b', margin: '10px 0 5px 0' },
    subtitle: { fontSize: '14px', color: '#64748b' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
    label: { fontSize: '13px', fontWeight: '600', color: '#475569' },
    input: { padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' },
    button: { padding: '14px', background: '#10b981', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '16px', fontWeight: '600', marginTop: '10px' },
    errorBox: { background: '#fff1f2', color: '#e11d48', padding: '10px', borderRadius: '8px', fontSize: '14px', marginBottom: '15px' },
    footerText: { marginTop: '20px', fontSize: '14px', color: '#64748b' },
    link: { color: '#10b981', textDecoration: 'none', fontWeight: '600' }
};

export default Register;