import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [stats, setStats] = useState({ total_books: 0, active_loans: 0, total_students: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/admin/stats');
                setStats(res.data);
            } catch (err) { console.error(err); }
        };
        fetchStats();
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>📊 Library Intelligence</h2>
            <div style={styles.statsGrid}>
                <div style={{...styles.card, borderTop: '4px solid #3498db'}}>
                    <div style={styles.iconBox}>📚</div>
                    <div>
                        <p style={styles.cardLabel}>Total Collection</p>
                        <h3 style={styles.cardNumber}>{stats.total_books}</h3>
                    </div>
                </div>
                <div style={{...styles.card, borderTop: '4px solid #e67e22'}}>
                    <div style={styles.iconBox}>⏳</div>
                    <div>
                        <p style={styles.cardLabel}>Books Issued</p>
                        <h3 style={styles.cardNumber}>{stats.active_loans}</h3>
                    </div>
                </div>
                <div style={{...styles.card, borderTop: '4px solid #2ecc71'}}>
                    <div style={styles.iconBox}>🎓</div>
                    <div>
                        <p style={styles.cardLabel}>Registered Students</p>
                        <h3 style={styles.cardNumber}>{stats.total_students}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { animation: 'fadeIn 0.5s ease' },
    title: { marginBottom: '30px', color: '#2c3e50', fontWeight: '700' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px' },
    card: { backgroundColor: 'white', padding: '25px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' },
    iconBox: { fontSize: '30px', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '12px' },
    cardLabel: { margin: 0, color: '#7f8c8d', fontSize: '14px', fontWeight: '600' },
    cardNumber: { margin: 0, fontSize: '28px', color: '#2c3e50' }
};

export default Dashboard;