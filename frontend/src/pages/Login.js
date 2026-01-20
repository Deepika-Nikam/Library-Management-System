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
    const onSubmit = async e => {
    e.preventDefault();
    try {
        const res = await axios.post('http://localhost:5000/api/users/login', formData);
        
        // CRITICAL: Ensure these names match what your backend sends!
        localStorage.setItem('token', res.data.token); 
        localStorage.setItem('role', res.data.user.role); 
        
        console.log("Login Success! Role:", res.data.user.role);
        navigate('/books'); // Or wherever you want them to go
    } catch (err) {
        console.error(err.response?.data?.error);
        setError(err.response?.data?.error || 'Login failed');
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