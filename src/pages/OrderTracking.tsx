import React from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const OrderTracking: React.FC = () => {
  const { currentViewParams, setView, orders } = useApp();
  const orderId = currentViewParams?.orderId;
  const order = orders.find((o) => o.id === orderId) || orders[0] || null;

  if (!order) {
    return (
      <div className="text-center py-5">
        <h4>No Order Tracked</h4>
        <button onClick={() => setView('landing')} className="btn btn-primary mt-3">Go Home</button>
      </div>
    );
  }

  const steps = [
    { title: 'Order Information Received', time: '05:30 PM', date: order.date, status: 'completed', icon: 'check' },
    { title: 'The Parcel is being collected', time: '08:00 AM', date: order.date, status: 'completed', icon: 'check' },
    { title: 'Ready To be Send', time: '09:45 AM', date: order.date, status: 'ongoing', icon: 'box-time' },
    { title: 'Dispatch in Local Warehouse', time: '02:20 PM', date: order.date, status: 'pending', icon: 'truck-fast' },
    { title: 'Parcel Delivered', time: '05:30 PM', date: order.date, status: 'pending', icon: 'gift' }
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
            <h3 className="m-0 fs-5 fw-bold theme-color">Order Tracker</h3>
          </div>
        </div>
      </header>

      {/* tracking stats */}
      <section className="my-3 px-3">
        <div className="custom-container">
          <p className="text-muted fs-7 m-0">{order.date}</p>
          <div className="order-id d-flex justify-content-between align-items-center mt-2 pb-3 border-bottom">
            <h4 className="theme-color fw-semibold fs-6 m-0">Order ID: {order.id}</h4>
            <h4 className="theme-color fw-semibold fs-6 m-0"><span className="text-muted fw-normal">Amount:</span> ${order.total}</h4>
          </div>

          <div className="order-tracking mt-4 bg-white p-3 rounded-3 border">
            <h5 className="fs-6 fw-bold theme-color mb-4 text-start">Order Journey</h5>
            <ul className="list-unstyled p-0 m-0">
              {steps.map((step, idx) => (
                <li key={idx} className={`order-process d-flex gap-3 mb-4 position-relative ${step.status === 'completed' ? 'completed' : step.status === 'ongoing' ? 'ongoing' : ''}`}>
                  <div className="process-marker d-flex align-items-center justify-content-center" style={{ zIndex: 2 }}>
                    {step.status === 'completed' ? (
                      <span className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px', fontSize: '12px' }}>
                        ✓
                      </span>
                    ) : step.status === 'ongoing' ? (
                      <span className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center border border-2" style={{ width: '24px', height: '24px' }}>
                        <IconSax name="box-time" className="fs-7 text-white" />
                      </span>
                    ) : (
                      <span className="rounded-circle bg-light text-muted d-flex align-items-center justify-content-center border" style={{ width: '24px', height: '24px' }}>
                        <IconSax name={step.icon} className="fs-7 text-muted" />
                      </span>
                    )}
                  </div>
                  <div className="process-details text-start">
                    <h4 className={`fs-7 fw-semibold m-0 ${step.status === 'completed' ? 'text-dark' : step.status === 'ongoing' ? 'text-dark fw-bold' : 'text-muted'}`}>{step.title}</h4>
                    <p className="text-muted fs-8 m-0 mt-1">{step.time} | {step.date}</p>
                  </div>
                  {idx < steps.length - 1 && (
                    <div 
                      className={`process-line position-absolute`} 
                      style={{ 
                        left: '11px', 
                        top: '24px', 
                        bottom: '-24px', 
                        width: '2px', 
                        backgroundColor: step.status === 'completed' && steps[idx+1].status !== 'pending' ? '#198754' : '#dee2e6',
                        zIndex: 1
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

          <button onClick={() => setView('landing')} className="btn theme-btn text-white w-100 py-3 rounded-pill mt-4 fw-semibold text-uppercase" style={{ backgroundColor: '#122636' }}>
            Continue Shopping
          </button>
        </div>
      </section>
    </div>
  );
};
