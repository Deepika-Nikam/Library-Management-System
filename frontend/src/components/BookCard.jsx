// frontend/src/components/BookCard.js
import React from 'react';
import api from '../services/api';

const BookCard = ({ book }) => {

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

  return (
    <div style={styles.card}>
      {/* Check if these match your SQL column names exactly */}
      <h3>{book.book_name}</h3> 
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Category:</strong> {book.category}</p>
      <p><strong>Stock:</strong> {book.available_count}</p>
      
      {/* If you have an ISBN column, make sure it's named correctly */}
      <p><strong>ISBN:</strong> {book.isbn || 'N/A'}</p>

      <button 
        disabled={book.available_count <= 0}
        onClick={() => handleBorrow(book.id)}
      >
        {book.available_count > 0 ? 'Borrow Book' : 'Out of Stock'}
      </button>
    </div>
  );
};

const styles = {
  card: { border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', margin: '10px' },
  button: { marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }
};

export default BookCard;


