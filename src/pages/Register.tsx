import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const Register: React.FC = () => {
  const { setView } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    // For demo purposes, we redirect to login after signup
    setView('login');
  };

  return (
    <div className="auth-body dark min-vh-100 pb-5">
      <div className="auth-img">
        <img className="img-fluid auth-bg w-100" src="/assets/images/background/auth_bg.jpg" alt="auth_bg" />
        <div className="auth-content text-start">
          <div>
            <h2>Let’s you in</h2>
            <h4 className="p-0 text-muted">Hey, You have been missed!</h4>
          </div>
        </div>
      </div>

      <form className="auth-form mt-4" onSubmit={handleSignUp}>
        <div className="custom-container">
          {error && <div className="alert alert-danger py-2">{error}</div>}

          <div className="form-group text-start mb-3">
            <label htmlFor="inputname" className="form-label text-dark">Name</label>
            <div className="form-input mb-4 position-relative">
              <input
                type="text"
                className="form-control"
                id="inputname"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <IconSax name="user-1" className="icons position-absolute top-50 end-0 translate-middle-y me-3" />
            </div>
          </div>

          <div className="form-group text-start mb-3">
            <label htmlFor="inputemail" className="form-label text-dark">Email id</label>
            <div className="form-input mb-4 position-relative">
              <input
                type="email"
                className="form-control"
                id="inputemail"
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

          <div className="submit-btn mt-4">
            <button type="submit" className="btn auth-btn w-100 border-0 py-3">Sign UP</button>
          </div>
          
          <div className="division my-4 text-center text-muted">
            <span>OR</span>
          </div>

          <h4 className="signup text-center text-dark pt-0">
            Already have an account ?
            <a
              href="#!"
              className="ms-1"
              onClick={(e) => {
                e.preventDefault();
                setView('login');
              }}
            >
              Sign in
            </a>
          </h4>
        </div>
      </form>
    </div>
  );
};
