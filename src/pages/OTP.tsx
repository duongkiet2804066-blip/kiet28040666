import React, { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';

export const OTP: React.FC = () => {
  const { setView, currentViewParams } = useApp();
  const email = currentViewParams?.email || 'user@example.com';
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '']);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  const handleChange = (index: number, val: string) => {
    // Only allow single digit
    const cleaned = val.replace(/[^0-9]/g, '').slice(-1);
    const newDigits = [...digits];
    newDigits[index] = cleaned;
    setDigits(newDigits);

    if (cleaned && index < 4) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setView('reset-password');
  };

  return (
    <div className="auth-body dark min-vh-100 pb-5 text-center">
      <div className="auth-img">
        <img className="img-fluid auth-bg w-100" src="/assets/images/background/auth_bg.jpg" alt="auth_bg" />
        <div className="auth-content text-start">
          <div>
            <h2>OTP Verification</h2>
          </div>
        </div>
      </div>

      <div className="custom-container mt-4">
        <div className="otp-verification text-center my-4">
          <h4 className="text-dark fs-6 fw-normal">We have sent a verification code to</h4>
          <h4 className="otp-number mt-2 text-primary fw-bold">{email}</h4>
        </div>

        <form onSubmit={handleVerify}>
          <div className="d-flex justify-content-center gap-2 mb-4">
            {digits.map((digit, idx) => (
              <div key={idx} className="form-input dark-border-gradient" style={{ width: '50px' }}>
                <input
                  ref={inputRefs[idx]}
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  className="form-control text-center fs-4 fw-bold p-2"
                  placeholder="0"
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  maxLength={1}
                  style={{ height: '55px' }}
                />
              </div>
            ))}
          </div>

          <button type="submit" className="btn auth-btn w-100 border-0 py-3 mt-2">Verify</button>
        </form>

        <div className="text-center mt-4">
          <p className="text-muted mb-0">Didn't receive the OTP?</p>
          <a
            href="#!"
            onClick={(e) => {
              e.preventDefault();
              alert('OTP resent!');
            }}
            className="text-decoration-none fw-semibold"
          >
            Resend Code
          </a>
        </div>
      </div>
    </div>
  );
};
