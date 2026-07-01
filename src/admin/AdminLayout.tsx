import React, { useState, useEffect } from 'react';
import { useApp, type Order } from '../context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardPage } from './pages/DashboardPage';
import { ProductsPage } from './pages/ProductsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { OrdersPage } from './pages/OrdersPage';
import { CustomersPage } from './pages/CustomersPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { CouponsPage } from './pages/CouponsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ReportsPage } from './pages/ReportsPage';
import { InventoryPage } from './pages/InventoryPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { MessagesPage } from './pages/MessagesPage';
import { UsersPage } from './pages/UsersPage';
import { AdminsPage } from './pages/AdminsPage';
import { RolesPage } from './pages/RolesPage';
import { SettingsPage } from './pages/SettingsPage';
import { LogsPage } from './pages/LogsPage';
import { BackupPage } from './pages/BackupPage';
import { exportOrderInvoicePDF } from './services/adminService';

export const AdminLayout: React.FC = () => {
  const { setView, user } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Apply full-screen desktop layout style to document.body on mount
  useEffect(() => {
    document.body.classList.add('admin-view-active');
    return () => {
      document.body.classList.remove('admin-view-active');
    };
  }, []);

  const handleLogout = () => {
    setView('landing');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage setViewTab={setActiveTab} setSelectedOrder={setSelectedOrder} />;
      case 'products':
        return <ProductsPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'orders':
        return <OrdersPage setSelectedOrder={setSelectedOrder} />;
      case 'customers':
        return <CustomersPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'coupons':
        return <CouponsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'inventory':
        return <InventoryPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'messages':
        return <MessagesPage />;
      case 'users':
        return <UsersPage />;
      case 'admins':
        return <AdminsPage />;
      case 'roles':
        return <RolesPage />;
      case 'settings':
        return <SettingsPage />;
      case 'logs':
        return <LogsPage />;
      case 'backup':
        return <BackupPage />;
      default:
        return <DashboardPage setViewTab={setActiveTab} setSelectedOrder={setSelectedOrder} />;
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-light text-dark font-sans w-100 position-relative">
      
      {/* Persistent Left Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      {/* Main Workspace */}
      <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
        
        {/* Top Sticky Header */}
        <Header 
          activeTab={activeTab} 
          userName={user.name} 
          userPic={user.profilePic} 
          onNavigateTab={setActiveTab} 
        />

        {/* Scrollable Workspace Container */}
        <main className="p-4 flex-grow-1 overflow-auto bg-light w-100">
          <div className="w-100">
            {renderTabContent()}
          </div>
        </main>
      </div>

      {/* Selected Order Details Modal Popup */}
      {selectedOrder && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1040 }} onClick={() => setSelectedOrder(null)} />
          <div className="modal fade show d-block text-start" tabIndex={-1} style={{ zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '450px' }}>
              <div className="modal-content border-0 p-3 rounded-4 shadow bg-white text-dark">
                <div className="modal-header border-0 p-0 mb-3 d-flex justify-content-between align-items-center">
                  <h5 className="modal-title fw-bold">Order Details: {selectedOrder.id}</h5>
                  <button type="button" className="btn-close" onClick={() => setSelectedOrder(null)} />
                </div>
                <div className="modal-body p-0 fs-7">
                  <div className="mb-3 border-bottom pb-2">
                    <p className="mb-1"><strong>Customer:</strong> {selectedOrder.address.name}</p>
                    <p className="mb-1"><strong>Phone:</strong> {selectedOrder.address.phone}</p>
                    <p className="mb-1"><strong>Shipping Address:</strong> {selectedOrder.address.houseNo}, {selectedOrder.address.locality}, {selectedOrder.address.city}</p>
                    <p className="mb-1"><strong>Date:</strong> {selectedOrder.date}</p>
                    <p className="mb-0"><strong>Shipping Method:</strong> {selectedOrder.shippingMethod}</p>
                  </div>
                  
                  <h6 className="fw-semibold mb-2 text-muted fs-8">ORDERED PRODUCTS</h6>
                  <ul className="list-group list-group-flush mb-3 p-0 border rounded overflow-hidden">
                    {selectedOrder.items.map((item, idx) => (
                      <li key={idx} className="list-group-item d-flex justify-content-between align-items-center py-2 px-3">
                        <div>
                          <p className="m-0 fw-semibold theme-color">{item.product.name}</p>
                          <span className="text-muted fs-8">Qty: {item.quantity} | Size: {item.selectedSize || 'M'}</span>
                        </div>
                        <span className="fw-bold text-muted">${item.product.price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="d-flex justify-content-between fs-7 mb-1 text-muted">
                    <span>Subtotal:</span>
                    <span>${selectedOrder.subtotal}</span>
                  </div>
                  <div className="d-flex justify-content-between fs-7 mb-1 text-muted">
                    <span>Shipping Fee:</span>
                    <span>${selectedOrder.shippingFee}</span>
                  </div>
                  <div className="d-flex justify-content-between fs-7 mb-1 text-success">
                    <span>Discount:</span>
                    <span>-${selectedOrder.discount}</span>
                  </div>
                  <div className="d-flex justify-content-between fs-6 fw-bold theme-color border-top pt-2 mt-2">
                    <span>Grand Total:</span>
                    <span>${selectedOrder.total}</span>
                  </div>
                </div>
                <div className="modal-footer border-0 p-0 mt-3 d-flex gap-2">
                  <button 
                    onClick={() => exportOrderInvoicePDF(selectedOrder)} 
                    className="btn btn-dark flex-grow-1 py-2 rounded-pill fs-7 fw-semibold"
                  >
                    Print Invoice
                  </button>
                  <button 
                    onClick={() => setSelectedOrder(null)} 
                    className="btn btn-light border flex-grow-1 py-2 rounded-pill fs-7 fw-semibold text-dark"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default AdminLayout;
