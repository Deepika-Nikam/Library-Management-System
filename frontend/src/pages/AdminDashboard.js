import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ total_books: 0, active_loans: 0, total_students: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/admin/stats');
                setStats(res.data);
            } catch (err) {
                console.error("Error fetching stats:", err);
            }
        };
        fetchStats();
    }, []);

    // The data for the chart or display
    const chartData = [
        { name: 'Available', value: stats.total_books - stats.active_loans },
        { name: 'Issued', value: parseInt(stats.active_loans) },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h2>📊 Library Overview</h2>
            <div style={styles.statsContainer}>
                <div style={styles.card}>
                    <h3>📚 Total Books</h3>
                    <p style={styles.statNumber}>{stats.total_books}</p>
                </div>
                <div style={styles.card}>
                    <h3>⏳ Active Loans</h3>
                    <p style={styles.statNumber}>{stats.active_loans}</p>
                </div>
                <div style={styles.card}>
                    <h3>🎓 Students</h3>
                    <p style={styles.statNumber}>{stats.total_students}</p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    statsContainer: { display: 'flex', gap: '20px', justifyContent: 'center' },
    card: { padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', textAlign: 'center', minWidth: '200px' },
    statNumber: { fontSize: '2rem', color: '#007bff', fontWeight: 'bold' }
};

export default AdminDashboard;