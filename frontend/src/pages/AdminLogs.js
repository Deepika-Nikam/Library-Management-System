import React, { useEffect, useState } from 'react';
import api from '../services/api';
import axios from 'axios';

const AdminLogs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
    const fetchLogs = async () => {
        try {
            // Add '/api' if your backend uses it as a prefix
            const res = await axios.get('http://localhost:5000/api/admin/logs', {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setLogs(res.data);
        } catch (err) {
            console.error("The 404 is happening here:", err.config.url);
        }
    };
    fetchLogs();
}, []);

const handleReturn = async (transactionId) => {
    try {
        await axios.put(`http://localhost:5000/api/admin/return/${transactionId}`, {}, {
            headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        
        alert("Book marked as returned!");
        
        // Refresh the logs automatically so the button disappears
        window.location.reload(); 
    } catch (err) {
        console.error("Return failed:", err);
        alert("Could not process return.");
    }
};



    return (
        <div style={styles.container}>
            <h2 style={styles.header}>📊 System Transaction Logs</h2>
            <table style={styles.table}>
                <thead>
                    <tr style={styles.thead}>
                        <th>User</th>
                        <th>Book</th>
                        <th>Issued On</th>
                        <th>Status</th>
                        <th>Returned On</th>
                        <th>Action</th>
                    </tr>
                </thead>
<tbody>
  {logs.length > 0 ? (
    logs.map((log) => (
      <tr key={log.id}>
        <td>{log.user_name}</td>
        <td>{log.book_name}</td>
        <td>{new Date(log.issue_date).toLocaleDateString()}</td>
        <td>{log.status}</td>
        <td>{log.return_date ? new Date(log.return_date).toLocaleDateString() : '—'}</td>
        <td>
  {log.status === 'issued' && (
    <button 
      onClick={() => handleReturn(log.id)}
      style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
    >
      Mark as Returned
    </button>
  )}
</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
        No transactions found in the system.
      </td>
    </tr>
  )}
</tbody>
            </table>
        </div>
    );
};

const styles = {
    container: { padding: '40px', maxWidth: '1000px', margin: '0 auto' },
    header: { textAlign: 'center', marginBottom: '30px', color: '#2c3e50' },
    table: { width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
    thead: { backgroundColor: '#34495e', color: 'white', textAlign: 'left' },
    tr: { borderBottom: '1px solid #eee', padding: '10px' },
    issued: { color: '#e67e22', fontWeight: 'bold' },
    returned: { color: '#27ae60', fontWeight: 'bold' }
};


export default AdminLogs;