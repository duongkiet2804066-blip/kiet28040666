import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IconSax } from '../../components/IconSax';
import { logActivity } from '../services/adminService';

export const LogsPage: React.FC = () => {
  const { activityLogs, setActivityLogs, user } = useApp();
  const [search, setSearch] = useState('');

  const handleClear = () => {
    if (window.confirm('Clear all logs permanently?')) {
      setActivityLogs([]);
      logActivity(user.name, 'Cleared all system activity logs', setActivityLogs);
    }
  };

  const filteredLogs = activityLogs.filter(l => 
    l.admin.toLowerCase().includes(search.toLowerCase()) || 
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.date.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="text-start">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold theme-color m-0">Activity Logs</h4>
          <p className="text-muted fs-8 m-0">Monitor back-office administrator actions, logs, and database edits.</p>
        </div>
        <button onClick={handleClear} className="btn btn-sm btn-outline-danger px-3 py-2 rounded">
          Clear Logs
        </button>
      </div>

      {/* Toolbar */}
      <div className="card border-0 shadow-sm p-3 rounded-3 bg-white mb-3">
        <div className="input-group input-group-sm w-50">
          <span className="input-group-text bg-light border-end-0">
            <IconSax name="search-normal-2" className="fs-7 text-muted" />
          </span>
          <input 
            type="text" 
            className="form-control form-control-sm bg-light border-start-0" 
            placeholder="Search logs by operator name, description, date..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden bg-white p-3">
        <ul className="list-group p-0 list-group-flush fs-7" style={{ maxHeight: '420px', overflowY: 'auto' }}>
          {filteredLogs.map((log) => (
            <li key={log.id} className="list-group-item py-3 px-2 text-start">
              <div className="d-flex justify-content-between text-muted fs-8 mb-1">
                <span className="fw-semibold">Admin: {log.admin}</span>
                <span>{log.date}</span>
              </div>
              <p className="theme-color fw-bold m-0">{log.action}</p>
            </li>
          ))}
          {filteredLogs.length === 0 && (
            <li className="list-group-item py-5 text-center text-muted border-0">
              No audit logs match current search filters.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
export default LogsPage;
