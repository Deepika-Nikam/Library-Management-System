const StatsDashboard = ({ stats }) => {
    return (
        <div style={styles.statsContainer}>
            <div style={styles.card}>
                <h3>📚 Total Books</h3>
                <p style={styles.statNumber}>{stats.total_books || 0}</p>
            </div>
            <div style={styles.card}>
                <h3>⏳ Active Loans</h3>
                <p style={styles.statNumber}>{stats.active_loans || 0}</p>
            </div>
            <div style={styles.card}>
                <h3>🎓 Students</h3>
                <p style={styles.statNumber}>{stats.total_students || 0}</p>
            </div>
        </div>
    );
};

const styles = {
    statsContainer: { display: 'flex', gap: '20px', marginBottom: '30px', justifyContent: 'center' },
    card: { 
        padding: '20px', 
        borderRadius: '8px', 
        backgroundColor: '#fff', 
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
        textAlign: 'center',
        minWidth: '150px'
    },
    statNumber: { fontSize: '2rem', fontWeight: 'bold', color: '#007bff', margin: '10px 0' }
};

export default StatsDashboard;