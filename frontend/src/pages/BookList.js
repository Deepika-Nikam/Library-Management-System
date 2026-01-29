import React, { useEffect, useState, useCallback } from 'react';
import BookCard from '../components/BookCard';
import { bookService } from '../services/bookService';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        try {
            const data = await bookService.getAllBooks();
            setBooks(data);
        } catch (e) { console.error(e); }
        setLoading(false);
    }, []);

    useEffect(() => { fetchBooks(); }, [fetchBooks]);

    const filteredBooks = books.filter(book => 
        book.book_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={styles.container}>
            <div style={styles.heroSection}>
                <h1 style={styles.heroTitle}>Discover Your Next Story</h1>
                <div style={styles.searchWrapper}>
                    <input 
                        type="text" 
                        placeholder="Search by title or author..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                    />
                    <span style={styles.searchIcon}>🔍</span>
                </div>
            </div>

            {loading ? (
                <div style={styles.loader}>Shuffling the library shelves...</div>
            ) : (
                <div style={styles.grid}>
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map(book => (
                            <BookCard key={book.id} book={book} onBorrowSuccess={fetchBooks} />
                        ))
                    ) : (
                        <div style={styles.noResults}>No books found matching "{searchTerm}"</div>
                    )}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' },
    heroSection: { textAlign: 'center', marginBottom: '60px' },
    heroTitle: { fontSize: '36px', color: '#2c3e50', marginBottom: '25px', fontWeight: '800' },
    searchWrapper: { position: 'relative', maxWidth: '600px', margin: '0 auto' },
    searchInput: { width: '100%', padding: '16px 25px 16px 50px', borderRadius: '50px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', fontSize: '16px', outline: 'none', transition: '0.3s' },
    searchIcon: { position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px' },
    grid: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' },
    loader: { textAlign: 'center', fontSize: '20px', color: '#95a5a6', marginTop: '100px' },
    noResults: { textAlign: 'center', width: '100%', color: '#7f8c8d', fontSize: '18px', marginTop: '50px' }
};

export default BookList;