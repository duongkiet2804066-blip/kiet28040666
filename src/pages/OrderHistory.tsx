import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const OrderHistory: React.FC = () => {
  const { orders, setView } = useApp();
  const [searchVal, setSearchVal] = useState('');

  const filteredOrders = orders.filter((order) => {
    // Search filter based on product names in the order or the order ID itself
    const matchesSearch = searchVal === '' || 
      order.id.toLowerCase().includes(searchVal.toLowerCase()) ||
      order.items.some(item => item.product.name.toLowerCase().includes(searchVal.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="pb-5 bg-light min-vh-100 text-start">
      {/* header */}
      <header className="section-t-space bg-white py-3 px-3 shadow-sm position-sticky top-0 w-100" style={{ zIndex: 100 }}>
        <div className="custom-container">
          <div className="header-panel d-flex align-items-center">
            <button onClick={() => setView('profile')} className="btn p-0 border-0 bg-transparent me-3">
              <IconSax name="arrow-left" className="back-btn fs-4 text-dark" />
            </button>
            <h3 className="m-0 fs-5 fw-bold theme-color">Order History</h3>
          </div>
        </div>
      </header>

      {/* search filter */}
      <section className="my-3 px-3">
        <div className="custom-container">
          <form className="theme-form search-head d-flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group flex-grow-1 m-0">
              <div className="form-input position-relative">
                <input
                  type="text"
                  className="form-control search ps-5 py-2 rounded-3 border"
                  placeholder="Search order history..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                />
                <IconSax
                  name="search-normal-2"
                  className="search-icon position-absolute top-50 start-0 translate-middle-y ms-3 fs-5 text-muted"
                />
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* order list */}
      <section className="my-3 px-3">
        <div className="custom-container">
          {filteredOrders.length === 0 ? (
            <div className="empty-tab text-center bg-white p-5 rounded-4 border">
              <img className="img-fluid empty-img mb-3" src="/assets/images/gif/order.gif" alt="empty-order" style={{ maxWidth: '200px' }} />
              <h2 className="fs-5 fw-bold theme-color">No Order Available</h2>
              <p className="text-muted mt-2 fs-7 mb-4">If you haven't made any order yet, do so now for a better life.</p>
              <button onClick={() => setView('landing')} className="btn btn-dark w-100 py-3 rounded-pill" style={{ backgroundColor: '#122636' }}>
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="row g-3">
              {filteredOrders.map((order) => {
                // Show details of first item in order summary
                const mainItem = order.items[0];
                if (!mainItem) return null;
                const dateText = new Date(order.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: '2-digit' });

                return (
                  <div key={order.id} className="col-12">
                    <div className="order-product-box bg-white p-3 rounded-3 border">
                      <div className="horizontal-product-box d-flex gap-3 align-items-center mb-3">
                        <div className="horizontal-product-img flex-shrink-0" style={{ width: '85px', height: '85px' }}>
                          <img className="img-fluid img rounded" src={mainItem.product.image} alt={mainItem.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div className="horizontal-product-details flex-grow-1">
                          <div className="d-flex align-items-center justify-content-between gap-2 mb-1">
                            <h4 className="theme-color fw-semibold fs-6 m-0 text-truncate" style={{ maxWidth: '140px' }}>{mainItem.product.name}</h4>
                            <span className={`badge ${order.status === 'delivered' ? 'bg-success' : order.status === 'cancelled' ? 'bg-danger' : 'bg-warning'} fs-8 text-capitalize`}>
                              {order.status}
                            </span>
                          </div>
                          <h5 className="text-muted fs-7 m-0">Qty: {mainItem.quantity} {order.items.length > 1 && `(+${order.items.length - 1} more)`}</h5>
                          <button 
                            onClick={() => setView('order-details', { order })}
                            className="btn btn-link fs-7 p-0 mt-2 text-decoration-none fw-semibold theme-color"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                      <div className="order-details border-top pt-2 d-flex align-items-center justify-content-between text-muted fs-7">
                        <span>Order ID: <span className="fw-semibold text-dark">{order.id}</span></span>
                        <span>Date: {dateText}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
