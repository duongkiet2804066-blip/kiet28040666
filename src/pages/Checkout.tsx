import React from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const Checkout: React.FC = () => {
  const { cart, addresses, selectedAddressId, setView, selectedShippingMethod, promoApplied } = useApp();
  const promoCode = 'WELCOME15';

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const selectedAddress = addresses.find((addr) => addr.id === selectedAddressId) || addresses[0];

  const subtotal = calculateSubtotal();
  const discount = promoApplied ? 15 : 0; // matching WELCOME15 discount of $15
  const shippingFee = selectedShippingMethod ? selectedShippingMethod.price : 0;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const handleContinueToPayment = () => {
    setView('payment');
  };

  return (
    <div className="pb-5 bg-light min-vh-100 text-start">
      {/* header */}
      <header className="section-t-space bg-white py-3 px-3 shadow-sm position-sticky top-0 w-100" style={{ zIndex: 100 }}>
        <div className="custom-container">
          <div className="header-panel d-flex align-items-center justify-content-between">
            <button onClick={() => setView('cart')} className="btn p-0 border-0 bg-transparent me-3">
              <IconSax name="arrow-left" className="back-btn fs-4 text-dark" />
            </button>
            <h3 className="m-0 fs-5 fw-bold theme-color flex-grow-1 text-center">Checkout</h3>
            <button onClick={() => setView('wishlist')} className="btn p-0 border-0 bg-transparent">
              <IconSax name="heart" className="icons fs-4 text-dark" />
            </button>
          </div>
        </div>
      </header>

      {/* shipping address section */}
      <section className="my-3 px-3">
        <div className="custom-container">
          <div className="address-section">
            <h5 className="fs-6 fw-bold theme-color mb-2">Shipping Address</h5>
            {selectedAddress ? (
              <div 
                onClick={() => setView('shipping-address')}
                className="shipping-address p-3 bg-white rounded-3 border d-flex gap-3 align-items-center"
                style={{ cursor: 'pointer' }}
              >
                <div className="address-icon bg-dark rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                  <img className="icon" src="/assets/images/svg/location-white.svg" alt="location" style={{ width: '20px' }} />
                </div>
                <div className="address-details flex-grow-1">
                  <h4 className="fw-semibold theme-color fs-6 m-0">{selectedAddress.name} ({selectedAddress.type})</h4>
                  <p className="text-muted fs-7 m-0 mt-1">{selectedAddress.houseNo}, {selectedAddress.locality}, {selectedAddress.city}</p>
                </div>
                <IconSax name="arrow-right" className="fs-6 text-muted" />
              </div>
            ) : (
              <button onClick={() => setView('new-address')} className="btn btn-outline-dark w-100 py-3 rounded-3">
                + Add Shipping Address
              </button>
            )}
          </div>
        </div>
      </section>

      {/* checkout products list */}
      <section className="my-3 px-3">
        <div className="custom-container">
          <ul className="horizontal-product-list list-unstyled p-0 m-0">
            {cart.map((item, idx) => (
              <li key={idx} className="cart-product-box bg-white p-3 rounded-3 mb-3 border">
                <div className="horizontal-product-box d-flex gap-3 align-items-center">
                  <div className="horizontal-product-img flex-shrink-0" style={{ width: '80px', height: '80px' }}>
                    <img className="img-fluid img rounded" src={item.product.image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="horizontal-product-details flex-grow-1 text-start">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <h4 className="theme-color fw-semibold fs-6 mb-0">{item.product.name}</h4>
                    </div>
                    <ul className="product-info list-unstyled m-0 p-0 d-flex gap-3 fs-7 text-muted mb-2">
                      <li>Qty: {item.quantity}</li>
                      <li className="d-flex align-items-center gap-1">
                        {item.selectedColor && (
                          <span
                            className="product-color rounded-circle border"
                            style={{ backgroundColor: item.selectedColor, width: '10px', height: '10px', display: 'inline-block' }}
                          />
                        )}
                        Size: {item.selectedSize || 'M'}
                      </li>
                    </ul>
                    <div className="price">
                      <h3 className="fw-bold theme-color fs-6 m-0">
                        ${item.product.price}
                        {item.product.originalPrice && (
                          <del className="text-muted ms-2 fs-7 fw-normal">${item.product.originalPrice}</del>
                        )}
                      </h3>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* shipping method selection */}
      <section className="my-3 px-3">
        <div className="custom-container">
          <h5 className="fs-6 fw-bold theme-color mb-2">Choose Shipping</h5>
          <div 
            onClick={() => setView('shipping')}
            className="shipping-type p-3 bg-white rounded-3 border d-flex justify-content-between align-items-center"
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex align-items-center gap-2">
              <IconSax name={selectedShippingMethod?.icon || "truck-fast"} className="icon fs-4 text-dark" />
              <div>
                <h4 className="fw-semibold theme-color fs-7 m-0">
                  {selectedShippingMethod ? `${selectedShippingMethod.name} Delivery` : 'Choose Shipping Type'}
                </h4>
                {selectedShippingMethod && (
                  <p className="text-muted fs-8 m-0 mt-1">{selectedShippingMethod.arrival}</p>
                )}
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              {selectedShippingMethod && (
                <span className="fw-bold theme-color fs-7">${selectedShippingMethod.price}</span>
              )}
              <IconSax name="arrow-right" className="icon fs-6 text-muted" />
            </div>
          </div>
        </div>
      </section>

      {/* coupon section */}
      <section className="my-3 px-3">
        <div className="custom-container">
          <h5 className="fs-6 fw-bold theme-color mb-2">Apply Coupon</h5>
          <div 
            onClick={() => setView('coupon')}
            className="coupon-code p-3 bg-white rounded-3 border d-flex justify-content-between align-items-center"
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex gap-2 align-items-center">
              <IconSax name="discount" className="bag fs-5 text-muted" />
              <h4 className="fw-semibold theme-color fs-7 m-0">{promoCode}</h4>
              {promoApplied && (
                <span className="badge bg-success p-1 text-uppercase text-white fs-9" style={{ fontSize: '10px' }}>applied</span>
              )}
            </div>
            <div className="d-flex align-items-center gap-2">
              {!promoApplied && <span className="text-muted fs-8">Select Coupon</span>}
              <IconSax name="arrow-right" className="icon fs-6 text-muted" />
            </div>
          </div>
        </div>
      </section>

      {/* billing details */}
      <section className="bill-details my-3 px-3 mb-5 pb-4">
        <div className="custom-container bg-white p-3 rounded-3 border text-start">
          <h5 className="fs-6 fw-bold theme-color mb-3">Billing Details</h5>
          <div className="sub-total d-flex justify-content-between fs-7 mb-2 text-muted">
            <span>Sub Total</span>
            <span>${subtotal}</span>
          </div>
          <div className="sub-total d-flex justify-content-between fs-7 mb-2 text-muted">
            <span>Shipping Charge</span>
            <span>${shippingFee}</span>
          </div>
          {promoApplied && (
            <div className="sub-total d-flex justify-content-between fs-7 mb-2 text-success">
              <span>Discount ({promoCode})</span>
              <span>-${discount}</span>
            </div>
          )}
          <div className="grand-total d-flex justify-content-between fs-6 fw-bold theme-color border-top pt-2 mt-2">
            <span>Grand Total</span>
            <span className="amount">${total}</span>
          </div>

          <button onClick={handleContinueToPayment} className="btn theme-btn text-white w-100 py-3 rounded-pill mt-4 fw-semibold text-uppercase" style={{ backgroundColor: '#122636' }}>
            Continue to Payment
          </button>
        </div>
      </section>
    </div>
  );
};
