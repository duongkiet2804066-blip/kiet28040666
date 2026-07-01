import React from 'react';
import { IconSax } from '../../components/IconSax';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const sidebarItems = [
    { key: 'dashboard', label: 'Dashboard', icon: 'home-fill' },
    { key: 'products', label: 'Products', icon: 'box' },
    { key: 'categories', label: 'Categories', icon: 'media-sliders-3' },
    { key: 'orders', label: 'Orders', icon: 'bag' },
    { key: 'customers', label: 'Customers', icon: 'user-1' },
    { key: 'reviews', label: 'Reviews', icon: 'search-normal-2' },
    { key: 'coupons', label: 'Coupons', icon: 'discount' },
    { key: 'inventory', label: 'Inventory', icon: 'box-rotate' },
    { key: 'analytics', label: 'Analytics', icon: 'wallet-open' },
    { key: 'reports', label: 'Reports', icon: 'note-1' },
    { key: 'users', label: 'Users', icon: 'people' },
    { key: 'admins', label: 'Admins', icon: 'key' },
    { key: 'roles', label: 'Roles & Perms', icon: 'info-circle' },
    { key: 'settings', label: 'Settings', icon: 'setting-1' },
    { key: 'logs', label: 'Activity Logs', icon: 'box-time' },
    { key: 'backup', label: 'Backup DB', icon: 'box-rotate' }
  ];

  return (
    <aside 
      className="bg-dark text-white p-3 d-flex flex-column" 
      style={{ 
        width: '280px', 
        minWidth: '280px', 
        position: 'sticky', 
        top: 0, 
        height: '100vh',
        zIndex: 100,
        borderRight: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <div className="d-flex align-items-center gap-2 mb-4 px-2 py-1">
        <span className="fs-4">👑</span>
        <h4 className="m-0 fs-6 fw-bold text-white tracking-wider">FUZZY ADMIN</h4>
      </div>
      
      {/* Sidebar Links Scroll Area */}
      <div className="flex-grow-1 overflow-y-auto pr-1" style={{ maxHeight: 'calc(100vh - 140px)' }}>
        <ul className="list-unstyled m-0 p-0 text-start">
          {sidebarItems.map((item) => (
            <li key={item.key} className="mb-1">
              <button
                onClick={() => setActiveTab(item.key)}
                className={`btn w-100 text-start border-0 py-2 px-3 rounded d-flex align-items-center gap-3 fs-7 fw-semibold ${
                  activeTab === item.key ? 'btn-light text-dark' : 'text-white-50 btn-dark bg-transparent'
                }`}
              >
                <IconSax name={item.icon} className="fs-5" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Footer Exit button */}
      <div className="pt-3 border-top border-secondary mt-auto">
        <button
          onClick={onLogout}
          className="btn w-100 text-start border-0 py-2 px-3 text-danger btn-dark bg-transparent fs-7 fw-semibold d-flex align-items-center gap-3"
        >
          <IconSax name="key" className="fs-5" />
          <span>Exit Dashboard</span>
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;
