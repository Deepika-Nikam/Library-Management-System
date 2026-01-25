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

const getRemainingDays = (issueDate) => {
    const today = new Date();
    const issued = new Date(issueDate);
    
    // Set deadline to 14 days after issue
    const deadline = new Date(issued);
    deadline.setDate(issued.getDate() + 14);

    // Calculate difference in milliseconds
    const diffTime = deadline - today;
    // Convert to days
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};

const renderDueStatus = (days) => {
    if (days < 0) {
        return <span style={statusStyles.overdue}>Overdue by {Math.abs(days)} days</span>;
    } else if (days <= 3) {
        return <span style={statusStyles.urgent}>Due soon: {days} days left</span>;
    }
    return <span style={statusStyles.safe}>{days} days remaining</span>;
};

const statusStyles = {
    overdue: { color: '#e74c3c', fontWeight: 'bold', backgroundColor: '#fdeaea', padding: '4px 8px', borderRadius: '4px' },
    urgent: { color: '#f39c12', fontWeight: 'bold', backgroundColor: '#fff5e6', padding: '4px 8px', borderRadius: '4px' },
    safe: { color: '#27ae60', fontWeight: '500' }
};


    return (
        <div style={{ padding: '20px' }}>
            <h2>My Borrowed Books</h2>
            {loans.length === 0 ? <p>You haven't borrowed any books yet.</p> : (
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #ccc' }}>
                            <th>Title</th>
                            <th>Issue Date</th>
                            <th>Due Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
{loans.map((loan) => {
    const daysLeft = getRemainingDays(loan.issue_date);
    return (
        <tr key={loan.id}>
            <td>{loan.book_name}</td>
            <td>{new Date(loan.issue_date).toLocaleDateString()}</td>
            <td>{renderDueStatus(daysLeft)}</td>
            <td>
                <button onClick={() => handleReturn(loan.id, loan.book_id)}>
                    Return
                </button>
            </td>
        </tr>
    );
})}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Profile;