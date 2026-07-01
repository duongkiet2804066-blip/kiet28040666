import React, { useState } from 'react';

export const AnalyticsPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month' | 'year'>('month');

  const getStats = () => {
    switch (timeframe) {
      case 'day':
        return { sales: '$1,200', orders: 15, visitors: 200, conversion: '7.5%' };
      case 'week':
        return { sales: '$9,800', orders: 84, visitors: 1400, conversion: '6.0%' };
      case 'year':
        return { sales: '$124,000', orders: 980, visitors: 22000, conversion: '4.4%' };
      case 'month':
      default:
        return { sales: '$34,500', orders: 310, visitors: 6200, conversion: '5.0%' };
    }
  };

  const stats = getStats();

  return (
    <div className="text-start">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold theme-color m-0">Store Analytics</h4>
          <p className="text-muted fs-8 m-0">Monitor store conversions, visit counts, and total sales metrics.</p>
        </div>
        <div className="btn-group btn-group-sm">
          {['day', 'week', 'month', 'year'].map((t) => (
            <button 
              key={t}
              onClick={() => setTimeframe(t as any)}
              className={`btn btn-sm btn-light border text-capitalize fw-semibold px-3 ${timeframe === t ? 'active bg-dark text-white' : 'theme-color bg-white'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="row g-3 mb-4">
        {Object.entries(stats).map(([k, v]) => (
          <div key={k} className="col-6 col-md-3">
            <div className="card p-3 border-0 shadow-sm rounded-3 bg-white text-start">
              <h6 className="text-muted fs-8 text-capitalize mb-1">{k}</h6>
              <h4 className="fw-bold theme-color fs-5 m-0">{v}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* SVG graph mockup */}
      <div className="card p-3 border-0 shadow-sm rounded-3 bg-white">
        <h6 className="fw-bold theme-color mb-3">Performance Chart</h6>
        <div className="d-flex justify-content-center" style={{ height: '140px' }}>
          <svg viewBox="0 0 400 120" className="w-100 h-100">
            <polyline 
              fill="none" 
              stroke="#122636" 
              strokeWidth="4" 
              points="10,100 50,80 100,90 150,60 200,75 250,40 300,50 350,15" 
              strokeLinecap="round" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default AnalyticsPage;
