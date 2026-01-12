import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [stats, setStats] = useState({ books: 0, members: 0, issues: 0 });

    useEffect(() => {
        // In a real app, you'd fetch this from /api/stats
        const fetchStats = async () => {
            const res = await axios.get('http://localhost:5000/api/admin/stats');
            setStats(res.data);
        };
        fetchStats();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Library Overview</h2>
            <div style={styles.grid}>
                <div style={styles.card}>
                    <h3>📚 Total Books</h3>
                    <p>{stats.books}</p>
                </div>
                <div style={styles.card}>
                    <h3>👥 Members</h3>
                    <p>{stats.members}</p>
                </div>
                <div style={styles.card}>
                    <h3>📑 Active Issues</h3>
                    <p>{stats.issues}</p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    grid: { display: 'flex', gap: '20px' },
    card: { background: '#f4f4f4', padding: '20px', borderRadius: '10px', flex: 1, textAlign: 'center', border: '1px solid #ddd' }
};

export default Dashboard;