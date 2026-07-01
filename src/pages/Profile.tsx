import React from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';
import { BottomNavbar } from '../components/BottomNavbar';

export const Profile: React.FC = () => {
  const { user, setView } = useApp();

  const profileOptions = [
    { view: 'order-history', title: 'Orders', desc: 'Ongoing orders, Recent orders..', icon: 'box' },
    { view: 'wishlist', title: 'Wishlist', desc: 'Your saved products', icon: 'heart' },
    { view: 'manage-payment', title: 'Payment', desc: 'Saved cards, Wallets', icon: 'wallet-open' },
    { view: 'manage-address', title: 'Saved Address', desc: 'Home, Office', icon: 'location' },
    { view: 'language', title: 'Language', desc: 'Select your language here', icon: 'translate' },
    { view: 'notification', title: 'Notification', desc: 'Offers, Order tracking messages', icon: 'bell-1' },
    { view: 'setting', title: 'Settings', desc: 'App settings, Dark mode', icon: 'setting-1' },
    { view: 'admin', title: 'Admin Dashboard', desc: 'Manage products, orders, settings..', icon: 'key' },
    { view: 'terms-conditions', title: 'Terms & Conditions', desc: 'T&C for use of platform', icon: 'info-circle' },
    { view: 'help', title: 'Help', desc: 'Customer Support, FAQs', icon: 'phone' }
  ];

  return (
    <div className="pb-5 bg-light min-vh-100 text-start">
      {/* profile header */}
      <header className="profile-header bg-white py-4 px-3 shadow-sm" style={{ borderBottomRightRadius: '24px', borderBottomLeftRadius: '24px' }}>
        <div className="custom-container">
          <h3 className="fw-bold theme-color fs-5 mb-4">Profile</h3>
          <div className="d-flex align-items-center gap-3">
            <div className="profile-pic flex-shrink-0" style={{ width: '60px', height: '60px' }}>
              <img className="img-fluid rounded-circle border border-2 border-dark" src={user.profilePic} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="profile-name d-flex align-items-center justify-content-between flex-grow-1">
              <h4 className="theme-color fw-bold fs-5 m-0">{user.name}</h4>
              <button onClick={() => setView('profile-setting')} className="btn p-0 border-0 bg-transparent" aria-label="Edit Profile">
                <IconSax name="edit-1" className="edit-icon fs-4 text-dark" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* options list */}
      <section className="my-3 px-3 mb-5 pb-4">
        <div className="custom-container">
          <ul className="profile-list list-unstyled bg-white rounded-3 border p-0 m-0 text-start">
            {profileOptions.map((opt, i) => (
              <li 
                key={i} 
                className={`border-bottom ${i === profileOptions.length - 1 ? 'border-bottom-0' : ''}`}
              >
                <a 
                  href="#!" 
                  onClick={(e) => { e.preventDefault(); setView(opt.view); }}
                  className="profile-box p-3 d-flex align-items-center gap-3 text-decoration-none text-dark"
                >
                  <div className="profile-img bg-light rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <IconSax name={opt.icon} className="icon fs-5 text-muted" />
                  </div>
                  <div className="profile-details flex-grow-1">
                    <h4 className="fw-semibold theme-color fs-6 m-0">{opt.title}</h4>
                    <h5 className="text-muted fs-8 mt-1 m-0">{opt.desc}</h5>
                  </div>
                  <IconSax name="arrow-right" className="fs-6 text-muted" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* bottom navbar */}
      <BottomNavbar />
    </div>
  );
};
