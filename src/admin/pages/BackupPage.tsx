import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IconSax } from '../../components/IconSax';
import { logActivity } from '../services/adminService';

export const BackupPage: React.FC = () => {
  const { user, setActivityLogs } = useApp();
  const [status, setStatus] = useState<'idle' | 'running' | 'success'>('idle');
  const [history, setHistory] = useState([
    { date: '2026-06-30 09:15', size: '2.4 MB', file: 'backup_2026_06_30_0915.sql' },
    { date: '2026-06-29 09:00', size: '2.3 MB', file: 'backup_2026_06_29_0900.sql' }
  ]);

  const triggerBackup = () => {
    setStatus('running');
    setTimeout(() => {
      const now = new Date();
      const dateStr = now.toISOString().substring(0, 10).replace(/-/g, '_');
      const timeStr = now.toTimeString().substring(0, 5).replace(/:/g, '');
      const newFile = `backup_${dateStr}_${timeStr}.sql`;
      setHistory(prev => [{
        date: now.toISOString().replace('T', ' ').substring(0, 16),
        size: '2.5 MB',
        file: newFile
      }, ...prev]);
      setStatus('success');
      logActivity(user.name, `Executed DB Backup file: ${newFile}`, setActivityLogs);
      setTimeout(() => setStatus('idle'), 2000);
    }, 1500);
  };

  const handleRestore = (file: string) => {
    if (window.confirm(`Are you sure you want to restore the store database from the backup "${file}"? This will overwrite the current active data.`)) {
      alert(`Restored database state from backup file: ${file} successfully.`);
      logActivity(user.name, `Restored database state from file: ${file}`, setActivityLogs);
    }
  };

  return (
    <div className="text-start">
      <div className="mb-3">
        <h4 className="fw-bold theme-color m-0">Database Backup & Recovery</h4>
        <p className="text-muted fs-8 m-0">Trigger manual SQL database snapshots and restore backup files.</p>
      </div>
      
      <div className="card p-4 border-0 shadow-sm rounded-3 bg-white text-center mb-4">
        <IconSax name="wallet-open" className="fs-1 text-muted mb-2" />
        <h5 className="fw-bold theme-color m-0 mb-2">Create System Backup</h5>
        <p className="text-muted fs-8 max-w-lg mx-auto mb-3">
          Creates a complete system backup file including products, orders, user accounts, logs, and settings.
        </p>
        <button 
          onClick={triggerBackup} 
          disabled={status === 'running'} 
          className="btn btn-dark py-2 px-4 rounded-pill fs-7 fw-semibold"
        >
          {status === 'running' ? 'Creating Backup...' : status === 'success' ? 'Backup Created Successfully!' : 'Trigger Manual Backup'}
        </button>
      </div>

      <h5 className="fw-bold mb-2 theme-color fs-6">Backup Records</h5>
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden bg-white">
        <ul className="list-group p-0 list-group-flush fs-7">
          {history.map((h, idx) => (
            <li key={idx} className="list-group-item py-3 px-3 d-flex justify-content-between align-items-center">
              <div>
                <p className="fw-bold theme-color m-0">{h.file}</p>
                <span className="text-muted fs-8">{h.date} | Size: {h.size}</span>
              </div>
              <button 
                onClick={() => handleRestore(h.file)}
                className="btn btn-sm btn-outline-dark py-1 px-3 rounded-pill fs-8 fw-semibold"
              >
                Restore
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default BackupPage;
