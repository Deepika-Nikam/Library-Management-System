// frontend/src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'student' // Default role
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            // Adjust the URL if your backend port is different
            await axios.post('http://localhost:5000/api/users/register', formData);
            alert("Registration successful! Please login.");
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={onSubmit}>
                <h2>Library Signup</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input name="username" placeholder="Username" onChange={onChange} required style={styles.input} />
                <input name="email" type="email" placeholder="Email" onChange={onChange} required style={styles.input} />
                <input name="password" type="password" placeholder="Password" onChange={onChange} required style={styles.input} />
                
                <label>Register as:</label>
                <select name="role" onChange={onChange} style={styles.input}>
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                </select>

                <button type="submit" style={styles.button}>Register</button>
            </form>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', marginTop: '50px' },
    form: { display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' },
    input: { marginBottom: '10px', padding: '10px' },
    button: { padding: '10px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }
};

export default Register;