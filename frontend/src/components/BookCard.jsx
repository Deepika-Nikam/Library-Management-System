import React, { useState, useEffect } from 'react';
import api from '../services/api';

const BookCard = ({ book, onBorrowSuccess }) => {
    const [coverUrl, setCoverUrl] = useState(null);

    const handleBorrow = async () => {
        try {
            const res = await api.post('/transactions/issue', { bookId: book.id });
            alert(res.data.message);
            onBorrowSuccess(); // Trigger parent fetch instead of reload
        } catch (err) {
            alert(err.response?.data?.error || "Borrow failed");
        }
    };

    useEffect(() => {
        const fetchCover = async () => {
            if (book.isbn) {
                try {
                    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}`);
                    const data = await response.json();
                    setCoverUrl(data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail);
                } catch (error) { console.error("Error fetching cover:", error); }
            }
        };
        fetchCover();
    }, [book.isbn]);

    const displayImage = coverUrl || 'https://via.placeholder.com/150x220?text=No+Cover';

    return (
        <div style={styles.card}>
            <div style={styles.imageWrapper}>
                <img src={displayImage} alt={book.book_name} style={styles.image} />
                {book.available_count == 0 && <div style={styles.soldOutBadge}>Sold Out</div>}
            </div>
            <div style={styles.content}>
                <div style={{minHeight: '100px'}}>
                    <h3 style={styles.title}>{book.book_name}</h3>
                    <p style={styles.author}>by {book.author}</p>
                </div>
                <div style={styles.footer}>
                    <div style={styles.meta}>
                        <span style={styles.stock}>📦 {book.available_count} Left</span>
                    </div>
                    <button 
                        onClick={handleBorrow} 
                        disabled={book.available_count == 0}
                        style={book.available_count > 0 ? styles.button : styles.disabledButton}
                    >
                        {book.available_count > 0 ? 'Borrow Now' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    card: { width: '250px', backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease' },
    imageWrapper: { position: 'relative', height: '280px', backgroundColor: '#f1f1f1' },
    image: { width: '100%', height: '100%', objectFit: 'cover' },
    soldOutBadge: { position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' },
    content: { padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' },
    title: { fontSize: '18px', fontWeight: '700', color: '#2d3436', margin: 0, lineHeight: '1.3' },
    author: { fontSize: '14px', color: '#636e72', margin: '5px 0' },
    footer: { borderTop: '1px solid #eee', paddingTop: '15px', marginTop: '5px' },
    meta: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px' },
    stock: { fontSize: '12px', fontWeight: '600', color: '#27ae60' },
    button: { width: '100%', padding: '10px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', transition: '0.2s' },
    disabledButton: { width: '100%', padding: '10px', backgroundColor: '#dfe6e9', color: '#b2bec3', border: 'none', borderRadius: '8px', cursor: 'not-allowed' }
};

export default BookCard;