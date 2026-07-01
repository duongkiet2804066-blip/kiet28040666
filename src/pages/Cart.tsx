import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';
import { BottomNavbar } from '../components/BottomNavbar';

export const Cart: React.FC = () => {
  const { cart, updateCartQty, removeFromCart, setView } = useApp();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const discount = promoApplied ? 15 : 0; // flat $15 discount for coupon
  const subtotal = calculateSubtotal();
  const shippingFee = subtotal > 0 ? 5 : 0;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'WELCOME15') {
      setPromoApplied(true);
      alert('Promo code applied successfully! Saved $15.');
    } else {
      alert('Invalid promo code. Try "WELCOME15".');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setView('shipping'); // go to shipping method selection
  };

  if (cart.length === 0) {
    return (
      <div className="pb-5 bg-light min-vh-100 text-start">
        {/* header */}
        <header className="section-t-space bg-white py-3 px-3 shadow-sm w-100">
          <div className="custom-container">
            <div className="header-panel d-flex align-items-center">
              <button onClick={() => setView('landing')} className="btn p-0 border-0 bg-transparent me-3">
                <IconSax name="arrow-left" className="back-btn fs-4 text-dark" />
              </button>
              <h3 className="m-0 fs-5 fw-bold theme-color">My Cart</h3>
            </div>
          </div>
        </header>

        {/* empty cart view */}
        <div className="custom-container px-3 mt-5">
          <div className="empty-tab text-center bg-white p-4 rounded-4 border">
            <img className="img-fluid empty-img mb-3" src="/assets/images/gif/cart.gif" alt="empty-cart" style={{ maxWidth: '200px' }} />
            <h2 className="fs-5 fw-bold theme-color">Your luggage is empty.</h2>
            <h5 className="text-muted mt-2 fs-7 fw-normal mb-4">Check out our top products to get the right one for you.</h5>
            <button onClick={() => setView('landing')} className="btn theme-btn text-white w-100 py-3 rounded-pill" style={{ backgroundColor: '#122636' }}>
              Start Shopping
            </button>
          </div>
        </div>

        {/* bottom navbar */}
        <BottomNavbar />
      </div>
    );
  }

  return (
    <div className="pb-5 bg-light min-vh-100 text-start">
      {/* header */}
      <header className="section-t-space bg-white py-3 px-3 shadow-sm position-sticky top-0 w-100" style={{ zIndex: 100 }}>
        <div className="custom-container">
          <div className="header-panel d-flex align-items-center">
            <button onClick={() => setView('landing')} className="btn p-0 border-0 bg-transparent me-3">
              <IconSax name="arrow-left" className="back-btn fs-4 text-dark" />
            </button>
            <h3 className="m-0 fs-5 fw-bold theme-color">Cart</h3>
          </div>
        </div>
      </header>

      {/* cart list */}
      <section className="my-3 px-3">
        <div className="custom-container">
          <ul className="horizontal-product-list list-unstyled p-0 m-0">
            {cart.map((item, idx) => (
              <li key={idx} className="cart-product-box bg-white p-3 rounded-3 mb-3 border">
                <div className="horizontal-product-box d-flex gap-3 align-items-center position-relative">
                  <div className="horizontal-product-img flex-shrink-0" style={{ width: '80px', height: '80px' }}>
                    <a href="#!" onClick={(e) => { e.preventDefault(); setView('product-details', { product: item.product }); }}>
                      <img className="img-fluid img rounded" src={item.product.image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </a>
                  </div>
                  <div className="horizontal-product-details flex-grow-1 text-start">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <a href="#!" onClick={(e) => { e.preventDefault(); setView('product-details', { product: item.product }); }} className="text-decoration-none text-dark">
                        <h4 className="theme-color fw-semibold fs-6 mb-0">{item.product.name}</h4>
                      </a>
                      <button onClick={() => removeFromCart(item.product.id)} className="btn p-0 border-0 bg-transparent" aria-label="Remove item">
                        <IconSax name="trash" className="trash fs-5 text-danger" />
                      </button>
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

                    <div className="d-flex align-items-center justify-content-between mt-3">
                      <div className="price">
                        <h3 className="fw-bold theme-color fs-6 m-0">
                          ${item.product.price}
                          {item.product.originalPrice && (
                            <del className="text-muted ms-2 fs-7 fw-normal">${item.product.originalPrice}</del>
                          )}
                        </h3>
                      </div>
                      
                      <div className="plus-minus d-flex align-items-center border rounded-pill px-2 py-0">
                        <button onClick={() => updateCartQty(item.product.id, item.quantity - 1)} className="btn p-1 border-0 bg-transparent">
                          <IconSax name="minus" className="fs-7 text-muted" />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          readOnly
                          className="text-center border-0 fw-bold mx-1"
                          style={{ width: '16px', fontSize: '13px' }}
                        />
                        <button onClick={() => updateCartQty(item.product.id, item.quantity + 1)} className="btn p-1 border-0 bg-transparent">
                          <IconSax name="add" className="fs-7 text-muted" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* promo code section */}
      <section className="my-3 px-3 mb-5 pb-5">
        <div className="custom-container bg-white p-3 rounded-3 border text-start">
          <h5 className="fs-6 fw-bold theme-color mb-2">Apply Promo Code</h5>
          <form className="d-flex gap-2" onSubmit={handleApplyPromo}>
            <input
              type="text"
              className="form-control fs-7"
              placeholder="Enter Promo Code (WELCOME15)"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={promoApplied}
            />
            <button
              type="submit"
              className="btn btn-dark fs-7 px-4 rounded"
              style={{ backgroundColor: '#122636' }}
              disabled={promoApplied}
            >
              {promoApplied ? 'Applied' : 'Apply'}
            </button>
          </form>
        </div>

        {/* Order pricing summary details */}
        <div className="custom-container bg-white p-3 rounded-3 border text-start mt-3">
          <h5 className="fs-6 fw-bold theme-color mb-3">Order Summary</h5>
          <div className="d-flex justify-content-between fs-7 mb-2 text-muted">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          {promoApplied && (
            <div className="d-flex justify-content-between fs-7 mb-2 text-success">
              <span>Promo Discount (WELCOME15)</span>
              <span>-${discount}</span>
            </div>
          )}
          <div className="d-flex justify-content-between fs-7 mb-2 text-muted">
            <span>Shipping</span>
            <span>${shippingFee}</span>
          </div>
          <div className="d-flex justify-content-between fs-6 fw-bold theme-color border-top pt-2 mt-2">
            <span>Total Price</span>
            <span>${total}</span>
          </div>
        </div>
      </section>

      {/* pay popup bottom footer bar */}
      <div className="pay-popup bg-white border-top p-3 d-flex justify-content-between align-items-center fixed-bottom" style={{ zIndex: 100 }}>
        <div className="price-items text-start">
          <h6 className="text-muted m-0 fs-7">Total price</h6>
          <h2 className="theme-color fw-bold fs-4 m-0">${total}</h2>
        </div>
        <button onClick={handleCheckout} className="btn theme-btn text-white pay-btn px-4 py-3 rounded-pill fw-bold text-uppercase fs-7" style={{ backgroundColor: '#122636' }}>
          Checkout
        </button>
      </div>

      {/* bottom navbar */}
      <BottomNavbar />
    </div>
  );
};
