// frontend/src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


    // frontend/src/pages/Login.js
const onSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post('http://localhost:5000/api/users/login', formData);
        
        // 1. Check your console to see what the backend keys are named!
        console.log("Full Backend Response:", res.data);

        // 2. Save to localStorage
        // If your backend sends 'userRole' or 'user_role', change res.data.role below
        const token = res.data.token;
        const role = res.data.role; 

        if (token) localStorage.setItem('token', token);
        if (role) {
            localStorage.setItem('role', role);
            console.log("Role saved successfully:", role);
        } else {
            console.warn("Role was missing in the backend response!");
        }

        // 3. Force a full page redirect to /books
        // This ensures App.js and Navbar.js re-read the localStorage
        window.location.href = '/books';
        
    } catch (err) {
        const errorMsg = err.response?.data?.error || err.response?.data?.msg || 'Login failed';
        console.error("Login Error:", errorMsg);
        setError(errorMsg);
    }
};

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={onSubmit}>
                <h2>Library Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input 
                    type="email" name="email" placeholder="Email" 
                    value={email} onChange={onChange} required style={styles.input} 
                />
                <input 
                    type="password" name="password" placeholder="Password" 
                    value={password} onChange={onChange} required style={styles.input} 
                />
                <button type="submit" style={styles.button}>Sign In</button>
            </form>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', marginTop: '50px' },
    form: { display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' },
    input: { marginBottom: '10px', padding: '10px' },
    button: { padding: '10px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }
};

export default Login;