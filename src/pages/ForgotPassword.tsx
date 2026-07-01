import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const ForgotPassword: React.FC = () => {
  const { setView } = useApp();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    setError('');
    setView('otp', { email });
  };

  return (
    <div className="auth-body dark min-vh-100 pb-5">
      <div className="auth-img">
        <img className="img-fluid auth-bg w-100" src="/assets/images/background/auth_bg.jpg" alt="auth_bg" />
        <div className="auth-content text-start">
          <div>
            <h2>Forgot Password?</h2>
          </div>
        </div>
      </div>

      <form className="auth-form mt-4" onSubmit={handleSubmit}>
        <div className="custom-container">
          {error && <div className="alert alert-danger py-2">{error}</div>}

          <div className="form-group text-start mb-3">
            <label htmlFor="inputusername" className="form-label text-dark">Email id</label>
            <div className="form-input mb-4 position-relative">
              <input
                type="email"
                className="form-control"
                id="inputusername"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <IconSax name="mail" className="icons position-absolute top-50 end-0 translate-middle-y me-3" />
            </div>
          </div>

          <div className="submit-btn mt-4">
            <button type="submit" className="btn auth-btn w-100 border-0 py-3">Send OTP</button>
          </div>
          
          <div className="text-center mt-3">
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                setView('login');
              }}
              className="text-decoration-none"
            >
              Back to Sign In
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};
