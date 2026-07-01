import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const ResetPassword: React.FC = () => {
  const { setView } = useApp();
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pass.trim() || !confirmPass.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (pass !== confirmPass) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    // For demo purposes, we redirect to login after resetting password
    setView('login');
  };

  return (
    <div className="auth-body dark min-vh-100 pb-5">
      <div className="auth-img">
        <img className="img-fluid auth-bg w-100" src="/assets/images/background/auth_bg.jpg" alt="auth_bg" />
        <div className="auth-content text-start">
          <div>
            <h2>Create a New Password</h2>
          </div>
        </div>
      </div>

      <form className="auth-form mt-4" onSubmit={handleSubmit}>
        <div className="custom-container">
          {error && <div className="alert alert-danger py-2">{error}</div>}

          <div className="form-group text-start mb-3">
            <label htmlFor="inputPassword1" className="form-label text-dark">New Password</label>
            <div className="form-input mb-4 position-relative">
              <input
                type="password"
                className="form-control"
                id="inputPassword1"
                placeholder="Enter New Password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
              <IconSax name="key" className="icons position-absolute top-50 end-0 translate-middle-y me-3" />
            </div>
          </div>

          <div className="form-group text-start mb-3">
            <label htmlFor="inputPassword2" className="form-label text-dark">Confirm Password</label>
            <div className="form-input position-relative">
              <input
                type="password"
                className="form-control"
                id="inputPassword2"
                placeholder="Enter Confirm Password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                required
              />
              <IconSax name="key" className="icons position-absolute top-50 end-0 translate-middle-y me-3" />
            </div>
          </div>

          <div className="submit-btn mt-4">
            <button type="submit" className="btn auth-btn w-100 border-0 py-3">Reset Password</button>
          </div>
        </div>
      </form>
    </div>
  );
};
