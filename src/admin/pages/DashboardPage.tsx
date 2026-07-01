import React from 'react';
import { useApp, type Order } from '../../context/AppContext';
import { IconSax } from '../../components/IconSax';
import { exportOrderInvoicePDF } from '../services/adminService';

interface DashboardPageProps {
  setViewTab: (tab: string) => void;
  setSelectedOrder: (order: Order | null) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ setViewTab, setSelectedOrder }) => {
  const { products, orders } = useApp();

  // Calculations for 8 stats cards
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status.toLowerCase() === 'pending' || o.status.toLowerCase() === 'ongoing').length;
  const cancelledOrders = orders.filter(o => o.status.toLowerCase() === 'cancelled').length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const profit = Math.round(totalRevenue * 0.65); // 65% profit margin mock
  const customers = 42; // static sample customers
  const visitors = 1850; // static sample page visitors

  // Recent 5 orders
  const recentOrders = orders.slice(-5).reverse();

  // Latest 4 users
  const latestUsers = [
    { name: 'Sarah Connor', email: 'sarah@gmail.com', time: '10 mins ago', avatar: '/assets/images/icons/profile1.png' },
    { name: 'Bruce Wayne', email: 'bruce@wayne.com', time: '35 mins ago', avatar: '/assets/images/icons/profile2.png' },
    { name: 'Peter Parker', email: 'peter@spider.com', time: '1 hour ago', avatar: '/assets/images/icons/profile3.png' },
    { name: 'Tony Stark', email: 'tony@stark.com', time: '3 hours ago', avatar: '/assets/images/icons/profile.png' }
  ];

  // Top 3 products (based on rating or index)
  const topProducts = products.slice(0, 3);

  // SVG Chart data points
  const revenueChartPoints = "30,130 90,110 150,90 210,120 270,70 330,40 390,20";
  const orderChartBars = [
    { day: 'M', height: 40 },
    { day: 'T', height: 60 },
    { day: 'W', height: 45 },
    { day: 'T', height: 80 },
    { day: 'F', height: 95 },
    { day: 'S', height: 70 },
    { day: 'S', height: 50 }
  ];

  return (
    <div className="admin-dashboard text-start w-100">
      
      {/* 8 Stats Cards Grid (4 per row on Desktop) */}
      <div className="row g-3 mb-4">
        {/* Total Revenue */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card border-0 shadow-sm p-3 bg-white rounded-3 h-100 d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fs-7 fw-semibold">Total Revenue</span>
              <div className="rounded-circle p-2 bg-light text-success" style={{ backgroundColor: '#edfaf2' }}>
                <IconSax name="wallet-open" className="fs-5" />
              </div>
            </div>
            <div>
              <h3 className="fw-bold theme-color fs-4 m-0">${totalRevenue.toLocaleString()}</h3>
              <p className="text-success fs-8 m-0 mt-1">▲ 12.5% vs last month</p>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card border-0 shadow-sm p-3 bg-white rounded-3 h-100 d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fs-7 fw-semibold">Total Orders</span>
              <div className="rounded-circle p-2 bg-light text-primary" style={{ backgroundColor: '#eef2f5' }}>
                <IconSax name="bag" className="fs-5" />
              </div>
            </div>
            <div>
              <h3 className="fw-bold theme-color fs-4 m-0">{totalOrders}</h3>
              <p className="text-success fs-8 m-0 mt-1">▲ 8.2% vs last month</p>
            </div>
          </div>
        </div>

        {/* Total Products */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card border-0 shadow-sm p-3 bg-white rounded-3 h-100 d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fs-7 fw-semibold">Total Products</span>
              <div className="rounded-circle p-2 bg-light text-warning" style={{ backgroundColor: '#fff8eb' }}>
                <IconSax name="box" className="fs-5" />
              </div>
            </div>
            <div>
              <h3 className="fw-bold theme-color fs-4 m-0">{totalProducts}</h3>
              <p className="text-muted fs-8 m-0 mt-1">Catalog furniture items</p>
            </div>
          </div>
        </div>

        {/* Customers */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card border-0 shadow-sm p-3 bg-white rounded-3 h-100 d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fs-7 fw-semibold">Customers</span>
              <div className="rounded-circle p-2 bg-light text-info" style={{ backgroundColor: '#ebf8ff' }}>
                <IconSax name="user-1" className="fs-5" />
              </div>
            </div>
            <div>
              <h3 className="fw-bold theme-color fs-4 m-0">{customers}</h3>
              <p className="text-success fs-8 m-0 mt-1">▲ 4 new accounts today</p>
            </div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card border-0 shadow-sm p-3 bg-white rounded-3 h-100 d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fs-7 fw-semibold">Pending Orders</span>
              <div className="rounded-circle p-2 bg-light text-warning" style={{ backgroundColor: '#fff5f0' }}>
                <IconSax name="truck-fast" className="fs-5" />
              </div>
            </div>
            <div>
              <h3 className="fw-bold text-warning fs-4 m-0">{pendingOrders}</h3>
              <p className="text-muted fs-8 m-0 mt-1">Awaiting courier dispatch</p>
            </div>
          </div>
        </div>

        {/* Cancelled Orders */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card border-0 shadow-sm p-3 bg-white rounded-3 h-100 d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fs-7 fw-semibold">Cancelled Orders</span>
              <div className="rounded-circle p-2 bg-light text-danger" style={{ backgroundColor: '#fff0f0' }}>
                <IconSax name="info-circle" className="fs-5" />
              </div>
            </div>
            <div>
              <h3 className="fw-bold text-danger fs-4 m-0">{cancelledOrders}</h3>
              <p className="text-muted fs-8 m-0 mt-1">Refund requests processed</p>
            </div>
          </div>
        </div>

        {/* Profit */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card border-0 shadow-sm p-3 bg-white rounded-3 h-100 d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fs-7 fw-semibold">Net Profit (Est)</span>
              <div className="rounded-circle p-2 bg-light text-success" style={{ backgroundColor: '#e8f7ec' }}>
                <IconSax name="wallet-open" className="fs-5" />
              </div>
            </div>
            <div>
              <h3 className="fw-bold text-success fs-4 m-0">${profit.toLocaleString()}</h3>
              <p className="text-success fs-8 m-0 mt-1">65% overall gross margin</p>
            </div>
          </div>
        </div>

        {/* Visitors */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card border-0 shadow-sm p-3 bg-white rounded-3 h-100 d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fs-7 fw-semibold">Store Visitors</span>
              <div className="rounded-circle p-2 bg-light text-secondary" style={{ backgroundColor: '#f2f2f2' }}>
                <IconSax name="people" className="fs-5" />
              </div>
            </div>
            <div>
              <h3 className="fw-bold theme-color fs-4 m-0">{visitors}</h3>
              <p className="text-success fs-8 m-0 mt-1">▲ 15.2% unique traffic</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row g-3 mb-4">
        {/* Revenue Line Chart */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm p-3 bg-white rounded-3">
            <h5 className="fs-6 fw-bold theme-color mb-3">Revenue & Sales Growth Trend</h5>
            <div className="d-flex justify-content-center" style={{ height: '165px' }}>
              <svg viewBox="0 0 400 150" className="w-100 h-100">
                <defs>
                  <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#122636" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#122636" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <line x1="0" y1="30" x2="400" y2="30" stroke="#f0f0f0" strokeWidth="1" />
                <line x1="0" y1="70" x2="400" y2="70" stroke="#f0f0f0" strokeWidth="1" />
                <line x1="0" y1="110" x2="400" y2="110" stroke="#f0f0f0" strokeWidth="1" />
                <line x1="0" y1="140" x2="400" y2="140" stroke="#d0d0d0" strokeWidth="1.5" />
                <path d={`M30,140 L${revenueChartPoints} L390,140 Z`} fill="url(#chart-grad)" />
                <polyline fill="none" stroke="#122636" strokeWidth="3" points={revenueChartPoints} strokeLinecap="round" />
                {revenueChartPoints.split(' ').map((pt, i) => {
                  const [x, y] = pt.split(',');
                  return <circle key={i} cx={x} cy={y} r="4" fill="#ffffff" stroke="#122636" strokeWidth="2.5" />;
                })}
              </svg>
            </div>
            <div className="d-flex justify-content-between px-2 text-muted fs-8 mt-2">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
            </div>
          </div>
        </div>

        {/* Weekly Orders Bar Chart */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm p-3 bg-white rounded-3 h-100 d-flex flex-column justify-content-between">
            <h5 className="fs-6 fw-bold theme-color mb-3">Weekly Sales Volume</h5>
            <div className="d-flex justify-content-around align-items-end flex-grow-1" style={{ height: '140px' }}>
              {orderChartBars.map((bar, idx) => (
                <div key={idx} className="d-flex flex-column align-items-center flex-grow-1" style={{ maxWidth: '30px' }}>
                  <div 
                    className="bg-primary-subtle w-100 rounded-top" 
                    style={{ 
                      height: `${bar.height}px`, 
                      backgroundColor: '#122636', 
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 0.3s' 
                    }}
                  />
                  <span className="text-muted fs-8 mt-2">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Orders & Side Cards */}
      <div className="row g-3">
        {/* Recent Orders List */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm p-3 bg-white rounded-3 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fs-6 fw-bold theme-color m-0">Recent Orders</h5>
              <button onClick={() => setViewTab('orders')} className="btn btn-link fs-7 p-0 text-decoration-none fw-semibold">View All</button>
            </div>
            <div className="table-responsive">
              <table className="table align-middle fs-7 mb-0 text-start">
                <thead>
                  <tr className="table-light text-muted">
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="fw-semibold text-primary">{order.id}</td>
                      <td>{order.address.name}</td>
                      <td>{order.date}</td>
                      <td>
                        <span className={`badge px-2 py-1 rounded-pill ${
                          order.status.toLowerCase() === 'delivered' ? 'bg-success-subtle text-success' :
                          order.status.toLowerCase() === 'shipped' ? 'bg-info-subtle text-info' :
                          'bg-warning-subtle text-warning'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="fw-bold">${order.total}</td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2">
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
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Side Cards: Top Products & Latest Users */}
        <div className="col-12 col-lg-4">
          <div className="d-flex flex-column gap-3">
            {/* Latest Users */}
            <div className="card border-0 shadow-sm p-3 bg-white rounded-3">
              <h5 className="fs-6 fw-bold theme-color mb-3">New Signups</h5>
              <ul className="list-unstyled m-0 p-0 text-start">
                {latestUsers.map((user, idx) => (
                  <li key={idx} className="d-flex align-items-center gap-3 mb-3 pb-2 border-bottom last-border-none">
                    <img src={user.avatar} className="rounded-circle border" alt="avatar" style={{ width: '36px', height: '36px', objectFit: 'cover' }} />
                    <div className="flex-grow-1">
                      <h6 className="theme-color fw-semibold fs-7 m-0">{user.name}</h6>
                      <p className="text-muted fs-8 m-0">{user.email}</p>
                    </div>
                    <span className="text-muted fs-9">{user.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Products */}
            <div className="card border-0 shadow-sm p-3 bg-white rounded-3">
              <h5 className="fs-6 fw-bold theme-color mb-3">Top Sellers</h5>
              <ul className="list-unstyled m-0 p-0 text-start">
                {topProducts.map((prod, idx) => (
                  <li key={prod.id} className="d-flex align-items-center gap-3 mb-3 pb-2 border-bottom last-border-none">
                    <span className="fw-bold text-muted fs-6">#{idx + 1}</span>
                    <img src={prod.image} className="rounded border" alt="prod" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                    <div className="flex-grow-1">
                      <h6 className="theme-color fw-semibold fs-7 m-0">{prod.name}</h6>
                      <p className="text-success fs-8 m-0 fw-medium">${prod.price}</p>
                    </div>
                    <div className="text-end">
                      <span className="badge bg-light text-dark border fs-9">★ {prod.rating}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
