import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const Setting: React.FC = () => {
  const { setView, rtlMode, setRtlMode, darkTheme, setDarkTheme } = useApp();
  const [allowNotifications, setAllowNotifications] = useState(true);

  return (
    <div className="pb-5 bg-light min-vh-100 text-start">
      {/* header */}
      <header className="section-t-space bg-white py-3 px-3 shadow-sm position-sticky top-0 w-100" style={{ zIndex: 100 }}>
        <div className="custom-container">
          <div className="header-panel d-flex align-items-center">
            <button onClick={() => setView('profile')} className="btn p-0 border-0 bg-transparent me-3">
              <IconSax name="arrow-left" className="back-btn fs-4 text-dark" />
            </button>
            <h3 className="m-0 fs-5 fw-bold theme-color">Settings</h3>
          </div>
        </div>
      </header>

      {/* settings list */}
      <section className="my-3 px-3">
        <div className="custom-container">
          <ul className="notification-setting list-unstyled bg-white rounded-3 border p-0 m-0 text-start">
            <li className="p-3 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="fw-semibold theme-color fs-6 m-0">Dark Mode</h5>
              <div className="switch-btn">
                <input 
                  id="dark-switch" 
                  type="checkbox" 
                  checked={darkTheme}
                  onChange={(e) => setDarkTheme(e.target.checked)}
                />
              </div>
            </li>
            
            <li className="p-3 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="fw-semibold theme-color fs-6 m-0">RTL Direction</h5>
              <div className="switch-btn">
                <input 
                  id="dir-switch" 
                  type="checkbox" 
                  checked={rtlMode}
                  onChange={(e) => setRtlMode(e.target.checked)}
                />
              </div>
            </li>

            <li className="p-3 d-flex justify-content-between align-items-center">
              <h5 className="fw-semibold theme-color fs-6 m-0">Allow Notifications</h5>
              <div className="switch-btn">
                <input 
                  type="checkbox" 
                  checked={allowNotifications}
                  onChange={(e) => setAllowNotifications(e.target.checked)}
                />
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
