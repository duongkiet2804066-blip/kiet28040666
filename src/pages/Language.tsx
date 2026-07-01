import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const Language: React.FC = () => {
  const { setView } = useApp();
  const [selectedLang, setSelectedLang] = useState('English');

  const languages = ['English', 'Spanish', 'French', 'Portuguese', 'Russian', 'Chinese', 'Vietnamese'];

  const handleLanguageSelect = (lang: string) => {
    setSelectedLang(lang);
    alert(`Language changed to ${lang}`);
    setView('profile');
  };

  return (
    <div className="pb-5 bg-light min-vh-100 text-start">
      {/* header */}
      <header className="section-t-space bg-white py-3 px-3 shadow-sm position-sticky top-0 w-100" style={{ zIndex: 100 }}>
        <div className="custom-container">
          <div className="header-panel d-flex align-items-center">
            <button onClick={() => setView('profile')} className="btn p-0 border-0 bg-transparent me-3">
              <IconSax name="arrow-left" className="back-btn fs-4 text-dark" />
            </button>
            <h3 className="m-0 fs-5 fw-bold theme-color">Languages</h3>
          </div>
        </div>
      </header>

      {/* language list */}
      <section className="my-3 px-3">
        <div className="custom-container">
          <ul className="language-list list-unstyled bg-white rounded-3 border p-0 m-0 text-start">
            {languages.map((lang, idx) => (
              <li 
                key={idx} 
                onClick={() => handleLanguageSelect(lang)}
                className={`p-3 d-flex justify-content-between align-items-center cursor-pointer ${idx < languages.length - 1 ? 'border-bottom' : ''}`}
                style={{ cursor: 'pointer' }}
              >
                <label className="form-check-label fw-semibold theme-color fs-6 m-0" style={{ cursor: 'pointer' }}>{lang}</label>
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="languageSelect"
                  checked={selectedLang === lang}
                  onChange={() => handleLanguageSelect(lang)}
                  style={{ cursor: 'pointer' }}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
