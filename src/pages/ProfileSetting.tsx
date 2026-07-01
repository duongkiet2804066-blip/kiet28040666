import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const ProfileSetting: React.FC = () => {
  const { user, updateUser, setView } = useApp();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Please fill in all fields.');
      return;
    }
    updateUser({
      name,
      email,
      phone,
      profilePic: user.profilePic
    });
    alert('Profile updated successfully!');
    setView('profile');
  };

  return (
    <div className="pb-5 bg-light min-vh-100 text-start">
      {/* header */}
      <header className="profile-header bg-white py-4 px-3 shadow-sm text-center" style={{ borderBottomRightRadius: '24px', borderBottomLeftRadius: '24px' }}>
        <div className="custom-container position-relative">
          <button onClick={() => setView('profile')} className="btn p-0 border-0 bg-transparent position-absolute start-0 top-0">
            <IconSax name="arrow-left" className="back-btn fs-4 text-dark" />
          </button>
          <h3 className="fw-bold theme-color fs-5 m-0 mb-4">Edit Profile</h3>
          <div className="profile-setting-pic mx-auto mt-2" style={{ width: '100px', height: '100px' }}>
            <img className="img-fluid rounded-circle border border-2 border-dark" src={user.profilePic} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </header>

      {/* form */}
      <section className="my-4 px-3">
        <div className="custom-container">
          <form className="theme-form profile-setting bg-white p-3 rounded-3 border" onSubmit={handleSave}>
            <div className="form-group text-start mb-3">
              <label htmlFor="inputname" className="form-label text-dark fw-semibold">Name</label>
              <div className="form-input position-relative">
                <input 
                  type="text" 
                  className="form-control ps-2 pe-5 py-2" 
                  id="inputname" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <IconSax name="user-1" className="icons position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
              </div>
            </div>

            <div className="form-group text-start mb-3">
              <label htmlFor="inputuseremail" className="form-label text-dark fw-semibold">Email id</label>
              <div className="form-input position-relative">
                <input 
                  type="email" 
                  className="form-control ps-2 pe-5 py-2" 
                  id="inputuseremail" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <IconSax name="mail" className="icons position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
              </div>
            </div>

            <div className="form-group text-start mb-4">
              <label htmlFor="inputusernumber" className="form-label text-dark fw-semibold">Phone Number</label>
              <div className="form-input position-relative">
                <input 
                  type="text" 
                  className="form-control ps-2 pe-5 py-2" 
                  id="inputusernumber" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <IconSax name="phone" className="icons position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
              </div>
            </div>

            <div className="footer-modal d-flex gap-3 mt-4">
              <button type="button" onClick={() => setView('profile')} className="btn btn-light border py-3 w-50 rounded-pill fw-semibold">
                Cancel
              </button>
              <button type="submit" className="btn btn-dark py-3 w-50 rounded-pill text-white fw-semibold" style={{ backgroundColor: '#122636' }}>
                Save
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
