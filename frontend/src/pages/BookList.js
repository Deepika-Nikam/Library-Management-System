// frontend/src/pages/BookList.js
import React, { useEffect, useState, useCallback} from 'react';
import BookCard from '../components/BookCard';
// import { getAllBooks } from '../services/bookService'; // You'll define this next
import api from '../services/api';
import { bookService } from '../services/bookService';


const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

// Filter the books array based on search input
const filteredBooks = books.filter(book => 
    book.book_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn?.includes(searchTerm)
);



const fetchBooks = useCallback(async () => {
    const data = await bookService.getAllBooks();
    setBooks(data);
}, []);


  useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

  if (loading) return <h2>Loading the library...</h2>;

return (
    <div style={styles.container}>
        {/* Search Bar Section */}
        <div style={styles.searchWrapper}>
            <input 
                type="text" 
                placeholder="Search by Title, Author, or ISBN..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
            />
        </div>

        {/* THE GRID SECTION - This is the fix */}
        <div style={styles.grid}>
            {filteredBooks.length > 0 ? (
                filteredBooks.map(book => (
                    <BookCard key={book.id} book={book} onBorrowSuccess={fetchBooks} />
                ))
            ) : (
                <p>No books found matching your search.</p>
            )}
        </div>
    </div>
);



  // return (
  //   <div style={{ padding: '2rem' }}>
  //     <h1>Available Books</h1>
  //     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
  //       {books.map(book => (
  //         <BookCard key={book.id} book={book} />
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default BookList;

const styles = {
    container: {
        padding: '40px 20px',
        maxWidth: '1300px', // Limits width so cards don't stretch too far on huge monitors
        margin: '0 auto',
    },
    searchWrapper: {
        marginBottom: '40px',
        display: 'flex',
        justifyContent: 'center',
    },
    searchInput: {
        width: '100%',
        maxWidth: '600px',
        padding: '15px 25px',
        borderRadius: '30px',
        border: '1px solid #ddd',
        fontSize: '1.1rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        outline: 'none',
    },
    grid: {
        display: 'flex',           // Activates Flexbox
        flexWrap: 'wrap',          // Allows items to drop to next line
        justifyContent: 'center',  // Centers the cards in the middle of the screen
        gap: '30px',               // Adds equal spacing between all cards
    }
};