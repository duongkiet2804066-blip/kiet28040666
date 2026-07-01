import React, { useState } from 'react';
import { useApp, type Address } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const NewAddress: React.FC = () => {
  const { addAddress, updateAddress, setView, currentViewParams } = useApp();
  const addressToEdit: Address | null = currentViewParams?.address || null;

  const [name, setName] = useState(addressToEdit?.name || '');
  const [phone, setPhone] = useState(addressToEdit?.phone || '');
  const [houseNo, setHouseNo] = useState(addressToEdit?.houseNo || '');
  const [locality, setLocality] = useState(addressToEdit?.locality || '');
  const [city, setCity] = useState(addressToEdit?.city || '');
  const state = addressToEdit?.state || 'California';
  const [pincode, setPincode] = useState(addressToEdit?.pincode || '');
  const [type, setType] = useState<'Home' | 'Office' | 'Other'>(addressToEdit?.type || 'Home');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !houseNo.trim() || !locality.trim() || !city.trim() || !pincode.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    const addrData = {
      name,
      phone,
      houseNo,
      locality,
      city,
      state,
      pincode,
      type,
      isDefault: addressToEdit ? addressToEdit.isDefault : false
    };

    if (addressToEdit) {
      updateAddress(addressToEdit.id, addrData);
      alert('Address updated successfully!');
    } else {
      addAddress(addrData);
      alert('Address added successfully!');
    }

    // Go back to shipping-address or manage-address
    if (currentViewParams?.backView) {
      setView(currentViewParams.backView);
    } else {
      setView('shipping-address');
    }
  };

  const handleCancel = () => {
    if (currentViewParams?.backView) {
      setView(currentViewParams.backView);
    } else {
      setView('shipping-address');
    }
  };

  return (
    <div className="pb-5 bg-light min-vh-100 text-start">
      {/* header */}
      <header className="section-t-space bg-white py-3 px-3 shadow-sm position-sticky top-0 w-100" style={{ zIndex: 100 }}>
        <div className="custom-container">
          <div className="header-panel d-flex align-items-center">
            <button onClick={handleCancel} className="btn p-0 border-0 bg-transparent me-3">
              <IconSax name="arrow-left" className="back-btn fs-4 text-dark" />
            </button>
            <h3 className="m-0 fs-5 fw-bold theme-color">{addressToEdit ? 'Edit Address' : 'Add New Address'}</h3>
          </div>
        </div>
      </header>

      {/* form */}
      <section className="section-b-space my-3 px-3">
        <div className="custom-container bg-white p-3 rounded-3 border">
          <form className="address-form" onSubmit={handleSave}>
            <div className="form-group mb-3 text-start">
              <label className="form-label text-muted fs-7">Name</label>
              <div className="form-input">
                <input
                  type="text"
                  className="form-control fs-7"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="form-group mb-3 text-start">
              <label className="form-label text-muted fs-7">Phone Number</label>
              <div className="form-input">
                <input
                  type="tel"
                  className="form-control fs-7"
                  placeholder="Enter your number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group mb-3 text-start">
              <label className="form-label text-muted fs-7">Street Address (House No/Flat)</label>
              <div className="form-input">
                <input
                  type="text"
                  className="form-control fs-7"
                  placeholder="Flat/House No/Floor"
                  value={houseNo}
                  onChange={(e) => setHouseNo(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group mb-3 text-start">
              <label className="form-label text-muted fs-7">Landmark / Locality</label>
              <div className="form-input">
                <input
                  type="text"
                  className="form-control fs-7"
                  placeholder="Enter your landmark or area"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="form-group mb-3 text-start">
                  <label className="form-label text-muted fs-7">City</label>
                  <div className="form-input">
                    <input
                      type="text"
                      className="form-control fs-7"
                      placeholder="Enter city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group mb-3 text-start">
                  <label className="form-label text-muted fs-7">Pin Code</label>
                  <div className="form-input">
                    <input
                      type="text"
                      className="form-control fs-7"
                      placeholder="Enter pin"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group mb-4 text-start">
              <label className="form-label text-muted fs-7 mb-2">Address Type</label>
              <ul className="address-type d-flex justify-content-between p-0 m-0 list-unstyled border rounded p-2">
                <li className="flex-grow-1 text-center">
                  <div className="form-check d-inline-flex align-items-center gap-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="addrType"
                      id="homeRadio"
                      checked={type === 'Home'}
                      onChange={() => setType('Home')}
                    />
                    <label className="form-check-label fs-7 fw-medium" htmlFor="homeRadio">Home</label>
                  </div>
                </li>
                <li className="flex-grow-1 text-center border-start border-end">
                  <div className="form-check d-inline-flex align-items-center gap-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="addrType"
                      id="officeRadio"
                      checked={type === 'Office'}
                      onChange={() => setType('Office')}
                    />
                    <label className="form-check-label fs-7 fw-medium" htmlFor="officeRadio">Office</label>
                  </div>
                </li>
                <li className="flex-grow-1 text-center">
                  <div className="form-check d-inline-flex align-items-center gap-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="addrType"
                      id="otherRadio"
                      checked={type === 'Other'}
                      onChange={() => setType('Other')}
                    />
                    <label className="form-check-label fs-7 fw-medium" htmlFor="otherRadio">Other</label>
                  </div>
                </li>
              </ul>
            </div>

            <div className="footer-modal d-flex gap-3 mt-4">
              <button type="button" onClick={handleCancel} className="btn btn-light border py-3 w-50 rounded-pill fw-semibold fs-7 text-uppercase">Cancel</button>
              <button type="submit" className="btn btn-dark py-3 w-50 rounded-pill text-white fw-semibold text-uppercase" style={{ backgroundColor: '#122636' }}>
                {addressToEdit ? 'Save' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
