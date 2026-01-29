import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBooks = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/books');
            setBooks(res.data);
        } catch (err) {
            console.error("Error fetching books:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchBooks(); }, []);

    const handleUpdateStock = async (id, newValue) => {
        try {
            // Matching your backend route: router.put('/update-book/:id') 
            // and its expected body key: { available_copies }
            await axios.put(`http://localhost:5000/api/admin/update-book/${id}`, 
                { available_copies: parseInt(newValue) }, 
                { headers: { 'x-auth-token': localStorage.getItem('token') } }
            );
            
            // Refresh local state
            setBooks(books.map(b => b.id === id ? { ...b, available_count: newValue } : b));
        } catch (err) {
            toast.error("Update failed. Check if you are logged in as Admin.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Permanent Action: Delete this book from the library?")) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/delete-book/${id}`, {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
                setBooks(books.filter(b => b.id !== id));
            } catch (err) {
                toast.error("Cannot delete: This book is likely currently issued to a student.");
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>📋 Inventory Management</h2>
            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Book Details</th>
                            <th style={styles.th}>ISBN</th>
                            <th style={styles.th}>Available Stock</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4" style={styles.empty}>Loading Inventory...</td></tr>
                        ) : books.map(book => (
                            <tr key={book.id} style={styles.tr}>
                                <td style={styles.td}>
                                    <div style={{fontWeight: 'bold', color: '#2c3e50'}}>{book.book_name}</div>
                                    <div style={{fontSize: '12px', color: '#7f8c8d'}}>{book.author}</div>
                                </td>
                                <td style={styles.td}>{book.isbn || '—'}</td>
                                <td style={styles.td}>
                                    <input 
                                        type="number" 
                                        defaultValue={book.available_count} 
                                        onBlur={(e) => handleUpdateStock(book.id, e.target.value)}
                                        style={styles.stockInput}
                                    />
                                </td>
                                <td style={styles.td}>
                                    <button onClick={() => handleDelete(book.id)} style={styles.deleteBtn}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const styles = {
    container: { animation: 'fadeIn 0.5s ease' },
    header: { color: '#2c3e50', marginBottom: '20px', fontSize: '22px' },
    tableWrapper: { background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { padding: '15px', textAlign: 'left', background: '#f8f9fa', color: '#4a5568', fontSize: '13px', fontWeight: '700' },
    td: { padding: '15px', borderBottom: '1px solid #edf2f7', fontSize: '14px' },
    stockInput: { width: '50px', padding: '5px', borderRadius: '4px', border: '1px solid #d1d5db', textAlign: 'center' },
    deleteBtn: { padding: '6px 12px', background: '#ff4757', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }
};

export default ManageBooks;