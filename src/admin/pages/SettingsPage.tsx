import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { logActivity } from '../services/adminService';

export const SettingsPage: React.FC = () => {
  const { shopSettings, setShopSettings, user, setActivityLogs } = useApp();
  const [name, setName] = useState(shopSettings.name);
  const [tax, setTax] = useState(shopSettings.tax);
  const [shipping, setShipping] = useState(shopSettings.shippingFee);
  const [success, setSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShopSettings({ ...shopSettings, name, tax, shippingFee: shipping });
    logActivity(user.name, 'Updated general store configuration parameters', setActivityLogs);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="text-start">
      <div className="mb-3">
        <h4 className="fw-bold theme-color m-0">Global Store Settings</h4>
        <p className="text-muted fs-8 m-0">Configure store settings, sales tax rates, and shipping policies.</p>
      </div>

      {success && (
        <div className="alert alert-success py-2 fs-7 mb-3 border-0 rounded">
          Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="card p-3 border-0 shadow-sm rounded-3 bg-white">
        <div className="mb-3">
          <label className="form-label fs-8 text-muted mb-1 fw-bold">Store Name</label>
          <input 
            type="text" 
            className="form-control form-control-sm" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        
        <div className="row g-2 mb-3">
          <div className="col-6">
            <label className="form-label fs-8 text-muted mb-1 fw-bold">Sales Tax (%)</label>
            <input 
              type="number" 
              className="form-control form-control-sm" 
              value={tax} 
              onChange={(e) => setTax(Number(e.target.value))} 
              required 
            />
          </div>
          <div className="col-6">
            <label className="form-label fs-8 text-muted mb-1 fw-bold">Flat Shipping Fee ($)</label>
            <input 
              type="number" 
              className="form-control form-control-sm" 
              value={shipping} 
              onChange={(e) => setShipping(Number(e.target.value))} 
              required 
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fs-8 text-muted mb-1 fw-bold">Active Payment Gateways</label>
          <div className="d-flex gap-3 fs-7">
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="gateCredit" defaultChecked />
              <label className="form-check-label ms-1" htmlFor="gateCredit">Credit / Debit Card</label>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="gatePaypal" defaultChecked />
              <label className="form-check-label ms-1" htmlFor="gatePaypal">PayPal Checkout</label>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="gateCod" defaultChecked />
              <label className="form-check-label ms-1" htmlFor="gateCod">Cash on Delivery</label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-dark py-2 px-4 rounded-pill fs-7 fw-semibold w-100">
          Save Configuration
        </button>
      </form>
    </div>
  );
};
export default SettingsPage;
