import React, { useState } from 'react';
import Dashboard from './Dashboard';
import AdminLogs from './AdminLogs';
import AddBookForm from './AddBookForm';
import ManageBooks from './ManageBooks';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import BookIcon from '@mui/icons-material/Book';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div style={styles.container}>
            <aside style={styles.sidebar}>
                <div style={styles.brand}>
                    <span style={{fontSize: '24px'}}><AdminPanelSettingsIcon style={{ fontSize: '30px' }} /></span>
                    <h2 style={styles.brandText}>LMS ADMIN</h2>
                </div>
                
                <nav style={styles.navStack}>
                    <button 
                        style={activeTab === 'dashboard' ? styles.activeBtn : styles.btn} 
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <QueryStatsIcon style={{ marginRight: '10px', fontSize: '18px' }} />Statistics Overview
                    </button>
                    <button 
                        style={activeTab === 'logs' ? styles.activeBtn : styles.btn} 
                        onClick={() => setActiveTab('logs')}
                    >
                         <BookIcon style={{ marginRight: '10px', fontSize: '18px' }} />System Logs
                    </button>
                    <button 
                        style={activeTab === 'add' ? styles.activeBtn : styles.btn} 
                        onClick={() => setActiveTab('add')}
                    >
                        <AddBoxIcon style={{ marginRight: '10px', fontSize: '18px' }} />Add New Book
                    </button>
                    <button
                        style={activeTab === 'manage' ? styles.activeBtn : styles.btn} 
                        onClick={() => setActiveTab('manage')}
                    >
                        <CollectionsBookmarkIcon style={{ marginRight: '10px', fontSize: '18px' }} />Manage Books
                    </button>
                </nav>
            </aside>

            <main style={styles.content}>
                <div style={styles.topBar}>
                    <span>Welcome back, <strong>Admin</strong></span>
                </div>
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'logs' && <AdminLogs />}
                {activeTab === 'add' && <AddBookForm />}
                {activeTab === 'manage' && <ManageBooks />}
            </main>
        </div>
    );
};

const styles = {
    container: { display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: "'Inter', sans-serif" },
    sidebar: { width: '280px', backgroundColor: '#1e293b', padding: '30px 20px', display: 'flex', flexDirection: 'column', color: '#f8fafc' },
    brand: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', paddingLeft: '10px' },
    brandText: { fontSize: '18px', fontWeight: 'bold', margin: 0, letterSpacing: '1px' },
    navStack: { display: 'flex', flexDirection: 'column', gap: '8px' },
    btn: { padding: '14px 18px', cursor: 'pointer', backgroundColor: 'transparent', color: '#94a3b8', border: 'none', textAlign: 'left', borderRadius: '12px', fontSize: '15px', transition: '0.2s', fontWeight: '500' },
    activeBtn: { padding: '14px 18px', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white', border: 'none', textAlign: 'left', borderRadius: '12px', fontSize: '15px', fontWeight: '600', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' },
    content: { flex: 1, padding: '40px', overflowY: 'auto' },
    topBar: { marginBottom: '30px', display: 'flex', justifyContent: 'flex-end', fontSize: '14px', color: '#64748b' }
};

export default AdminDashboard;