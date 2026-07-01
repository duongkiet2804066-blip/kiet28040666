import React from 'react';

export const ReportsPage: React.FC = () => {
  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="text-start">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold theme-color m-0">Store Reports & Statements</h4>
          <p className="text-muted fs-8 m-0">Review detailed analytics reports, print sales breakdowns, and export PDF statements.</p>
        </div>
        <button onClick={handlePrintPDF} className="btn btn-dark btn-sm rounded-pill px-3 py-2 fw-semibold fs-7">
          Print PDF Statement
        </button>
      </div>

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <div className="card p-3 border-0 shadow-sm rounded-3 bg-white text-start">
            <h6 className="fw-bold mb-3 theme-color">Monthly Traffic Growth</h6>
            <div className="d-flex justify-content-center" style={{ height: '150px' }}>
              <svg viewBox="0 0 400 150" className="w-100 h-100">
                <polyline fill="none" stroke="#2e7d32" strokeWidth="4" points="10,130 80,110 150,120 220,80 290,95 380,40" strokeLinecap="round" />
                <circle cx="380" cy="40" r="5" fill="#2e7d32" />
              </svg>
            </div>
            <div className="d-flex justify-content-between text-muted fs-8 mt-2">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card p-3 border-0 shadow-sm rounded-3 bg-white text-start">
            <h6 className="fw-bold mb-3 theme-color">Visitor Sales Conversion</h6>
            <div className="d-flex justify-content-center" style={{ height: '150px' }}>
              <svg viewBox="0 0 400 150" className="w-100 h-100">
                <polyline fill="none" stroke="#122636" strokeWidth="4" points="10,110 80,90 150,105 220,60 290,75 380,25" strokeLinecap="round" />
                <circle cx="380" cy="25" r="5" fill="#122636" />
              </svg>
            </div>
            <div className="d-flex justify-content-between text-muted fs-8 mt-2">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReportsPage;
