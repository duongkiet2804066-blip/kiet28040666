import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const Payment: React.FC = () => {
  const { cart, cards, setView, placeOrder, clearCart, selectedShippingMethod, promoApplied, addresses, selectedAddressId } = useApp();
  const [selectedMethod, setSelectedMethod] = useState('card-1');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const selectedAddress = addresses.find((addr) => addr.id === selectedAddressId) || addresses[0];

  const subtotal = calculateSubtotal();
  const discount = promoApplied ? 15 : 0; // matching WELCOME15 discount of $15
  const shippingFee = selectedShippingMethod ? selectedShippingMethod.price : 0;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const handlePayNow = () => {
    if (cart.length === 0) return;

    // Create order structure
    const order = placeOrder({
      items: cart,
      subtotal,
      shippingFee,
      discount,
      total,
      address: selectedAddress || {
        id: 'addr-default',
        name: 'Default Address',
        phone: '+1 (555) 123-4567',
        houseNo: 'Flat 402, Block A',
        locality: 'Sunset Road',
        city: 'San Francisco',
        state: 'California',
        pincode: '94107',
        type: 'Home'
      },
      shippingMethod: selectedShippingMethod ? `${selectedShippingMethod.name} Delivery` : 'Regular Delivery',
      paymentMethod: selectedMethod.startsWith('card-') ? 'Credit Card' : selectedMethod
    });

    setPlacedOrderId(order.id);
    clearCart();
    setShowSuccessModal(true);
  };

  return (
    <div className="pb-5 bg-light min-vh-100 text-start position-relative">
      {/* header */}
      <header className="section-t-space bg-white py-3 px-3 shadow-sm position-sticky top-0 w-100" style={{ zIndex: 100 }}>
        <div className="custom-container">
          <div className="header-panel d-flex align-items-center">
            <button onClick={() => setView('checkout')} className="btn p-0 border-0 bg-transparent me-3">
              <IconSax name="arrow-left" className="back-btn fs-4 text-dark" />
            </button>
            <h3 className="m-0 fs-5 fw-bold theme-color">Payment Method</h3>
          </div>
        </div>
      </header>

      {/* payment list */}
      <section className="payment-method my-3 px-3">
        <div className="custom-container">
          <h5 className="fs-6 fw-bold theme-color mb-2">Your Cards</h5>
          <ul className="payment-list list-unstyled p-0 m-0">
            {cards.map((card) => (
              <li 
                key={card.id} 
                onClick={() => setSelectedMethod(card.id)}
                className={`cart-add-box payment-card-box bg-white p-3 rounded-3 border mb-3 d-flex justify-content-between align-items-center ${selectedMethod === card.id ? 'border-primary' : ''}`}
                style={{ cursor: 'pointer' }}
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
                <div className="form-check">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="paymentMethod"
                    checked={selectedMethod === card.id}
                    onChange={() => setSelectedMethod(card.id)}
                  />
                </div>
              </li>
            ))}
          </ul>

          <button 
            onClick={() => setView('new-card')} 
            className="btn btn-link fs-7 p-0 text-decoration-none fw-bold mt-1 mb-4"
          >
            + Add New Card
          </button>

          <h5 className="fs-6 fw-bold theme-color mb-2">Wallets & Others</h5>
          <ul className="cart-add-box payment-card-box list-unstyled bg-white rounded-3 border p-0 m-0 text-start">
            <li 
              onClick={() => setSelectedMethod('PayPal')}
              className="p-3 border-bottom d-flex justify-content-between align-items-center"
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center gap-3">
                <img className="img-fluid" src="/assets/images/icons/svg/paypal.svg" alt="paypal" style={{ width: '30px' }} />
                <span className="fw-semibold theme-color fs-7">PayPal</span>
              </div>
              <input 
                className="form-check-input" 
                type="radio" 
                name="paymentMethod"
                checked={selectedMethod === 'PayPal'}
                onChange={() => setSelectedMethod('PayPal')}
              />
            </li>
            <li 
              onClick={() => setSelectedMethod('Apple Pay')}
              className="p-3 border-bottom d-flex justify-content-between align-items-center"
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center gap-3">
                <img className="img-fluid" src="/assets/images/icons/svg/apple-pay.svg" alt="apple-pay" style={{ width: '30px' }} />
                <span className="fw-semibold theme-color fs-7">Apple Pay</span>
              </div>
              <input 
                className="form-check-input" 
                type="radio" 
                name="paymentMethod"
                checked={selectedMethod === 'Apple Pay'}
                onChange={() => setSelectedMethod('Apple Pay')}
              />
            </li>
            <li 
              onClick={() => setSelectedMethod('Google Pay')}
              className="p-3 border-bottom d-flex justify-content-between align-items-center"
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center gap-3">
                <img className="img-fluid" src="/assets/images/icons/svg/google-pay.svg" alt="google-pay" style={{ width: '30px' }} />
                <span className="fw-semibold theme-color fs-7">Google Pay</span>
              </div>
              <input 
                className="form-check-input" 
                type="radio" 
                name="paymentMethod"
                checked={selectedMethod === 'Google Pay'}
                onChange={() => setSelectedMethod('Google Pay')}
              />
            </li>
            <li 
              onClick={() => setSelectedMethod('COD')}
              className="p-3 d-flex justify-content-between align-items-center"
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center gap-3">
                <img className="img-fluid" src="/assets/images/icons/svg/cash.svg" alt="cash" style={{ width: '30px' }} />
                <span className="fw-semibold theme-color fs-7">Cash on Delivery</span>
              </div>
              <input 
                className="form-check-input" 
                type="radio" 
                name="paymentMethod"
                checked={selectedMethod === 'COD'}
                onChange={() => setSelectedMethod('COD')}
              />
            </li>
          </ul>
        </div>
      </section>

      {/* pay footer */}
      <div className="pay-popup bg-white border-top p-3 d-flex justify-content-between align-items-center fixed-bottom" style={{ zIndex: 100 }}>
        <div className="price-items text-start">
          <h6 className="text-muted m-0 fs-7">Total price</h6>
          <h2 className="theme-color fw-bold fs-4 m-0">${total}</h2>
        </div>
        <button onClick={handlePayNow} className="btn theme-btn text-white pay-btn px-4 py-3 rounded-pill fw-bold text-uppercase fs-7" style={{ backgroundColor: '#122636' }}>
          Pay Now
        </button>
      </div>

      {/* success payment modal popup */}
      {showSuccessModal && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1040 }} />
          <div className="modal fade show d-block success-modal" tabIndex={-1} style={{ zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 p-4 rounded-4 shadow">
                <div className="modal-body text-center">
                  <img className="img-fluid confirm-offer mb-3" src="/assets/images/gif/success.gif" alt="success-payment" style={{ maxWidth: '150px' }} />
                  <h2 className="theme-color fw-bold fs-4 mt-2">Congratulations !!</h2>
                  <p className="text-muted fs-7 lh-base mt-2">Your order is accepted. Your items are on the way and should arrive shortly.</p>
                  <button 
                    onClick={() => {
                      setShowSuccessModal(false);
                      setView('order-tracking', { orderId: placedOrderId });
                    }} 
                    className="btn btn-dark w-100 py-3 rounded-pill text-white mt-4 fw-semibold"
                    style={{ backgroundColor: '#122636' }}
                  >
                    Track Order Now
                  </button>
                  <button 
                    onClick={() => {
                      setShowSuccessModal(false);
                      setView('landing');
                    }} 
                    className="btn btn-light border w-100 py-3 rounded-pill mt-3 fw-semibold text-dark"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
