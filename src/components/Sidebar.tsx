import React from 'react';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { setRtlMode, rtlMode, setDarkTheme, darkTheme, setView, user } = useApp();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="offcanvas-backdrop fade show"
        style={{ zIndex: 1040 }}
        onClick={onClose}
      />
      
      <div
        className="offcanvas sidebar-offcanvas offcanvas-start show"
        tabIndex={-1}
        style={{ zIndex: 1050, visibility: 'visible' }}
      >
        <div className="offcanvas-header d-flex align-items-center justify-content-between p-3 border-b-grey">
          <div className="d-flex align-items-center gap-2">
            <img className="img-fluid profile-pic rounded-circle" src={user.profilePic} alt="profile" style={{ width: '40px', height: '40px' }} />
            <div className="d-block text-start">
              <h4 className="m-0 fs-6 fw-semibold">Hello,</h4>
              <h4 className="m-0 fs-6 theme-color fw-bold">{user.name}!</h4>
            </div>
          </div>
          <button type="button" className="btn-close text-reset" onClick={onClose} aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-3">
          <div className="sidebar-content">
            <ul className="link-section list-unstyled m-0 p-0">
              <li className="py-2 border-bottom">
                <div className="pages d-flex justify-content-between align-items-center">
                  <h4 className="m-0 fs-6">RTL Direction</h4>
                  <div className="switch-btn">
                    <input
                      id="dir-switch"
                      type="checkbox"
                      checked={rtlMode}
                      onChange={(e) => setRtlMode(e.target.checked)}
                    />
                  </div>
                </div>
              </li>
              <li className="py-2 border-bottom">
                <div className="pages d-flex justify-content-between align-items-center">
                  <h4 className="m-0 fs-6">Dark Mode</h4>
                  <div className="switch-btn">
                    <input
                      id="dark-switch"
                      type="checkbox"
                      checked={darkTheme}
                      onChange={(e) => setDarkTheme(e.target.checked)}
                    />
                  </div>
                </div>
              </li>

              <li className="py-2 border-bottom">
                <a
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    setView('demo-listing');
                    onClose();
                  }}
                  className="pages d-flex justify-content-between align-items-center text-decoration-none text-dark"
                >
                  <h4 className="m-0 fs-6">Demo Pages List</h4>
                  <i className="ri-arrow-drop-right-line fs-5"></i>
                </a>
              </li>

              <li className="py-2 border-bottom">
                <a
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    setView('admin');
                    onClose();
                  }}
                  className="pages d-flex justify-content-between align-items-center text-decoration-none text-dark"
                >
                  <div className="d-flex align-items-center gap-2">
                    <span className="fs-6">👑</span>
                    <h4 className="m-0 fs-6 fw-bold text-primary">Admin Dashboard</h4>
                  </div>
                  <i className="ri-arrow-drop-right-line fs-5"></i>
                </a>
              </li>

              <li className="py-2 border-bottom">
                <a
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    setView('setting');
                    onClose();
                  }}
                  className="pages d-flex justify-content-between align-items-center text-decoration-none text-dark"
                >
                  <h4 className="m-0 fs-6">Settings</h4>
                  <i className="ri-arrow-drop-right-line fs-5"></i>
                </a>
              </li>

              <li className="py-2 border-bottom">
                <a
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    setView('login');
                    onClose();
                  }}
                  className="pages d-flex justify-content-between align-items-center text-decoration-none text-dark"
                >
                  <h4 className="m-0 fs-6">Logout</h4>
                  <i className="ri-arrow-drop-right-line fs-5"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
