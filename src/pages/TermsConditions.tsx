import React from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const TermsConditions: React.FC = () => {
  const { setView } = useApp();

  return (
    <div className="pb-5 bg-light min-vh-100 text-start">
      {/* header */}
      <header className="section-t-space bg-white py-3 px-3 shadow-sm position-sticky top-0 w-100" style={{ zIndex: 100 }}>
        <div className="custom-container">
          <div className="header-panel d-flex align-items-center">
            <button onClick={() => setView('profile')} className="btn p-0 border-0 bg-transparent me-3">
              <IconSax name="arrow-left" className="back-btn fs-4 text-dark" />
            </button>
            <h3 className="m-0 fs-5 fw-bold theme-color">Terms and Conditions</h3>
          </div>
        </div>
      </header>

      {/* terms and conditions section */}
      <section className="my-3 px-3 mb-5 pb-4">
        <div className="custom-container bg-white p-3 rounded-3 border">
          <div className="terms-Conditions text-muted fs-7 lh-base">
            <h2 className="fs-5 fw-bold theme-color mb-3 text-dark text-start">Terms and Conditions</h2>
            <p>Welcome to fuzzy furniture store!</p>
            <p>These terms and conditions outline the rules and regulations for the use of fuzzy's Website, located at https://themes.pixelstrap.com/fuzzy-app.</p>
            <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use fuzzy furniture store if you do not agree to take all of the terms and conditions stated on this page.</p>

            <h3 className="fs-6 fw-bold theme-color mt-4 mb-2 text-dark text-start">Cookies</h3>
            <p>We employ the use of cookies. By accessing fuzzy furniture store, you agreed to use cookies in agreement with the fuzzy's Privacy Policy.</p>
            <p>Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website.</p>

            <h3 className="fs-6 fw-bold theme-color mt-4 mb-2 text-dark text-start">License</h3>
            <p>Unless otherwise stated, fuzzy and/or its licensors own the intellectual property rights for all material on fuzzy furniture store. All intellectual property rights are reserved. You may access this from fuzzy furniture store for your own personal use subjected to restrictions set in these terms and conditions.</p>
            
            <p className="fw-semibold text-dark mb-1">You must not:</p>
            <ul className="ps-3 mb-3">
              <li>Republish material from fuzzy furniture store</li>
              <li>Sell, rent or sub-license material from fuzzy furniture store</li>
              <li>Reproduce, duplicate or copy material from fuzzy furniture store</li>
              <li>Redistribute content from fuzzy furniture store</li>
            </ul>

            <h3 className="fs-6 fw-bold theme-color mt-4 mb-2 text-dark text-start">Reservation of Rights</h3>
            <p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions at any time.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
