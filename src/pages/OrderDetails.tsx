import React from 'react';
import { useApp, type Order } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const OrderDetails: React.FC = () => {
  const { currentViewParams, setView } = useApp();
  const order: Order | null = currentViewParams?.order || null;

  if (!order) {
    return (
      <div className="text-center py-5">
        <h4>No Order Selected</h4>
        <button onClick={() => setView('order-history')} className="btn btn-primary mt-3">Back to History</button>
      </div>
    );
  }

  const handleDownloadInvoice = () => {
    alert('Invoice download started for order ' + order.id);
  };

  const steps = [
    { title: 'Order Information Received', time: '09:00 AM', date: order.date, completed: true },
    { title: 'The Parcel is being collected', time: '02:00 PM', date: order.date, completed: ['shipped', 'out-for-delivery', 'delivered'].includes(order.status) },
    { title: 'Ready To be Send', time: '04:30 PM', date: order.date, completed: ['shipped', 'out-for-delivery', 'delivered'].includes(order.status) },
    { title: 'Dispatch in Local Warehouse', time: '10:00 AM', date: order.date, completed: ['out-for-delivery', 'delivered'].includes(order.status) },
    { title: 'Parcel Delivered', time: '03:15 PM', date: order.date, completed: order.status === 'delivered' }
  ];

  return (
    <div className="pb-5 bg-light min-vh-100 text-start">
      {/* header */}
      <header className="section-t-space bg-white py-3 px-3 shadow-sm position-sticky top-0 w-100" style={{ zIndex: 100 }}>
        <div className="custom-container">
          <div className="header-panel d-flex align-items-center">
            <button onClick={() => setView('order-history')} className="btn p-0 border-0 bg-transparent me-3">
              <IconSax name="arrow-left" className="back-btn fs-4 text-dark" />
            </button>
            <h3 className="m-0 fs-5 fw-bold theme-color">Order Details</h3>
          </div>
        </div>
      </header>

      {/* products */}
      <section className="my-3 px-3">
        <div className="custom-container">
          <div className="row g-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="col-12">
                <div className="order-product-box bg-white p-3 rounded-3 border">
                  <div className="horizontal-product-box d-flex gap-3 align-items-center">
                    <div className="horizontal-product-img flex-shrink-0" style={{ width: '80px', height: '80px' }}>
                      <img className="img-fluid img rounded" src={item.product.image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="horizontal-product-details flex-grow-1 text-start">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <h4 className="theme-color fw-semibold fs-6 mb-0">{item.product.name}</h4>
                        <h3 className="fw-bold theme-color fs-6 m-0">${item.product.price}</h3>
                      </div>
                      <h5 className="text-muted fs-7 m-0">Qty: {item.quantity}</h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* tracking / journey */}
      <section className="my-3 px-3">
        <div className="custom-container">
          <div className="order-tracking bg-white p-3 rounded-3 border text-start">
            <h5 className="fs-6 fw-bold theme-color mb-3">Order Journey</h5>
            <ul className="list-unstyled p-0 m-0">
              {steps.map((step, idx) => (
                <li key={idx} className={`order-process d-flex gap-3 mb-3 position-relative ${step.completed ? 'completed' : ''}`}>
                  <div className="process-marker d-flex align-items-center justify-content-center">
                    <span 
                      className={`rounded-circle border d-inline-block d-flex align-items-center justify-content-center ${step.completed ? 'bg-success text-white' : 'bg-white border-2'}`}
                      style={{ width: '20px', height: '20px', fontSize: '10px' }}
                    >
                      {step.completed ? '✓' : ''}
                    </span>
                  </div>
                  <div className="process-details">
                    <h4 className={`fs-7 fw-semibold m-0 ${step.completed ? 'text-dark' : 'text-muted'}`}>{step.title}</h4>
                    <p className="text-muted fs-8 m-0 mt-1">{step.time} | {step.date}</p>
                  </div>
                  {idx < steps.length - 1 && (
                    <div 
                      className={`process-line position-absolute`} 
                      style={{ 
                        left: '9px', 
                        top: '20px', 
                        bottom: '-15px', 
                        width: '2px', 
                        backgroundColor: step.completed && steps[idx+1].completed ? '#198754' : '#dee2e6' 
                      }} 
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* billing */}
      <section className="bill-details my-3 px-3 mb-5 pb-4">
        <div className="custom-container bg-white p-3 rounded-3 border text-start">
          <h5 className="fs-6 fw-bold theme-color mb-3">Billing Details</h5>
          <div className="sub-total d-flex justify-content-between fs-7 mb-2 text-muted">
            <span>Sub Total</span>
            <span>${order.subtotal}</span>
          </div>
          <div className="sub-total d-flex justify-content-between fs-7 mb-2 text-muted">
            <span>Shipping Charge</span>
            <span>${order.shippingFee}</span>
          </div>
          {order.discount > 0 && (
            <div className="sub-total d-flex justify-content-between fs-7 mb-2 text-success">
              <span>Discount</span>
              <span>-${order.discount}</span>
            </div>
          )}
          <div className="grand-total d-flex justify-content-between fs-6 fw-bold theme-color border-top pt-2 mt-2">
            <span>Grand Total</span>
            <span className="amount">${order.total}</span>
          </div>

          <button onClick={handleDownloadInvoice} className="btn btn-outline-dark w-100 py-3 rounded-pill mt-4 fw-semibold">
            Download Invoice
          </button>
        </div>
      </section>
    </div>
  );
};
