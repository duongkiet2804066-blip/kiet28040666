import React from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from './IconSax';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  showSearch?: boolean;
  showNotification?: boolean;
  showWishlist?: boolean;
  wishlistProductId?: number;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  showSearch = false,
  showNotification = false,
  showWishlist = false,
  wishlistProductId
}) => {
  const { setView, wishlist, toggleWishlist } = useApp();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      setView('landing'); // fallback
    }
  };

  const isLiked = wishlistProductId ? wishlist.includes(wishlistProductId) : false;

  return (
    <header className="product-page-header w-100 position-sticky top-0 bg-white" style={{ zIndex: 100 }}>
      <div className="header-panel d-flex align-items-center justify-content-between px-3 py-2">
        <button onClick={handleBack} className="btn p-0 border-0 background-none product-back">
          <IconSax name="arrow-left" className="back-btn fs-4" />
        </button>
        <h3 className="title m-0 fs-5 fw-semibold text-center flex-grow-1">{title}</h3>
        <div className="d-flex gap-2 align-items-center">
          {showSearch && (
            <button onClick={() => setView('search')} className="btn p-0 border-0 background-none search">
              <IconSax name="search-normal-2" className="icons fs-4" />
            </button>
          )}

          {showNotification && (
            <button onClick={() => setView('notification')} className="btn p-0 border-0 background-none">
              <IconSax name="bell-2" className="icons fs-4" />
            </button>
          )}

          {showWishlist && wishlistProductId && (
            <div
              onClick={() => toggleWishlist(wishlistProductId)}
              className={`like-btn border-0 p-0 m-0 ${isLiked ? 'active' : 'inactive'}`}
              style={{ cursor: 'pointer' }}
            >
              <img className="outline-icon" src="/assets/images/svg/like.svg" alt="like" />
              <img className="fill-icon" src="/assets/images/svg/like-fill.svg" alt="like" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
