import React, { useState } from 'react';
import axios from 'axios';

const AddBookForm = () => {
    // State keys updated to match your database columns
    const [book, setBook] = useState({ 
        book_name: '', 
        author: '', 
        isbn: '', 
        count: 1 
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Mapping state to match your backend expectations
            const payload = {
                book_name: book.book_name,
                author: book.author,
                isbn: book.isbn,
                count: parseInt(book.count),
                available_count: parseInt(book.count) // Initially, available equals total count
            };

            await axios.post('http://localhost:5000/api/admin/add-book', payload, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });

            alert("✨ Book successfully added to the database!");
            
            // Reset form
            setBook({ book_name: '', author: '', isbn: '', count: 1 });
        } catch (err) {
            console.error(err);
            alert("❌ Error: Could not add book. Ensure all fields are correct.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.card}>
            <div style={styles.header}>
                <h2 style={styles.title}>📖 Catalog New Book</h2>
                <p style={styles.subtitle}>Update the database with new library inventory</p>
            </div>
            
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Book Title</label>
                    <input 
                        style={styles.input}
                        type="text" 
                        placeholder="e.g. Atomic Habits" 
                        value={book.book_name} 
                        onChange={(e) => setBook({...book, book_name: e.target.value})} 
                        required 
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Author Name</label>
                    <input 
                        style={styles.input}
                        type="text" 
                        placeholder="e.g. James Clear" 
                        value={book.author} 
                        onChange={(e) => setBook({...book, author: e.target.value})} 
                        required 
                    />
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ ...styles.inputGroup, flex: 2 }}>
                        <label style={styles.label}>ISBN Number</label>
                        <input 
                            style={styles.input}
                            type="text" 
                            placeholder="13-digit code" 
                            value={book.isbn} 
                            onChange={(e) => setBook({...book, isbn: e.target.value})} 
                            required 
                        />
                    </div>
                    <div style={{ ...styles.inputGroup, flex: 1 }}>
                        <label style={styles.label}>Total Stock</label>
                        <input 
                            style={styles.input}
                            type="number" 
                            min="1"
                            value={book.count} 
                            onChange={(e) => setBook({...book, count: e.target.value})} 
                            required 
                        />
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    style={loading ? {...styles.button, opacity: 0.7} : styles.button}
                >
                    {loading ? 'Processing...' : '➕ Add to Collection'}
                </button>
            </form>
        </div>
    );
};

const styles = {
    card: {
        maxWidth: '550px',
        margin: '20px auto',
        background: '#ffffff',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        border: '1px solid #eaeaea',
        animation: 'fadeIn 0.5s ease'
    },
    header: { textAlign: 'center', marginBottom: '30px' },
    title: { margin: '0', color: '#2c3e50', fontSize: '24px', fontWeight: '700' },
    subtitle: { color: '#7f8c8d', fontSize: '14px', marginTop: '5px' },
    form: { display: 'flex', flexDirection: 'column', gap: '20px' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
    label: { fontSize: '14px', fontWeight: '600', color: '#34495e', paddingLeft: '5px' },
    input: { 
        padding: '12px 15px', borderRadius: '8px', border: '1px solid #dcdde1', 
        fontSize: '15px', outline: 'none', backgroundColor: '#f9f9f9' 
    },
    button: { 
        marginTop: '10px', backgroundColor: '#3498db', color: 'white', 
        padding: '14px', border: 'none', borderRadius: '8px', 
        fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(52, 152, 219, 0.2)', transition: '0.3s'
    }
};

export default AddBookForm;