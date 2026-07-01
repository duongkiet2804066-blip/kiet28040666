import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IconSax } from '../../components/IconSax';
import { logActivity } from '../services/adminService';

interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  locked: boolean;
  city: string;
}

export const CustomersPage: React.FC = () => {
  const { user, setActivityLogs } = useApp();
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState<CustomerRecord[]>([
    { id: 'c-1', name: 'Bruce Wayne', email: 'bruce@wayne.com', phone: '+1 (555) 019-2834', ordersCount: 12, totalSpent: 2500, locked: false, city: 'Gotham' },
    { id: 'c-2', name: 'Peter Parker', email: 'peter@spider.com', phone: '+1 (555) 048-2839', ordersCount: 3, totalSpent: 450, locked: false, city: 'New York' },
    { id: 'c-3', name: 'Sarah Connor', email: 'sarah@gmail.com', phone: '+1 (555) 289-4930', ordersCount: 1, totalSpent: 17, locked: true, city: 'Los Angeles' },
    { id: 'c-4', name: 'Tony Stark', email: 'tony@stark.com', phone: '+1 (555) 893-1834', ordersCount: 8, totalSpent: 14800, locked: false, city: 'Malibu' }
  ]);

  const [selectedCust, setSelectedCust] = useState<CustomerRecord | null>(null);

  const handleToggleLock = (id: string) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === id) {
        const nextState = !c.locked;
        logActivity(user.name, `${nextState ? 'Locked' : 'Unlocked'} Customer Account: ${c.name}`, setActivityLogs);
        return { ...c, locked: nextState };
      }
      return c;
    }));
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="text-start">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold theme-color m-0">Customer Accounts</h4>
          <p className="text-muted fs-8 m-0">Manage registered customer profiles, monitor purchases, and block/unblock accounts.</p>
        </div>
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
            placeholder="Search customers by name, email, city..." 
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
                <th>Customer</th>
                <th>Contact Details</th>
                <th>Location</th>
                <th>Total Purchases</th>
                <th>Total Spent</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((c) => (
                <tr key={c.id}>
                  <td className="fw-semibold theme-color">{c.name}</td>
                  <td>
                    <div>{c.email}</div>
                    <div className="text-muted fs-8">{c.phone}</div>
                  </td>
                  <td>{c.city}</td>
                  <td>{c.ordersCount} orders</td>
                  <td className="fw-bold text-success">${c.totalSpent.toLocaleString()}</td>
                  <td>
                    <span className={`badge px-2 py-1 rounded-pill ${c.locked ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success'}`}>
                      {c.locked ? 'Locked' : 'Active'}
                    </span>
                  </td>
                  <td className="text-end">
                    <div className="d-flex justify-content-end gap-1">
                      <button 
                        onClick={() => setSelectedCust(c)} 
                        className="btn btn-sm btn-light border p-1 rounded"
                        title="View details"
                      >
                        <IconSax name="info-circle" className="fs-7 text-muted" />
                      </button>
                      <button 
                        onClick={() => handleToggleLock(c.id)} 
                        className={`btn btn-sm px-2 py-1 rounded fw-semibold border ${c.locked ? 'btn-danger text-white bg-danger' : 'btn-light text-danger'}`}
                        title={c.locked ? 'Unlock Account' : 'Lock Account'}
                      >
                        {c.locked ? 'Unlock' : 'Lock'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">No customers match your search criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Dialog */}
      {selectedCust && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1040 }} onClick={() => setSelectedCust(null)} />
          <div className="modal fade show d-block" tabIndex={-1} style={{ zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '380px' }}>
              <div className="modal-content border-0 p-3 rounded-4 shadow bg-white text-dark">
                <div className="modal-header border-0 p-0 mb-3 d-flex justify-content-between align-items-center">
                  <h5 className="modal-title fw-bold m-0">👤 Customer Profile</h5>
                  <button type="button" className="btn-close" onClick={() => setSelectedCust(null)} />
                </div>
                <div className="modal-body p-0 fs-7">
                  <p className="mb-2"><strong>Full Name:</strong> {selectedCust.name}</p>
                  <p className="mb-2"><strong>Email Address:</strong> {selectedCust.email}</p>
                  <p className="mb-2"><strong>Phone Number:</strong> {selectedCust.phone}</p>
                  <p className="mb-2"><strong>Residential City:</strong> {selectedCust.city}</p>
                  <p className="mb-2"><strong>Total Orders Placed:</strong> {selectedCust.ordersCount} times</p>
                  <p className="mb-2"><strong>Total Amount Spent:</strong> <span className="text-success fw-bold">${selectedCust.totalSpent.toLocaleString()}</span></p>
                  <p className="mb-0"><strong>Account Locker Status:</strong> {selectedCust.locked ? '🔒 Locked / Restricted' : '✅ Active / Normal'}</p>
                </div>
                <div className="modal-footer border-0 p-0 mt-3">
                  <button onClick={() => setSelectedCust(null)} className="btn btn-dark w-100 py-2 rounded-pill fs-7 fw-semibold">Close Profile</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default CustomersPage;
