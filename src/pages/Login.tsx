import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const Login: React.FC = () => {
  const { setView } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    // For demo purposes, we accept any credentials
    setView('landing');
  };

  return (
    <div className="auth-body dark min-vh-100 pb-5">
      <div className="auth-img">
        <img className="img-fluid auth-bg w-100" src="/assets/images/background/auth_bg.jpg" alt="auth_bg" />
        <div className="auth-content text-start">
          <div>
            <h2>Hello Again!</h2>
            <h4 className="p-0 text-muted">Welcome back, You have been missed!</h4>
          </div>
        </div>
      </div>

      <form className="auth-form mt-4" onSubmit={handleSignIn}>
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

          <div className="form-group text-start mb-3">
            <label htmlFor="inputPassword" className="form-label text-dark">Password</label>
            <div className="form-input position-relative">
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <IconSax name="key" className="icons position-absolute top-50 end-0 translate-middle-y me-3" />
            </div>
          </div>

          <div className="option mt-3 d-flex justify-content-between align-items-center">
            <div className="form-check d-flex align-items-center gap-2">
              <input className="form-check-input" type="checkbox" id="flexCheckDefault" />
              <label className="form-check-label text-dark" htmlFor="flexCheckDefault">Remember me</label>
            </div>
            <a
              className="forgot text-decoration-none"
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                setView('forgot-password');
              }}
            >
              Forgot password?
            </a>
          </div>

          <div className="submit-btn mt-4">
            <button type="submit" className="btn auth-btn w-100 border-0 py-3">Sign In</button>
          </div>
          
          <div className="division my-4 text-center text-muted">
            <span>OR</span>
          </div>

          <ul className="social-media d-flex justify-content-center gap-3 list-unstyled p-0 mb-4">
            <li>
              <a href="https://www.facebook.com/login/" target="_blank" rel="noreferrer">
                <img className="img-fluid icons" src="/assets/images/svg/facebook.svg" alt="facebook" style={{ width: '40px' }} />
              </a>
            </li>
            <li>
              <a href="https://www.google.co.in/" target="_blank" rel="noreferrer">
                <img className="img-fluid icons" src="/assets/images/svg/google.svg" alt="google" style={{ width: '40px' }} />
              </a>
            </li>
            <li>
              <a href="https://www.apple.com/in/" target="_blank" rel="noreferrer">
                <img className="img-fluid icons" src="/assets/images/svg/apple.svg" alt="apple" style={{ width: '40px' }} />
              </a>
            </li>
          </ul>

          <h4 className="signup text-center text-dark">
            Don’t have an account ?
            <a
              href="#!"
              className="ms-1"
              onClick={(e) => {
                e.preventDefault();
                setView('register');
              }}
            >
              Sign up
            </a>
          </h4>
        </div>
      </form>
    </div>
  );
};
