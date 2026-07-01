import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IconSax } from '../../components/IconSax';
import { logActivity } from '../services/adminService';

export const CouponsPage: React.FC = () => {
  const { coupons, setCoupons, user, setActivityLogs } = useApp();
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState(15);
  const [type, setType] = useState<'percent' | 'flat'>('percent');
  const [expiry, setExpiry] = useState('2026-12-31');
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.toUpperCase().trim();
    if (!cleanCode) return;
    if (coupons.some(c => c.code === cleanCode)) {
      alert('Coupon code already exists.');
      return;
    }
    setCoupons(prev => [...prev, { code: cleanCode, discount, type, expiry }]);
    logActivity(user.name, `Created Coupon: ${cleanCode}`, setActivityLogs);
    setCode('');
    setShowModal(false);
  };

  const handleDelete = (cCode: string) => {
    if (window.confirm(`Delete coupon "${cCode}"?`)) {
      setCoupons(prev => prev.filter(c => c.code !== cCode));
      logActivity(user.name, `Deleted Coupon: ${cCode}`, setActivityLogs);
    }
  };

  const filteredCoupons = coupons.filter(c => c.code.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="text-start">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold theme-color m-0">Coupons Management</h4>
          <p className="text-muted fs-8 m-0">Configure discount coupons, flat rates, and expiration limits.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-dark btn-sm rounded-pill px-3 py-2 fw-semibold fs-7">
          + Add Coupon
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
            placeholder="Search coupons by code..." 
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
                <th>Code</th>
                <th>Discount Value</th>
                <th>Discount Type</th>
                <th>Expiry Date</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoupons.map((c) => (
                <tr key={c.code}>
                  <td className="fw-bold text-primary">{c.code}</td>
                  <td className="fw-bold text-success">
                    {c.discount}{c.type === 'percent' ? '%' : '$'}
                  </td>
                  <td>
                    <span className="badge bg-light text-dark border text-capitalize">{c.type}</span>
                  </td>
                  <td className="text-muted">{c.expiry}</td>
                  <td className="text-end">
                    <button 
                      onClick={() => handleDelete(c.code)} 
                      className="btn btn-sm btn-light border p-1 rounded text-danger"
                      title="Delete Coupon"
                    >
                      <IconSax name="trash" className="fs-7" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCoupons.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-muted">No coupons found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1040 }} onClick={() => setShowModal(false)} />
          <div className="modal fade show d-block" tabIndex={-1} style={{ zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '360px' }}>
              <div className="modal-content border-0 p-3 rounded-4 shadow bg-white text-dark">
                <form onSubmit={handleAdd}>
                  <div className="modal-header border-0 p-0 mb-3 d-flex justify-content-between align-items-center">
                    <h5 className="modal-title fw-bold m-0">Create Coupon</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
                  </div>
                  <div className="modal-body p-0">
                    <div className="mb-2">
                      <label className="form-label fs-8 text-muted mb-1">Coupon Code</label>
                      <input 
                        type="text" 
                        className="form-control form-control-sm" 
                        value={code} 
                        onChange={(e) => setCode(e.target.value)} 
                        placeholder="E.g. SUMMER25" 
                        required 
                      />
                    </div>
                    <div className="row g-2 mb-2">
                      <div className="col-6">
                        <label className="form-label fs-8 text-muted mb-1">Discount Value</label>
                        <input 
                          type="number" 
                          className="form-control form-control-sm" 
                          value={discount} 
                          onChange={(e) => setDiscount(Number(e.target.value))} 
                          required 
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label fs-8 text-muted mb-1">Discount Type</label>
                        <select 
                          className="form-select form-select-sm" 
                          value={type} 
                          onChange={(e) => setType(e.target.value as any)}
                        >
                          <option value="percent">Percentage (%)</option>
                          <option value="flat">Flat Cash ($)</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fs-8 text-muted mb-1">Expiry Date</label>
                      <input 
                        type="date" 
                        className="form-control form-control-sm" 
                        value={expiry} 
                        onChange={(e) => setExpiry(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>
                  <div className="modal-footer border-0 p-0 mt-3">
                    <button type="submit" className="btn btn-dark w-100 py-2 rounded-pill fs-7 fw-semibold">Save Coupon</button>
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
export default CouponsPage;
