// frontend/src/pages/BookList.js
import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
// import { getAllBooks } from '../services/bookService'; // You'll define this next
import api from '../services/api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get('/books');
        setBooks(res.data);
      } catch (err) {
        console.error("Failed to fetch books", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <h2>Loading the library...</h2>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Available Books</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;