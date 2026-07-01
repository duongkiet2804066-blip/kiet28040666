import React from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const DemoListing: React.FC = () => {
  const { setView } = useApp();

  const sections = [
    {
      title: 'Onboarding & Authentication',
      pages: [
        { name: 'Onboarding (Landing)', view: 'onboarding' },
        { name: 'Login Screen', view: 'login' },
        { name: 'Register Screen', view: 'register' },
        { name: 'Forgot Password', view: 'forgot-password' },
        { name: 'OTP Verification', view: 'otp' },
        { name: 'Reset Password', view: 'reset-password' }
      ]
    },
    {
      title: 'Main Shopping Flow',
      pages: [
        { name: 'Home Page', view: 'landing' },
        { name: 'Categories List', view: 'categories' },
        { name: 'Shop / Search results', view: 'shop' },
        { name: 'Search Screen', view: 'search' },
        { name: 'Product Details (Style 1)', view: 'product-details', params: { layout: 'style1' } },
        { name: 'Product Details (Style 2)', view: 'product-details', params: { layout: 'style2' } },
        { name: 'My Cart', view: 'cart' }
      ]
    },
    {
      title: 'Checkout & Payments',
      pages: [
        { name: 'Checkout Screen', view: 'checkout' },
        { name: 'Choose Shipping', view: 'shipping' },
        { name: 'Choose Address', view: 'shipping-address' },
        { name: 'Add New Address', view: 'new-address' },
        { name: 'Payment Screen', view: 'payment' },
        { name: 'Add New Card', view: 'new-card' }
      ]
    },
    {
      title: 'Profile & Others',
      pages: [
        { name: 'User Profile', view: 'profile' },
        { name: 'Edit Profile Settings', view: 'profile-setting' },
        { name: 'Manage Payment Methods', view: 'manage-payment' },
        { name: 'Order History', view: 'order-history' },
        { name: 'Order Tracking Screen', view: 'order-tracking' },
        { name: 'Notification Center', view: 'notification' },
        { name: 'Language Settings', view: 'language' },
        { name: 'Application Settings', view: 'setting' },
        { name: 'Terms and Conditions', view: 'terms-conditions' },
        { name: 'Help & FAQs', view: 'help' }
      ]
    }
  ];

  return (
    <div className="pb-5 bg-light min-vh-100 text-start">
      {/* header */}
      <header className="section-t-space bg-white py-3 px-3 shadow-sm position-sticky top-0 w-100" style={{ zIndex: 100 }}>
        <div className="custom-container">
          <div className="header-panel d-flex align-items-center">
            <button onClick={() => setView('landing')} className="btn p-0 border-0 bg-transparent me-3">
              <IconSax name="arrow-left" className="back-btn fs-4 text-dark" />
            </button>
            <h3 className="m-0 fs-5 fw-bold theme-color">Demo Page Listing</h3>
          </div>
        </div>
      </header>

      {/* body */}
      <section className="my-3 px-3">
        <div className="custom-container">
          {sections.map((sec, idx) => (
            <div key={idx} className="mb-4">
              <h5 className="fs-6 fw-bold theme-color mb-2 pb-1 border-bottom">{sec.title}</h5>
              <ul className="navigation list-unstyled bg-white rounded-3 border p-0 m-0 text-start">
                {sec.pages.map((p, pidx) => (
                  <li 
                    key={pidx} 
                    className={`border-bottom ${pidx === sec.pages.length - 1 ? 'border-bottom-0' : ''}`}
                  >
                    <a 
                      href="#!" 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        setView(p.view, p.params); 
                      }}
                      className="p-3 d-flex justify-content-between align-items-center text-decoration-none text-dark"
                    >
                      <span className="fs-7 fw-semibold">{p.name}</span>
                      <IconSax name="arrow-right" className="fs-7 text-muted" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
