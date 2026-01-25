// frontend/src/services/bookService.js
import api from './api';

export const bookService = {
    getAllBooks: async () => {
        try {
            const response = await api.get('/books');
            return response.data;
        } catch (error) {
            console.error("Error in bookService:", error);
            throw error;
        }
    },
    // You can add getBookById or searchBooks here later!
};