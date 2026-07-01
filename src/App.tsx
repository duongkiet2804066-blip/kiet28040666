import React from 'react';
import { AppProvider, useApp } from './context/AppContext';

// Import all pages
import { Onboarding } from './pages/Onboarding';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { OTP } from './pages/OTP';
import { ResetPassword } from './pages/ResetPassword';
import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { Shop } from './pages/Shop';
import { Search } from './pages/Search';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Shipping } from './pages/Shipping';
import { ShippingAddress } from './pages/ShippingAddress';
import { ManageAddress } from './pages/ManageAddress';
import { NewAddress } from './pages/NewAddress';
import { Checkout } from './pages/Checkout';
import { Payment } from './pages/Payment';
import { NewCard } from './pages/NewCard';
import { OrderHistory } from './pages/OrderHistory';
import { OrderDetails } from './pages/OrderDetails';
import { OrderTracking } from './pages/OrderTracking';
import { Notification } from './pages/Notification';
import { Profile } from './pages/Profile';
import { ProfileSetting } from './pages/ProfileSetting';
import { ManagePayment } from './pages/ManagePayment';
import { Language } from './pages/Language';
import { Setting } from './pages/Setting';
import { Help } from './pages/Help';
import { TermsConditions } from './pages/TermsConditions';
import { DemoListing } from './pages/DemoListing';
import { Coupon } from './pages/Coupon';
import { Wishlist } from './pages/Wishlist';
import { AdminLayout } from './admin/AdminLayout';

import './App.css';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  const isMainTab = ['landing', 'categories', 'cart', 'wishlist', 'profile'].includes(currentView);

  return (
    <>
      {/* Main Tabs (kept alive in DOM to prevent image flashing and preserve scroll state) */}
      <div style={{ display: currentView === 'landing' ? 'block' : 'none' }}>
        <Home />
      </div>
      <div style={{ display: currentView === 'categories' ? 'block' : 'none' }}>
        <Categories />
      </div>
      <div style={{ display: currentView === 'cart' ? 'block' : 'none' }}>
        <Cart />
      </div>
      <div style={{ display: currentView === 'wishlist' ? 'block' : 'none' }}>
        <Wishlist />
      </div>
      <div style={{ display: currentView === 'profile' ? 'block' : 'none' }}>
        <Profile />
      </div>

      {/* Transient/Modal Pages (rendered dynamically when active) */}
      {!isMainTab && (
        (() => {
          switch (currentView) {
            case 'onboarding':
              return <Onboarding />;
            case 'login':
              return <Login />;
            case 'register':
              return <Register />;
            case 'forgot-password':
              return <ForgotPassword />;
            case 'otp':
              return <OTP />;
            case 'reset-password':
              return <ResetPassword />;
            case 'shop':
              return <Shop />;
            case 'search':
              return <Search />;
            case 'product-details':
              return <ProductDetails />;
            case 'shipping':
              return <Shipping />;
            case 'shipping-address':
              return <ShippingAddress />;
            case 'manage-address':
              return <ManageAddress />;
            case 'new-address':
              return <NewAddress />;
            case 'checkout':
              return <Checkout />;
            case 'payment':
              return <Payment />;
            case 'new-card':
              return <NewCard />;
            case 'order-history':
              return <OrderHistory />;
            case 'order-details':
              return <OrderDetails />;
            case 'order-tracking':
              return <OrderTracking />;
            case 'notification':
              return <Notification />;
            case 'profile-setting':
              return <ProfileSetting />;
            case 'manage-payment':
              return <ManagePayment />;
            case 'language':
              return <Language />;
            case 'setting':
              return <Setting />;
            case 'help':
              return <Help />;
            case 'terms-conditions':
              return <TermsConditions />;
            case 'coupon':
              return <Coupon />;
            case 'demo-listing':
              return <DemoListing />;
            case 'admin':
              return <AdminLayout />;
            default:
              return <Onboarding />;
          }
        })()
      )}
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
