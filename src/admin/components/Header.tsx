import React from 'react';
import { IconSax } from '../../components/IconSax';

interface HeaderProps {
  activeTab: string;
  userName: string;
  userPic: string;
  onNavigateTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, userName, userPic, onNavigateTab }) => {
  return (
    <header 
      className="bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center position-sticky top-0 w-100" 
      style={{ zIndex: 90 }}
    >
      {/* Title & Search Bar */}
      <div className="d-flex align-items-center gap-3 w-50">
        <h3 className="m-0 fs-5 fw-bold theme-color text-capitalize">{activeTab} Control Center</h3>
        <div className="input-group input-group-sm w-50 d-none d-lg-flex">
          <span className="input-group-text bg-light border-end-0">
            <IconSax name="search-normal-2" className="fs-7 text-muted" />
          </span>
          <input 
            type="text" 
            className="form-control form-control-sm bg-light border-start-0" 
            placeholder="Search catalog, users, logs..." 
          />
        </div>
      </div>
      
      {/* Action Icons & Avatar */}
      <div className="d-flex align-items-center gap-3">
        <button 
          className="btn p-0 border-0 bg-transparent" 
          onClick={() => onNavigateTab('messages')}
          title="Inbox Messages"
        >
          <IconSax name="message" className="fs-5 text-muted cursor-pointer" />
        </button>
        <button 
          className="btn p-0 border-0 bg-transparent" 
          onClick={() => onNavigateTab('notifications')}
          title="Alert Center"
        >
          <IconSax name="bell-2" className="fs-5 text-muted cursor-pointer" />
        </button>
        <img 
          src={userPic} 
          className="rounded-circle border" 
          alt="profile" 
          style={{ width: '36px', height: '36px', objectFit: 'cover' }}
        />
        <div className="d-none d-md-block text-start">
          <h6 className="m-0 fs-7 fw-bold theme-color">{userName}</h6>
          <p className="text-muted fs-9 m-0">Administrator</p>
        </div>
      </div>
    </header>
  );
};
export default Header;
