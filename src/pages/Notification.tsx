import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const Notification: React.FC = () => {
  const { notifications, setView } = useApp();
  const [list, setList] = useState(notifications);

  const handleRefresh = () => {
    // just dummy refresh
    setList([
      {
        id: 'notif-1',
        title: '30% Special Discount!',
        desc: 'Special promotion only valid today',
        time: 'Just now',
        type: 'discount'
      },
      {
        id: 'notif-2',
        title: 'Top up E-wallet successful',
        desc: 'You have to top up your wallet',
        time: '1 hour ago',
        type: 'wallet'
      },
      ...notifications
    ]);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'discount':
      case 'promo':
        return '/assets/images/svg/discount.svg';
      case 'wallet':
        return '/assets/images/svg/wallet.svg';
      case 'location':
        return '/assets/images/svg/location.svg';
      case 'card':
        return '/assets/images/svg/card.svg';
      default:
        return '/assets/images/svg/profile-fill.svg';
    }
  };

  return (
    <div className="pb-5 bg-light min-vh-100 text-start">
      {/* header */}
      <header className="section-t-space bg-white py-3 px-3 shadow-sm position-sticky top-0 w-100" style={{ zIndex: 100 }}>
        <div className="custom-container">
          <div className="header-panel d-flex align-items-center">
            <button onClick={() => setView('landing')} className="btn p-0 border-0 bg-transparent me-3">
              <IconSax name="arrow-left" className="back-btn fs-4 text-dark" />
            </button>
            <h3 className="m-0 fs-5 fw-bold theme-color">Notification</h3>
          </div>
        </div>
      </header>

      {/* notifications section */}
      <section className="my-3 px-3">
        <div className="custom-container">
          {list.length === 0 ? (
            <div className="empty-tab text-center bg-white p-5 rounded-4 border">
              <img className="img-fluid empty-img mb-3" src="/assets/images/gif/notifiction.gif" alt="empty-bell" style={{ maxWidth: '200px' }} />
              <h2 className="fs-5 fw-bold theme-color">No Notifications Found!!</h2>
              <p className="text-muted mt-2 fs-7 mb-4">You don’t have new notification right now. If we received anything we will notify you.</p>
              <button onClick={handleRefresh} className="btn theme-btn text-white w-100 py-3 rounded-pill" style={{ backgroundColor: '#122636' }}>
                Refresh
              </button>
            </div>
          ) : (
            <div className="row g-3">
              {list.map((notif) => (
                <div key={notif.id} className="col-12">
                  <div className="notification-product-box bg-white p-3 rounded-3 border d-flex gap-3 align-items-center">
                    <div className="notification-product-img flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                      <img className="img-fluid notification-icons" src={getIcon(notif.type)} alt={notif.type} style={{ width: '100%' }} />
                    </div>
                    <div className="notification-product-details notification-details flex-grow-1 text-start">
                      <div className="d-flex justify-content-between align-items-start">
                        <h4 className="theme-color fw-semibold fs-6 m-0">{notif.title}</h4>
                        <span className="text-muted fs-8 ms-2 flex-shrink-0">{notif.time}</span>
                      </div>
                      <h5 className="text-muted fs-7 m-0 mt-1">{notif.desc}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
