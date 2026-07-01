import React from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const ShippingAddress: React.FC = () => {
  const { addresses, selectedAddressId, setSelectedAddress, deleteAddress, setView } = useApp();

  const handleSelect = (id: string) => {
    setSelectedAddress(id);
  };

  const handleApply = () => {
    if (!selectedAddressId) {
      alert('Please select a shipping address.');
      return;
    }
    setView('payment');
  };

  return (
    <div className="pb-5 bg-light min-vh-100 text-start">
      {/* header */}
      <header className="section-t-space bg-white py-3 px-3 shadow-sm position-sticky top-0 w-100" style={{ zIndex: 100 }}>
        <div className="custom-container">
          <div className="header-panel d-flex align-items-center">
            <button onClick={() => setView('checkout')} className="btn p-0 border-0 bg-transparent me-3">
              <IconSax name="arrow-left" className="back-btn fs-4 text-dark" />
            </button>
            <h3 className="m-0 fs-5 fw-bold theme-color">Shipping Details</h3>
          </div>
        </div>
      </header>

      {/* address selection list */}
      <section className="shipping-details-sec my-3 px-3">
        <div className="custom-container">
          {addresses.length === 0 ? (
            <div className="text-center py-5">
              <IconSax name="location" className="fs-1 text-muted mb-3" />
              <h5 className="theme-color">No Addresses Found</h5>
              <p className="text-muted fs-7">Add a new address to continue with your checkout.</p>
            </div>
          ) : (
            <ul className="address-list list-unstyled p-0 m-0">
              {addresses.map((addr) => (
                <li
                  key={addr.id}
                  onClick={() => handleSelect(addr.id)}
                  className={`shipping-address bg-white p-3 rounded-3 border mb-3 text-start position-relative ${selectedAddressId === addr.id ? 'border-primary' : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="form-check d-flex align-items-center gap-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="addressRadio"
                        checked={selectedAddressId === addr.id}
                        onChange={() => handleSelect(addr.id)}
                      />
                      <label className="form-check-label fw-bold theme-color fs-6 m-0">{addr.name} ({addr.type})</label>
                    </div>
                    <div className="options d-flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setView('new-address', { address: addr }); // edit mode
                        }}
                        className="btn p-0 border-0 bg-transparent"
                        aria-label="Edit address"
                      >
                        <IconSax name="edit-2" className="icons fs-5 text-muted" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteAddress(addr.id);
                        }}
                        className="btn p-0 border-0 bg-transparent"
                        aria-label="Delete address"
                      >
                        <IconSax name="trash" className="icons fs-5 text-danger" />
                      </button>
                    </div>
                  </div>
                  <div className="address-details ps-4">
                    <p className="text-muted fs-7 m-0 mb-1">{addr.houseNo}, {addr.locality}, {addr.city}, {addr.state} - {addr.pincode}</p>
                    <h5 className="content-number text-muted fs-7 m-0">Phone: {addr.phone}</h5>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={() => setView('new-address')}
            className="btn gray-btn btn-light border w-100 py-3 rounded-pill fw-semibold mb-3 fs-7"
          >
            + Add New Address
          </button>

          <div className="apply-btn mt-4">
            <button onClick={handleApply} className="btn theme-btn text-white w-100 py-3 rounded-pill fw-semibold text-uppercase" style={{ backgroundColor: '#122636' }}>
              Apply
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
