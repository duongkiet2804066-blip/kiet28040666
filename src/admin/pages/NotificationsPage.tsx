import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { logActivity } from '../services/adminService';

export const NotificationsPage: React.FC = () => {
  const { user, setActivityLogs } = useApp();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'Push' | 'Email'>('Push');
  const [success, setSuccess] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && message.trim()) {
      logActivity(user.name, `Sent ${type} Broadcast: "${title}"`, setActivityLogs);
      setTitle('');
      setMessage('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div className="text-start">
      <div className="mb-3">
        <h4 className="fw-bold theme-color m-0">Push Broadcast Alerts</h4>
        <p className="text-muted fs-8 m-0">Compose and dispatch system alerts and push marketing campaigns to users.</p>
      </div>

      {success && (
        <div className="alert alert-success py-2 fs-7 mb-3 border-0 rounded">
          Broadcast alert dispatched to users successfully!
        </div>
      )}

      <form onSubmit={handleSend} className="card p-3 border-0 shadow-sm rounded-3 bg-white">
        <div className="mb-2">
          <label className="form-label fs-8 text-muted mb-1">Broadcast Alert Title</label>
          <input 
            type="text" 
            className="form-control form-control-sm" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-2">
          <label className="form-label fs-8 text-muted mb-1">Broadcast Method</label>
          <select 
            className="form-select form-select-sm" 
            value={type} 
            onChange={(e) => setType(e.target.value as any)}
          >
            <option value="Push">App Push Notification</option>
            <option value="Email">Email Marketing Newsletter</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label fs-8 text-muted mb-1">Message Content</label>
          <textarea 
            className="form-control form-control-sm" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            rows={3} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-dark w-100 py-2 rounded-pill fs-7 fw-semibold">
          Send Broadcast
        </button>
      </form>
    </div>
  );
};
export default NotificationsPage;
