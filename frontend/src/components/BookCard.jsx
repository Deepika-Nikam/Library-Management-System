import React, { useState, useEffect } from 'react';
import api from '../services/api';


const BookCard = ({ book, onBorrowSuccess }) => {
  const [coverUrl, setCoverUrl] = useState(null);



    const isOutOfStock = book.available_count <= 0; 

// frontend/src/components/BookCard.jsx
const handleBorrow = async () => {
    try {
        // Ensure you are using 'id' or 'book_id' based on your SQL table
        const res = await api.post('/transactions/issue', { bookId: book.id });
        alert(res.data.message);
        window.location.reload(); // Refresh to see updated count
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
          // Get the thumbnail from the first result
          const image = data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
          setCoverUrl(image);
        } catch (error) {
          console.error("Error fetching cover:", error);
        }
      }
    };
    fetchCover();
  }, [book.isbn]);

  const displayImage = coverUrl || 'https://via.placeholder.com/150x200?text=No+Cover+Found';

return (
    <div style={styles.card} className="book-card-hover">
        <div style={styles.imageContainer}>
            <img src={displayImage} alt={book.book_name} style={styles.image} />
        </div>
        <div style={styles.content}>
            <div>
                <h3 style={styles.title}>{book.book_name}</h3>
                <p style={styles.author}>by {book.author}</p>
                <div style={styles.detailsRow}>
                    <span style={styles.isbnBadge}>ISBN: {book.isbn}</span>
                    <span style={styles.stockText}>Qty: {book.available_count}</span>
                </div>
            </div>
            
            <button 
                onClick={handleBorrow} 
                disabled={book.available_count <= 0}
                style={book.available_count > 0 ? styles.button : styles.disabledButton}
            >
                {book.available_count > 0 ? 'Borrow Book' : 'Out of Stock'}
            </button>
        </div>
    </div>
);
};
export default BookCard;

const styles = {
    card: {
        width: '260px',
        backgroundColor: '#fff',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        margin: '15px',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #eee',
    },
    imageContainer: {
        width: '100%',
        height: '320px',
        backgroundColor: '#f8f9fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover', // Ensures the book cover fills the space perfectly
    },
    content: {
        padding: '15px',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        margin: '0 0 5px 0',
        color: '#2c3e50',
        display: '-webkit-box',
        WebkitLineClamp: '2', // Limits title to 2 lines
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
    author: {
        fontSize: '0.9rem',
        color: '#7f8c8d',
        marginBottom: '10px',
    },
    detailsRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
        fontSize: '0.85rem',
    },
    isbnBadge: {
        backgroundColor: '#e1f5fe',
        color: '#01579b',
        padding: '2px 8px',
        borderRadius: '4px',
        fontWeight: '500',
    },
    stockText: {
        fontWeight: '600',
        color: '#27ae60',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    disabledButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#bdc3c7',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'not-allowed',
    }
};