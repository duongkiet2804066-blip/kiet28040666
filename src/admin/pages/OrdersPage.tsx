import React, { useState } from 'react';
import { useApp, type Order } from '../../context/AppContext';
import { IconSax } from '../../components/IconSax';
import { exportOrderInvoicePDF, logActivity } from '../services/adminService';

interface OrdersPageProps {
  setSelectedOrder: (order: Order | null) => void;
}

export const OrdersPage: React.FC<OrdersPageProps> = ({ setSelectedOrder }) => {
  const { orders, setOrders, user, setActivityLogs } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus as any } : o));
    logActivity(user.name, `Updated Order ${id} status to: ${newStatus}`, setActivityLogs);
  };

  const handleCancelOrder = (id: string) => {
    if (window.confirm(`Are you sure you want to cancel order ${id}?`)) {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'cancelled' as any } : o));
      logActivity(user.name, `Cancelled Order ${id}`, setActivityLogs);
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.address.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? o.status.toLowerCase() === statusFilter.toLowerCase() : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="text-start">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold theme-color m-0">Orders Management</h4>
          <p className="text-muted fs-8 m-0">Verify transaction records, ship products, and update dispatch orders.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="card border-0 shadow-sm p-3 rounded-3 bg-white mb-3">
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-8">
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-light border-end-0">
                <IconSax name="search-normal-2" className="fs-7 text-muted" />
              </span>
              <input 
                type="text" 
                className="form-control form-control-sm bg-light border-start-0" 
                placeholder="Search by order ID or customer..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12 col-md-4">
            <select 
              className="form-select form-select-sm bg-light" 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table align-middle fs-7 mb-0 text-start">
            <thead>
              <tr className="table-light text-muted">
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Total Price</th>
                <th>Payment</th>
                <th>Date</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="fw-semibold text-primary">{order.id}</td>
                  <td>{order.address.name}</td>
                  <td>
                    <select 
                      className={`form-select form-select-sm border-0 fw-semibold rounded-pill px-2 ${
                        order.status.toLowerCase() === 'delivered' ? 'bg-success-subtle text-success' :
                        order.status.toLowerCase() === 'shipped' ? 'bg-info-subtle text-info' :
                        order.status.toLowerCase() === 'cancelled' ? 'bg-danger-subtle text-danger' :
                        'bg-warning-subtle text-warning'
                      }`} 
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      disabled={order.status.toLowerCase() === 'cancelled'}
                    >
                      <option value="pending">pending</option>
                      <option value="shipped">shipped</option>
                      <option value="delivered">delivered</option>
                      <option value="cancelled" disabled>cancelled</option>
                    </select>
                  </td>
                  <td className="fw-bold">${order.total}</td>
                  <td><span className="badge bg-light text-dark border fs-9 text-uppercase">{order.paymentMethod}</span></td>
                  <td className="text-muted fs-8">{order.date}</td>
                  <td className="text-end">
                    <div className="d-flex justify-content-end gap-1">
                      <button 
                        onClick={() => setSelectedOrder(order)} 
                        className="btn btn-sm btn-light border p-1 rounded"
                        title="View details"
                      >
                        <IconSax name="info-circle" className="fs-7 text-muted" />
                      </button>
                      <button 
                        onClick={() => exportOrderInvoicePDF(order)} 
                        className="btn btn-sm btn-light border p-1 rounded text-primary"
                        title="Print Invoice"
                      >
                        <IconSax name="translate" className="fs-7" />
                      </button>
                      {order.status.toLowerCase() !== 'cancelled' && (
                        <button 
                          onClick={() => handleCancelOrder(order.id)} 
                          className="btn btn-sm btn-light border p-1 rounded text-danger"
                          title="Cancel Order"
                        >
                          <IconSax name="close-circle" className="fs-7" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">No orders match your search parameters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default OrdersPage;
