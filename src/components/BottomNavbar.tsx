import React from 'react';
import { useApp } from '../context/AppContext';

export const BottomNavbar: React.FC = () => {
  const { currentView, setView } = useApp();

  const isTabActive = (tab: string) => {
    if (tab === 'landing') return currentView === 'landing';
    return currentView.startsWith(tab);
  };

  const navItems = [
    { key: 'landing', icon: 'home', title: 'Home' },
    { key: 'categories', icon: 'categories', title: 'Categories' },
    { key: 'cart', icon: 'bag', title: 'Cart' },
    { key: 'wishlist', icon: 'heart', title: 'Wishlist' },
    { key: 'profile', icon: 'profile', title: 'Profile' }
  ];

  return (
    <div className="navbar-menu">
      <ul>
        {navItems.map((item) => {
          const active = isTabActive(item.key);
          return (
            <li key={item.key} className={active ? 'active' : ''}>
              <a
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  setView(item.key);
                }}
              >
                <div className="icon">
                  <img
                    className="unactive"
                    src={`/assets/images/svg/${item.icon}.svg`}
                    alt={item.title}
                  />
                  <img
                    className="active"
                    src={`/assets/images/svg/${item.icon}-fill.svg`}
                    alt={item.title}
                  />
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
