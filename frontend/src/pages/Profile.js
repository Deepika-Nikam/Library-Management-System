import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Profile = () => {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const res = await api.get('/transactions/my-loans');
                setLoans(res.data);
            } catch (err) { console.error("Error fetching loans"); }
        };
        fetchLoans();
    }, []);

    const handleReturn = async (transactionId, bookId) => {
        try {
            await api.post('/transactions/return', { transactionId, bookId });
            alert("✨ Book returned successfully!");
            setLoans(loans.filter(loan => loan.id !== transactionId)); // Optimized: No reload needed
        } catch (err) {
            alert(err.response?.data?.error || "Failed to return book");
        }
    };

    const getRemainingDays = (issueDate) => {
        const today = new Date();
        const deadline = new Date(issueDate);
        deadline.setDate(new Date(issueDate).getDate() + 14);
        return Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    };

    const renderDueStatus = (days) => {
        if (days < 0) return <span style={styles.badgeOverdue}>⚠️ Overdue {Math.abs(days)}d</span>;
        if (days <= 3) return <span style={styles.badgeUrgent}>⏳ {days}d left</span>;
        return <span style={styles.badgeSafe}>✅ {days} days</span>;
    };

    return (
        <div style={styles.container}>
            <div style={styles.headerBox}>
                <h2 style={styles.title}>📚 My Borrowed Books</h2>
                <p style={styles.subtitle}>Manage your active loans and return dates</p>
            </div>

            {loans.length === 0 ? (
                <div style={styles.emptyState}>
                    <p>Your library bag is empty. Time to find a new adventure!</p>
                </div>
            ) : (
                <div style={styles.tableCard}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.thRow}>
                                <th style={styles.th}>Book Title</th>
                                <th style={styles.th}>Borrowed On</th>
                                <th style={styles.th}>Remaining Time</th>
                                <th style={styles.th}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.map((loan) => (
                                <tr key={loan.id} style={styles.tr}>
                                    <td style={styles.td}><strong>{loan.book_name}</strong></td>
                                    <td style={styles.td}>{new Date(loan.issue_date).toLocaleDateString()}</td>
                                    <td style={styles.td}>{renderDueStatus(getRemainingDays(loan.issue_date))}</td>
                                    <td style={styles.td}>
                                        <button onClick={() => handleReturn(loan.id, loan.book_id)} style={styles.returnBtn}>
                                            Return Book
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', animation: 'fadeIn 0.6s ease' },
    headerBox: { marginBottom: '30px' },
    title: { color: '#2c3e50', fontSize: '28px', margin: 0 },
    subtitle: { color: '#7f8c8d', fontSize: '15px' },
    tableCard: { backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' },
    table: { width: '100%', borderCollapse: 'collapse' },
    thRow: { backgroundColor: '#f8f9fa', borderBottom: '2px solid #edf2f7' },
    th: { padding: '18px', textAlign: 'left', color: '#34495e', fontSize: '14px', fontWeight: '600' },
    td: { padding: '18px', borderBottom: '1px solid #edf2f7', color: '#4a5568', fontSize: '15px' },
    badgeOverdue: { backgroundColor: '#fff5f5', color: '#e53e3e', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' },
    badgeUrgent: { backgroundColor: '#fffaf0', color: '#dd6b20', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' },
    badgeSafe: { backgroundColor: '#f0fff4', color: '#38a169', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' },
    returnBtn: { padding: '8px 16px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: '0.3s' },
    emptyState: { textAlign: 'center', padding: '60px', backgroundColor: '#f9f9f9', borderRadius: '15px', color: '#7f8c8d' }
};

export default Profile;