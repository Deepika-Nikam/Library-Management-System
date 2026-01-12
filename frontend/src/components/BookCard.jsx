// frontend/src/components/BookCard.js
import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="book-card" style={styles.card}>
      <h3>{book.title}</h3>
      <p><strong>Author:</strong> {book.author_name}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <span style={{ color: book.stock > 0 ? 'green' : 'red' }}>
        {book.stock > 0 ? `${book.stock} Available` : 'Out of Stock'}
      </span>
      <button style={styles.button} disabled={book.stock === 0}>
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