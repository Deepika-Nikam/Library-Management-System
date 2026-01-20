// frontend/src/pages/AdminDashboard.js
import React, { useState } from 'react';
import api from '../services/api'; // The axios instance we created yesterday

const AdminDashboard = () => {
    const [bookData, setBookData] = useState({
        book_name: '',
        author: '',
        category: '',
        count: 1
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setBookData({ ...bookData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/books/add', bookData);
            setMessage(`Success: ${res.data.book.book_name} added!`);
            setBookData({ book_name: '', author: '', category: '', count: 1 });
        } catch (err) {
            setMessage('Error adding book. Make sure you are logged in as Admin.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Admin Management</h1>
            <div style={styles.card}>
                <h3>Add New Book</h3>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input name="book_name" placeholder="Book Title" value={bookData.book_name} onChange={handleChange} required style={styles.input}/>
                    <input name="author" placeholder="Author" value={bookData.author} onChange={handleChange} required style={styles.input}/>
                    <input name="category" placeholder="Category (e.g. CS, Fiction)" value={bookData.category} onChange={handleChange} style={styles.input}/>
                    <input name="count" type="number" placeholder="Copies" value={bookData.count} onChange={handleChange} style={styles.input}/>
                    <button type="submit" style={styles.button}>Add to Library</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    card: { border: '1px solid #ddd', padding: '20px', borderRadius: '8px', maxWidth: '500px' },
    form: { display: 'flex', flexDirection: 'column' },
    input: { marginBottom: '10px', padding: '8px' },
    button: { padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }
};

export default AdminDashboard;