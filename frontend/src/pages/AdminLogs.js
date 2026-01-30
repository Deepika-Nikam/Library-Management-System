import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

const AdminLogs = () => {
    const [logs, setLogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/admin/logs', {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
                console.log("Backend Data Check:", res.data); 
                setLogs(res.data);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    const handleReturn = async (transactionId) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/return/${transactionId}`, {}, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            toast.success("Book returned and inventory updated!");
            setLogs(logs.map(log => 
                log.id === transactionId 
                ? { ...log, status: 'Returned', return_date: new Date().toISOString() } 
                : log
            ));
        } catch (err) {
            toast.error("Failed to process return.");
        }
    };

    const filteredLogs = logs.filter(log => {
        if (!searchTerm.trim()) return true;
        
        const search = searchTerm.toLowerCase();
        const student = (log.user_name || "").toLowerCase(); 
        const book = (log.book_name || "").toLowerCase();
        const status = (log.status || "").toLowerCase();

        return student.includes(search) || book.includes(search) || status.includes(search);
    });

    return (
        <div style={styles.container}>
            <div style={styles.headerSection}>
                <div style={styles.titleArea}>
                    <h2 style={styles.header}>System Transaction Logs</h2>
                    <p style={styles.subHeader}>Track all book movements and student activity</p>
                </div>
                
                {/* Search Bar Implementation */}
                <div style={styles.searchContainer}>
                    <span style={styles.searchIcon}><SearchIcon /></span>
                    <input 
                        type="text" 
                        placeholder="Search student or book..." 
                        style={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>User</th>
                            <th style={styles.th}>Book</th>
                            <th style={styles.th}>Issued On</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Returned On</th>
                            <th style={styles.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" style={styles.empty}>Fetching transactions...</td></tr>
                        ) : filteredLogs.length > 0 ? (
                            filteredLogs.map((log, index) => (
                                <tr key={log.id} style={index % 2 === 0 ? styles.trEven : styles.trOdd}>
                                    <td style={styles.td}><strong>{log.user_name}</strong></td>
                                    <td style={styles.td}>{log.book_name}</td>
                                    <td style={styles.td}>{new Date(log.issue_date).toLocaleDateString()}</td>
                                    <td style={styles.td}>
                                        <span style={log.status?.toLowerCase() === 'issued' ? styles.badgeIssued : styles.badgeReturned}>
                                            {log.status?.toUpperCase()}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        {log.return_date ? new Date(log.return_date).toLocaleDateString() : '—'}
                                    </td>
                                    <td style={styles.td}>
                                        {log.status?.toLowerCase() === 'issued' && (
                                            <button onClick={() => handleReturn(log.id)} style={styles.returnBtn}>
                                                Return Book
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={styles.empty}>
                                    {searchTerm ? `No results found for "${searchTerm}"` : "The library history is empty."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '20px', animation: 'fadeIn 0.5s ease' },
    headerSection: { 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '25px', 
        borderLeft: '5px solid #3498db', 
        paddingLeft: '15px' 
    },
    titleArea: { flex: 1 },
    header: { margin: 0, color: '#2c3e50', fontSize: '24px' },
    subHeader: { color: '#7f8c8d', fontSize: '14px', marginTop: '5px' },
    
    // Search Styles
    searchContainer: { position: 'relative', display: 'flex', alignItems: 'center' },
    searchIcon: { position: 'absolute', left: '10px', color: '#95a5a6' },
    searchInput: { 
        padding: '10px 10px 10px 35px', 
        borderRadius: '8px', 
        border: '1px solid #ddd', 
        width: '250px', 
        outline: 'none' 
    },

    tableWrapper: { backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { backgroundColor: '#f8f9fa', padding: '15px', textAlign: 'left', color: '#34495e', borderBottom: '2px solid #edf2f7', fontSize: '14px' },
    td: { padding: '15px', color: '#4a5568', fontSize: '14px', borderBottom: '1px solid #edf2f7' },
    trEven: { backgroundColor: '#ffffff' },
    trOdd: { backgroundColor: '#fafbfc' },
    badgeIssued: { padding: '4px 10px', borderRadius: '20px', backgroundColor: '#fff3e0', color: '#e67e22', fontSize: '12px', fontWeight: 'bold' },
    badgeReturned: { padding: '4px 10px', borderRadius: '20px', backgroundColor: '#e8f5e9', color: '#27ae60', fontSize: '12px', fontWeight: 'bold' },
    returnBtn: { padding: '6px 12px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
    empty: { textAlign: 'center', padding: '40px', color: '#a0aec0' }
};

export default AdminLogs;