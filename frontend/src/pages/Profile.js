// frontend/src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Profile = () => {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const res = await api.get('/transactions/my-loans');
                setLoans(res.data);
            } catch (err) {
                console.error("Error fetching loans");
            }
        };
        fetchLoans();
    }, []);

    // frontend/src/pages/Profile.js

const handleReturn = async (transactionId, bookId) => {
    try {
        // Calling the backend route we just created
        await api.post('/transactions/return', { transactionId, bookId });
        
        alert("Book returned successfully!");
        
        // Refresh the list so the returned book disappears from "My Loans"
        window.location.reload(); 
    } catch (err) {
        console.error(err);
        alert(err.response?.data?.error || "Failed to return book");
    }
};

    return (
        <div style={{ padding: '20px' }}>
            <h2>My Borrowed Books</h2>
            {loans.length === 0 ? <p>You haven't borrowed any books yet.</p> : (
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #ccc' }}>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Issue Date</th>
                        </tr>
                    </thead>
                    <tbody>
{loans.map(loan => (
    <tr key={loan.id}>
        <td>{loan.book_name}</td>
        <td>{new Date(loan.issue_date).toLocaleDateString()}</td>
        <td>
            <button 
                onClick={() => handleReturn(loan.id, loan.book_id)}
                style={{ backgroundColor: '#ffc107', cursor: 'pointer' }}
            >
                Return Book
            </button>
        </td>
    </tr>
))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Profile;