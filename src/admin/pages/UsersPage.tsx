import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IconSax } from '../../components/IconSax';
import { logActivity } from '../services/adminService';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export const UsersPage: React.FC = () => {
  const { user, setActivityLogs } = useApp();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<UserRecord[]>([
    { id: 'u-1', name: 'Bruce Wayne', email: 'bruce@wayne.com', role: 'Customer', status: 'active' },
    { id: 'u-2', name: 'Peter Parker', email: 'peter@spider.com', role: 'Customer', status: 'active' },
    { id: 'u-3', name: 'Sarah Connor', email: 'sarah@gmail.com', role: 'Customer', status: 'suspended' },
    { id: 'u-4', name: 'Gwen Stacy', email: 'gwen@stacy.com', role: 'Staff', status: 'active' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Customer');
  const [status, setStatus] = useState('active');
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIdx !== null) {
      setUsers(prev => prev.map((u, i) => i === editingIdx ? { id: u.id, name, email, role, status } : u));
      logActivity(user.name, `Updated User Account: ${name}`, setActivityLogs);
    } else {
      setUsers(prev => [...prev, { id: `u-${Date.now()}`, name, email, role, status }]);
      logActivity(user.name, `Created User Account: ${name}`, setActivityLogs);
    }
    setShowModal(false);
    setName('');
    setEmail('');
    setEditingIdx(null);
  };

  const handleEdit = (idx: number) => {
    const u = users[idx];
    setName(u.name);
    setEmail(u.email);
    setRole(u.role);
    setStatus(u.status);
    setEditingIdx(idx);
    setShowModal(true);
  };

  const handleDelete = (id: string, uName: string) => {
    if (window.confirm(`Delete user "${uName}" permanently?`)) {
      setUsers(prev => prev.filter(u => u.id !== id));
      logActivity(user.name, `Deleted User Account: ${uName}`, setActivityLogs);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="text-start">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold theme-color m-0">Users Directory</h4>
          <p className="text-muted fs-8 m-0">Manage global store user credentials and permissions.</p>
        </div>
        <button 
          onClick={() => { setEditingIdx(null); setName(''); setEmail(''); setShowModal(true); }} 
          className="btn btn-dark btn-sm rounded-pill px-3 py-2 fw-semibold fs-7"
        >
          + Add User
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
            placeholder="Search users by name or email..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table align-middle fs-7 mb-0 text-start">
            <thead>
              <tr className="table-light text-muted">
                <th>Name</th>
                <th>Email ID</th>
                <th>Role</th>
                <th>Account Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u, idx) => (
                <tr key={u.id}>
                  <td className="fw-semibold theme-color">{u.name}</td>
                  <td>{u.email}</td>
                  <td><span className="badge bg-light text-dark border">{u.role}</span></td>
                  <td>
                    <span className={`badge px-2 py-1 rounded-pill ${u.status === 'active' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="text-end">
                    <div className="d-flex justify-content-end gap-1">
                      <button 
                        onClick={() => handleEdit(idx)} 
                        className="btn btn-sm btn-light border p-1 rounded"
                        title="Edit User"
                      >
                        <IconSax name="edit-2" className="fs-7 text-muted" />
                      </button>
                      <button 
                        onClick={() => handleDelete(u.id, u.name)} 
                        className="btn btn-sm btn-light border p-1 rounded text-danger"
                        title="Delete User"
                      >
                        <IconSax name="trash" className="fs-7" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1040 }} onClick={() => setShowModal(false)} />
          <div className="modal fade show d-block" tabIndex={-1} style={{ zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '365px' }}>
              <div className="modal-content border-0 p-3 rounded-4 shadow bg-white text-dark">
                <form onSubmit={handleAdd}>
                  <div className="modal-header border-0 p-0 mb-3 d-flex justify-content-between align-items-center">
                    <h5 className="modal-title fw-bold m-0">{editingIdx !== null ? '✏ Edit User' : '👤 Add User'}</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
                  </div>
                  <div className="modal-body p-0">
                    <div className="mb-2">
                      <label className="form-label fs-8 text-muted mb-1">Full Name</label>
                      <input type="text" className="form-control form-control-sm" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-2">
                      <label className="form-label fs-8 text-muted mb-1">Email ID</label>
                      <input type="email" className="form-control form-control-sm" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <label className="form-label fs-8 text-muted mb-1">Role Type</label>
                        <select className="form-select form-select-sm" value={role} onChange={(e) => setRole(e.target.value)}>
                          <option value="Customer">Customer</option>
                          <option value="Staff">Staff</option>
                          <option value="Editor">Editor</option>
                        </select>
                      </div>
                      <div className="col-6">
                        <label className="form-label fs-8 text-muted mb-1">Status</label>
                        <select className="form-select form-select-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
                          <option value="active">Active</option>
                          <option value="suspended">Suspended</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer border-0 p-0 mt-3">
                    <button type="submit" className="btn btn-dark w-100 py-2 rounded-pill fs-7 fw-semibold">Save User</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default UsersPage;
