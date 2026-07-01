import React from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const ManagePayment: React.FC = () => {
  const { cards, setView, deleteCard } = useApp();

  return (
    <div className="pb-5 bg-light min-vh-100 text-start">
      {/* header */}
      <header className="section-t-space bg-white py-3 px-3 shadow-sm position-sticky top-0 w-100" style={{ zIndex: 100 }}>
        <div className="custom-container">
          <div className="header-panel d-flex align-items-center">
            <button onClick={() => setView('profile')} className="btn p-0 border-0 bg-transparent me-3">
              <IconSax name="arrow-left" className="back-btn fs-4 text-dark" />
            </button>
            <h3 className="m-0 fs-5 fw-bold theme-color">Payment Options</h3>
          </div>
        </div>
      </header>

      {/* payment list */}
      <section className="payment-method my-3 px-3">
        <div className="custom-container">
          <h5 className="fs-6 fw-bold theme-color mb-2">Your Cards</h5>
          <ul className="payment-list list-unstyled p-0 m-0">
            {cards.length === 0 ? (
              <div className="text-center py-4 bg-white rounded-3 border mb-3">
                <IconSax name="card" className="fs-1 text-muted mb-2" />
                <p className="text-muted fs-7 m-0">No saved cards found.</p>
              </div>
            ) : (
              cards.map((card) => (
                <li 
                  key={card.id} 
                  className="cart-add-box payment-card-box bg-white p-3 rounded-3 border mb-3 d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center gap-3">
                    <img 
                      className="img-fluid" 
                      src={card.type.toLowerCase() === 'visa' ? '/assets/images/icons/svg/visa.svg' : '/assets/images/icons/svg/mastercard.svg'} 
                      alt={card.type} 
                      style={{ width: '40px' }}
                    />
                    <div>
                      <h5 className="fw-semibold theme-color fs-7 m-0">{card.type} {card.cardNo}</h5>
                      <p className="text-muted fs-8 m-0 mt-1">Expires on {card.expiry}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteCard(card.id)} 
                    className="btn p-0 border-0 bg-transparent"
                    aria-label="Delete card"
                  >
                    <IconSax name="trash" className="icons fs-5 text-danger" />
                  </button>
                </li>
              ))
            )}
          </ul>

          <button 
            onClick={() => setView('new-card')} 
            className="btn btn-link fs-7 p-0 text-decoration-none fw-bold mt-1 mb-4"
          >
            + Add New Card
          </button>

          <h5 className="fs-6 fw-bold theme-color mb-2">Wallets & Others</h5>
          <ul className="cart-add-box payment-card-box list-unstyled bg-white rounded-3 border p-0 m-0 text-start">
            <li className="p-3 border-bottom d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <img className="img-fluid" src="/assets/images/icons/svg/paypal.svg" alt="paypal" style={{ width: '30px' }} />
                <span className="fw-semibold theme-color fs-7">PayPal</span>
              </div>
              <input className="form-check-input" type="radio" name="flexRadioDefault" defaultChecked />
            </li>
            <li className="p-3 border-bottom d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <img className="img-fluid" src="/assets/images/icons/svg/apple-pay.svg" alt="apple-pay" style={{ width: '30px' }} />
                <span className="fw-semibold theme-color fs-7">Apple Pay</span>
              </div>
              <input className="form-check-input" type="radio" name="flexRadioDefault" />
            </li>
            <li className="p-3 border-bottom d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <img className="img-fluid" src="/assets/images/icons/svg/google-pay.svg" alt="google-pay" style={{ width: '30px' }} />
                <span className="fw-semibold theme-color fs-7">Google Pay</span>
              </div>
              <input className="form-check-input" type="radio" name="flexRadioDefault" />
            </li>
            <li className="p-3 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <img className="img-fluid" src="/assets/images/icons/svg/cash.svg" alt="cash" style={{ width: '30px' }} />
                <span className="fw-semibold theme-color fs-7">Cash on Delivery</span>
              </div>
              <input className="form-check-input" type="radio" name="flexRadioDefault" />
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
