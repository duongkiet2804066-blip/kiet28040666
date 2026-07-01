import React from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const ManageAddress: React.FC = () => {
  const { addresses, deleteAddress, setView } = useApp();

  const handleEdit = (addr: any) => {
    setView('new-address', { address: addr, backView: 'manage-address' });
  };

  const handleAdd = () => {
    setView('new-address', { backView: 'manage-address' });
  };

  return (
    <div className="pb-5 bg-light min-vh-100 text-start">
      {/* header */}
      <header className="section-t-space bg-white py-3 px-3 shadow-sm position-sticky top-0 w-100" style={{ zIndex: 100 }}>
        <div className="custom-container">
          <div className="header-panel d-flex align-items-center">
            <button onClick={() => setView('profile')} className="btn p-0 border-0 bg-transparent me-3">
              <IconSax name="arrow-left" className="back-btn fs-4 text-dark" />
            </button>
            <h3 className="m-0 fs-5 fw-bold theme-color">Manage Address</h3>
          </div>
        </div>
      </header>

      {/* address book list */}
      <section className="my-3 px-3">
        <div className="custom-container">
          {addresses.length === 0 ? (
            <div className="text-center py-5 bg-white rounded-3 border">
              <IconSax name="location" className="fs-1 text-muted mb-3" />
              <h5 className="theme-color fw-semibold">No Saved Addresses</h5>
              <p className="text-muted fs-7">You haven't saved any addresses yet.</p>
            </div>
          ) : (
            <ul className="address-list list-unstyled p-0 m-0">
              {addresses.map((addr) => (
                <li
                  key={addr.id}
                  className="shipping-address bg-white p-3 rounded-3 border mb-3 text-start position-relative"
                >
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="badge bg-secondary fs-8">{addr.type}</span>
                    <div className="options d-flex gap-2">
                      <button
                        onClick={() => handleEdit(addr)}
                        className="btn p-0 border-0 bg-transparent"
                        aria-label="Edit address"
                      >
                        <IconSax name="edit-2" className="icons fs-5 text-muted" />
                      </button>
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="btn p-0 border-0 bg-transparent"
                        aria-label="Delete address"
                      >
                        <IconSax name="trash" className="icons fs-5 text-danger" />
                      </button>
                    </div>
                  </div>
                  <h4 className="fw-semibold theme-color fs-6 mb-1">{addr.name}</h4>
                  <div className="address-details">
                    <p className="text-muted fs-7 m-0 mb-1">{addr.houseNo}, {addr.locality}, {addr.city}, {addr.state} - {addr.pincode}</p>
                    <h5 className="content-number text-muted fs-7 m-0">Phone: {addr.phone}</h5>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={handleAdd}
            className="btn theme-btn text-white w-100 py-3 rounded-pill fw-semibold mt-4 fs-7 text-uppercase"
            style={{ backgroundColor: '#122636' }}
          >
            + Add New Address
          </button>
        </div>
      </section>
    </div>
  );
};
