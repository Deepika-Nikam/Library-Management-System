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
    <div className="book-card" style={styles.card}>
      <h3>{book.title}</h3>
      <p><strong>Author:</strong> {book.author_name}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p>Available: {book.available_count}</p>
      {isOutOfStock ? <span style={{color: 'red'}}>Out of Stock</span> : <button onClick={() => handleBorrow(book.id)}>Borrow</button>}
      <button style={styles.button} disabled={book.available_count === 0}>
        Borrow Book
      </button>
    </div>
  );
};

const styles = {
  card: { border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', margin: '10px' },
  button: { marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }
};

export default BookCard;


// Change this logic in your BookCard component


// And make sure you are displaying the correct variable:
