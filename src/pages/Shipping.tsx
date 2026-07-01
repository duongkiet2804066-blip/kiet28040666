import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const Shipping: React.FC = () => {
  const { setView, selectedShippingMethod, setSelectedShippingMethod } = useApp();
  const [selectedMethod, setSelectedMethod] = useState(selectedShippingMethod || {
    name: 'Regular',
    price: 15,
    arrival: 'Estimated Arrival, Mar 20-22',
    icon: 'package'
  });

  const shippingOptions = [
    { name: 'Economy', price: 10, arrival: 'Estimated Arrival, Mar 20-23', icon: 'box-tick' },
    { name: 'Regular', price: 15, arrival: 'Estimated Arrival, Mar 20-22', icon: 'package' },
    { name: 'Cargo', price: 20, arrival: 'Estimated Arrival, Mar 19-20', icon: 'truck' },
    { name: 'Express', price: 30, arrival: 'Estimated Arrival, Mar 18-19', icon: 'truck-fast' }
  ];

  const handleApply = () => {
    setSelectedShippingMethod(selectedMethod);
    setView('checkout');
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
            <h3 className="m-0 fs-5 fw-bold theme-color">Choose Shipping</h3>
          </div>
        </div>
      </header>

      {/* options list */}
      <section className="my-3 px-3">
        <div className="custom-container">
          <div className="row g-3">
            {shippingOptions.map((opt, i) => (
              <div key={i} className="col-12">
                <div
                  onClick={() => setSelectedMethod(opt)}
                  className={`shipping-box bg-white p-3 rounded-3 border d-flex gap-3 align-items-center ${selectedMethod.name === opt.name ? 'border-primary bg-light-subtle' : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-center justify-content-center bg-light rounded-circle p-2" style={{ width: '40px', height: '40px' }}>
                    <IconSax name={opt.icon} className="icons fs-4 text-muted" />
                  </div>
                  <div className="shipping-details d-flex justify-content-between align-items-center flex-grow-1">
                    <div className="shipping-info text-start">
                      <h4 className="fw-semibold theme-color fs-6 m-0">{opt.name}</h4>
                      <h5 className="text-muted fs-8 mt-1 m-0">{opt.arrival}</h5>
                    </div>
                    <div className="price d-flex align-items-center gap-2">
                      <label className="form-check-label fw-bold theme-color fs-6 m-0">${opt.price}</label>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="shippingSelect"
                        checked={selectedMethod.name === opt.name}
                        onChange={() => setSelectedMethod(opt)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button onClick={handleApply} className="btn theme-btn w-100 py-3 rounded-pill text-white mt-4 fw-semibold text-uppercase" style={{ backgroundColor: '#122636' }}>
            Apply
          </button>
        </div>
      </section>
    </div>
  );
};
