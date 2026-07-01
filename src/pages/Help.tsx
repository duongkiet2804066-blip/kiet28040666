import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const Help: React.FC = () => {
  const { setView } = useApp();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const faqs = [
    {
      q: 'I want to track my order',
      a: "To track your order, you will need to have the tracking number or order ID provided by the seller or shipping carrier. Once you have this information, you can usually track your order online by visiting the carrier's website and entering the tracking number or order ID in the designated tracking field."
    },
    {
      q: 'I want to manage my order',
      a: (
        <ul className="ps-3 mb-0 text-muted fs-7">
          <li>Check your order confirmation email or account for delivery date and carrier details.</li>
          <li>Contact support if you need to modify your order items, delivery address or cancel.</li>
          <li>Regular tracking is updated directly in your Order Details tab inside the profile menu.</li>
        </ul>
      )
    },
    {
      q: 'I did not receive Instant Cashback',
      a: "Please ensure that your order met all coupon/cashback criteria outlined during checkout. Instant cashbacks are credited within 24 hours of successful order placement to the original payment source. If it still doesn't appear, contact customer support."
    },
    {
      q: 'I am unable to pay using wallet',
      a: "Make sure you have sufficient balance in your linked wallet and that you have completed any required OTP verification steps. Try unlinking and re-linking your wallet, or use a credit/debit card as a secondary option."
    },
    {
      q: 'I want help with returns & refunds',
      a: "We offer a 21-day easy return policy for all furniture items. Log into your account, select the order from history, and click Return on eligible items to generate a return pickup request."
    }
  ];

  return (
    <div className="pb-5 bg-light min-vh-100 text-start">
      {/* header */}
      <header className="section-t-space bg-white py-3 px-3 shadow-sm position-sticky top-0 w-100" style={{ zIndex: 100 }}>
        <div className="custom-container">
          <div className="header-panel d-flex align-items-center">
            <button onClick={() => setView('profile')} className="btn p-0 border-0 bg-transparent me-3">
              <IconSax name="arrow-left" className="back-btn fs-4 text-dark" />
            </button>
            <h3 className="m-0 fs-5 fw-bold theme-color">Help Center</h3>
          </div>
        </div>
      </header>

      {/* help contents */}
      <section className="my-3 px-3">
        <div className="custom-container bg-white p-3 rounded-3 border">
          <div className="help-center text-center">
            <img className="img-fluid help-pic mb-3" src="/assets/images/banner/help-pic.png" alt="help" style={{ maxWidth: '180px' }} />
            <h2 className="fs-5 fw-bold theme-color">Help Center</h2>
            <p className="text-muted fs-7 lh-base">Please get in touch and we will be happy to help you. Get quick customer support by selecting your item</p>
          </div>

          <h3 className="fs-6 fw-bold theme-color mt-4 mb-3">What issues are you facing?</h3>
          <div className="help-accordion">
            {faqs.map((faq, idx) => {
              const isOpen = activeIdx === idx;
              return (
                <div key={idx} className="accordion-item border rounded-3 mb-2 overflow-hidden">
                  <h2 className="accordion-header m-0">
                    <button 
                      onClick={() => setActiveIdx(isOpen ? null : idx)}
                      className={`accordion-button w-100 py-3 px-3 border-0 bg-transparent d-flex justify-content-between align-items-center text-start fw-semibold fs-7 theme-color`}
                      type="button"
                    >
                      {faq.q}
                      <span className="fs-8 text-muted">{isOpen ? '▲' : '▼'}</span>
                    </button>
                  </h2>
                  {isOpen && (
                    <div className="accordion-body bg-light-subtle p-3 border-top text-muted fs-7 lh-base text-start">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
