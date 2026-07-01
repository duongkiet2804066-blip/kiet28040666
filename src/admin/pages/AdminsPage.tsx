import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IconSax } from '../../components/IconSax';
import { logActivity } from '../services/adminService';

export const AdminsPage: React.FC = () => {
  const { admins, setAdmins, user, setActivityLogs } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Staff');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setAdmins(prev => prev.map(a => a.id === editingId ? { id: a.id, name, email, role } : a));
      logActivity(user.name, `Updated admin details: ${name} (${role})`, setActivityLogs);
    } else {
      setAdmins(prev => [...prev, { id: `adm-${Date.now()}`, name, email, role }]);
      logActivity(user.name, `Created Admin account: ${name} (${role})`, setActivityLogs);
    }
    setName('');
    setEmail('');
    setEditingId(null);
    setShowModal(false);
  };

  const handleEdit = (adm: any) => {
    setName(adm.name);
    setEmail(adm.email);
    setRole(adm.role);
    setEditingId(adm.id);
    setShowModal(true);
  };

  const handleDelete = (id: string, admName: string) => {
    if (id === 'adm-1') {
      alert('Cannot delete the root Super Admin account!');
      return;
    }
    if (window.confirm(`Delete admin account "${admName}"?`)) {
      setAdmins(prev => prev.filter(a => a.id !== id));
      logActivity(user.name, `Deleted admin account: ${admName}`, setActivityLogs);
    }
  };

  return (
    <div className="text-start">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold theme-color m-0">Administrator Accounts</h4>
          <p className="text-muted fs-8 m-0">Manage back-office administrative users, edit profiles, and set access levels.</p>
        </div>
        <button 
          onClick={() => { setEditingId(null); setName(''); setEmail(''); setShowModal(true); }} 
          className="btn btn-dark btn-sm rounded-pill px-3 py-2 fw-semibold fs-7"
        >
          + Add Admin
        </button>
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table align-middle fs-7 mb-0 text-start">
            <thead>
              <tr className="table-light text-muted">
                <th>Name</th>
                <th>Email ID</th>
                <th>Access Level</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((adm) => (
                <tr key={adm.id}>
                  <td className="fw-semibold theme-color">{adm.name}</td>
                  <td>{adm.email}</td>
                  <td><span className="badge bg-light text-dark border">{adm.role}</span></td>
                  <td className="text-end">
                    <div className="d-flex justify-content-end gap-1">
                      <button 
                        onClick={() => handleEdit(adm)} 
                        className="btn btn-sm btn-light border p-1 rounded"
                        title="Edit Admin"
                      >
                        <IconSax name="edit-2" className="fs-7 text-muted" />
                      </button>
                      <button 
                        onClick={() => handleDelete(adm.id, adm.name)} 
                        className="btn btn-sm btn-light border p-1 rounded text-danger"
                        title="Remove Admin"
                        disabled={adm.id === 'adm-1'}
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
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '350px' }}>
              <div className="modal-content border-0 p-3 rounded-4 shadow bg-white text-dark">
                <form onSubmit={handleAdd}>
                  <div className="modal-header border-0 p-0 mb-3 d-flex justify-content-between align-items-center">
                    <h5 className="modal-title fw-bold m-0">{editingId ? '✏ Edit Admin' : '🔑 Add Admin User'}</h5>
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
                    <div className="mb-3">
                      <label className="form-label fs-8 text-muted mb-1">Access Role</label>
                      <select className="form-select form-select-sm" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="Super Admin">Super Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Editor">Editor</option>
                        <option value="Staff">Staff</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer border-0 p-0 mt-3">
                    <button type="submit" className="btn btn-dark w-100 py-2 rounded-pill fs-7 fw-semibold">Save Admin</button>
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
export default AdminsPage;
