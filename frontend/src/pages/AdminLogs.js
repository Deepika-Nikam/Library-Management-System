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
                    </tr>
                </thead>
                <tbody>
                    {logs.map(log => (
                        <tr key={log.id} style={styles.tr}>
                            <td>{log.user_name} <br/><small>{log.user_email}</small></td>
                            <td>{log.book_name}</td>
                            <td>{new Date(log.issue_date).toLocaleDateString()}</td>
                            <td>
                                <span style={log.status === 'issued' ? styles.issued : styles.returned}>
                                    {log.status.toUpperCase()}
                                </span>
                            </td>
                            <td>{log.return_date ? new Date(log.return_date).toLocaleDateString() : '-'}</td>
                        </tr>
                    ))}
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