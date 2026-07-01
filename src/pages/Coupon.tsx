import React from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const Coupon: React.FC = () => {
  const { setView, setPromoApplied } = useApp();

  const coupons = [
    { code: 'WELCOME15', title: 'Welcome Discount', desc: 'Get $15 off on your first order.', discount: '15$' },
    { code: 'GOOGLE20', title: 'Google Pay Special', desc: 'Get $20 cashback on using GPay.', discount: '20$' },
    { code: 'SOFA50', title: 'Mega Sofa Sale', desc: 'Save 50% on selected sofas.', discount: '50%' },
    { code: 'FREEFREE', title: 'Free Shipping Promo', desc: 'Free standard shipping on orders over $50.', discount: 'FREE' }
  ];

  const handleApplyCoupon = (_code: string) => {
    // For demo purposes, applying any coupon enables the welcome $15 discount
    setPromoApplied(true);
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
            <h3 className="m-0 fs-5 fw-bold theme-color">Coupons</h3>
          </div>
        </div>
      </header>

      {/* coupon section */}
      <section className="section-b-space my-3 px-3">
        <div className="custom-container">
          <div className="row gy-3">
            {coupons.map((coupon, idx) => (
              <div key={idx} className="col-12">
                <div className="coupon-box bg-white rounded-3 border p-3 d-flex justify-content-between align-items-center position-relative overflow-hidden">
                  <div className="coupon-discount fw-bold text-center pe-3 border-end" style={{ width: '80px', color: '#ff4f4f' }}>
                    <span className="fs-4 d-block">{coupon.discount}</span> OFF
                  </div>
                  <div className="coupon-details flex-grow-1 ps-3 text-start">
                    <h4 className="fw-semibold theme-color fs-6 m-0">{coupon.title}</h4>
                    <p className="text-muted fs-8 my-1">{coupon.desc}</p>
                    <div className="coupon-apply d-flex justify-content-between align-items-center mt-2">
                      <h6 className="light-text m-0 fs-8 fw-mono bg-light px-2 py-1 rounded">#{coupon.code}</h6>
                      <button 
                        onClick={() => handleApplyCoupon(coupon.code)} 
                        className="apply-btn btn p-0 border-0 fw-semibold text-primary fs-7 text-uppercase"
                      >
                        apply
                      </button>
                    </div>
                  </div>
                  <img className="img-fluid coupon-right position-absolute end-0 top-0 h-100" src="/assets/images/subtract.png" alt="subtract" style={{ width: '12px', pointerEvents: 'none' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
