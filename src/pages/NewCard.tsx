import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const NewCard: React.FC = () => {
  const { addCard, setView } = useApp();
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardHolder || !cvv || !expiry) {
      alert('Please fill in all fields.');
      return;
    }

    // Mask card number for display
    const maskedNo = `•••• •••• •••• ${cardNumber.slice(-4)}`;

    addCard({
      cardNo: maskedNo,
      cardHolder: cardHolder.toUpperCase(),
      expiry,
      cvv,
      type: cardNumber.startsWith('4') ? 'Visa' : 'Mastercard'
    });

    alert('Card added successfully!');
    setView('payment');
  };

  return (
    <div className="pb-5 bg-light min-vh-100 text-start">
      {/* header */}
      <header className="section-t-space bg-white py-3 px-3 shadow-sm position-sticky top-0 w-100" style={{ zIndex: 100 }}>
        <div className="custom-container">
          <div className="header-panel d-flex align-items-center">
            <button onClick={() => setView('payment')} className="btn p-0 border-0 bg-transparent me-3">
              <IconSax name="arrow-left" className="back-btn fs-4 text-dark" />
            </button>
            <h3 className="m-0 fs-5 fw-bold theme-color">Add New Card</h3>
          </div>
        </div>
      </header>

      {/* card form section */}
      <section className="my-3 px-3">
        <div className="custom-container">
          <form className="address-form bg-white p-3 rounded-3 border" onSubmit={handleSubmit}>
            <div className="form-group text-start mb-3">
              <label className="form-label text-dark fw-semibold">Card Number</label>
              <div className="form-input">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Enter card number" 
                  maxLength={16}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                  required
                />
              </div>
            </div>
            
            <div className="form-group text-start mb-3">
              <label className="form-label text-dark fw-semibold">Card Holder Name</label>
              <div className="form-input">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Enter card holder name" 
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-5">
                <div className="form-group text-start">
                  <label className="form-label text-dark fw-semibold">CVV</label>
                  <div className="form-input">
                    <input 
                      type="password" 
                      className="form-control" 
                      placeholder="CVV" 
                      maxLength={3}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-7">
                <div className="form-group text-start">
                  <label className="form-label text-dark fw-semibold">Exp. Date (MM/YY)</label>
                  <div className="form-input">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="MM/YY" 
                      maxLength={5}
                      value={expiry}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, '');
                        if (val.length > 2) {
                          val = val.slice(0, 2) + '/' + val.slice(2, 4);
                        }
                        setExpiry(val);
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn theme-btn text-white w-100 py-3 rounded-pill mt-4 fw-semibold text-uppercase" 
              style={{ backgroundColor: '#122636' }}
            >
              Add Card
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
