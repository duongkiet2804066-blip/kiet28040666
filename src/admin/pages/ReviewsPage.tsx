import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { logActivity } from '../services/adminService';

export const ReviewsPage: React.FC = () => {
  const { user, setActivityLogs } = useApp();
  const [reviews, setReviews] = useState([
    { id: 'r-1', product: 'Buddy Chair', user: 'Bruce Wayne', stars: 5, comment: 'Incredibly comfortable chair! Looks perfect in my living room.', status: 'Approved' },
    { id: 'r-2', product: 'Minimal Table', user: 'Sarah Connor', stars: 2, comment: 'Lacks robustness, scratches very easily.', status: 'Pending Approval' },
    { id: 'r-3', product: 'Accent Table Lamp', user: 'Tony Stark', stars: 4, comment: 'Excellent soft lighting, fits perfectly.', status: 'Approved' }
  ]);

  const handleApprove = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
    logActivity(user.name, `Approved customer review ID: ${id}`, setActivityLogs);
  };

  const handleHide = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'Hidden' } : r));
    logActivity(user.name, `Hid customer review ID: ${id}`, setActivityLogs);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this review permanently?')) {
      setReviews(prev => prev.filter(r => r.id !== id));
      logActivity(user.name, `Deleted customer review ID: ${id}`, setActivityLogs);
    }
  };

  return (
    <div className="text-start">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold theme-color m-0">Customer Reviews</h4>
          <p className="text-muted fs-8 m-0">Moderate ratings, approve reviews, or hide inappropriate comments.</p>
        </div>
      </div>

      <div className="row g-3">
        {reviews.map((rev) => (
          <div key={rev.id} className="col-12 col-md-6">
            <div className="card p-3 border-0 shadow-sm rounded-3 bg-white text-start h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <h6 className="fw-bold theme-color fs-7 m-0">{rev.product}</h6>
                  <span className={`badge ${
                    rev.status === 'Approved' ? 'bg-success-subtle text-success' :
                    rev.status === 'Hidden' ? 'bg-secondary-subtle text-secondary' :
                    'bg-warning-subtle text-warning'
                  }`}>
                    {rev.status}
                  </span>
                </div>
                <div className="text-muted fs-8 mb-2">Reviewed by: {rev.user}</div>
                <div className="stars text-warning fs-8 mb-2">{'★'.repeat(rev.stars)}{'☆'.repeat(5 - rev.stars)}</div>
                <p className="text-muted fs-7 mb-3">{rev.comment}</p>
              </div>
              <div className="d-flex justify-content-end gap-2 border-top pt-2 mt-auto">
                {rev.status !== 'Approved' && (
                  <button onClick={() => handleApprove(rev.id)} className="btn btn-sm btn-success px-3 py-1">Approve</button>
                )}
                {rev.status !== 'Hidden' && (
                  <button onClick={() => handleHide(rev.id)} className="btn btn-sm btn-light border px-3 py-1 text-muted">Hide</button>
                )}
                <button onClick={() => handleDelete(rev.id)} className="btn btn-sm btn-outline-danger px-2 py-1">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ReviewsPage;
