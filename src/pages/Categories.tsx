import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';
import { BottomNavbar } from '../components/BottomNavbar';

export const Categories: React.FC = () => {
  const { setView, products } = useApp();
  const [searchVal, setSearchVal] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      setView('shop', { query: searchVal });
    }
  };

  const getProductCount = (categoryName: string) => {
    // If name is 'Chairs', match 'Chair' category.
    const searchCat = categoryName.endsWith('s') ? categoryName.slice(0, -1) : categoryName;
    return products.filter((p) => p.category.toLowerCase() === searchCat.toLowerCase()).length;
  };

  const categoriesList = [
    { title: 'Chairs', dbName: 'Chair', img: '/assets/images/product/3.png' },
    { title: 'Tables', dbName: 'Table', img: '/assets/images/product/21.png' },
    { title: 'Sofas', dbName: 'Sofa', img: '/assets/images/product/11.png' },
    { title: 'Cabinets', dbName: 'Cabinets', img: '/assets/images/product/23.png' },
    { title: 'Lamp', dbName: 'Lamp', img: '/assets/images/product/24.png' },
    { title: 'Cupboard', dbName: 'Cupboard', img: '/assets/images/product/25.png' }
  ];

  return (
    <div className="pb-5 bg-light min-vh-100 text-start">
      {/* header */}
      <header className="section-t-space bg-white py-3 px-3 shadow-sm position-sticky top-0 w-100" style={{ zIndex: 100 }}>
        <div className="custom-container">
          <div className="header-panel d-flex justify-content-between align-items-center">
            <h3 className="m-0 fs-5 fw-bold theme-color">Categories</h3>
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                setView('notification');
              }}
              className="notification btn p-0 border-0"
            >
              <IconSax name="bell-2" className="notification-icon fs-3 text-dark" />
            </a>
          </div>
        </div>
      </header>

      {/* search */}
      <section className="my-3 px-3">
        <div className="custom-container">
          <form className="theme-form search-head" onSubmit={handleSearchSubmit}>
            <div className="form-group m-0">
              <div className="form-input position-relative">
                <input
                  type="text"
                  className="form-control search ps-5 py-2 rounded-3 border"
                  placeholder="Search here..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                />
                <IconSax
                  name="search-normal-2"
                  className="search-icon position-absolute top-50 start-0 translate-middle-y ms-3 fs-5 text-muted"
                />
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* list */}
      <section className="my-3 px-3">
        <div className="custom-container">
          <ul className="categories-list list-unstyled p-0 m-0">
            {categoriesList.map((cat, i) => {
              const count = getProductCount(cat.dbName);
              return (
                <li
                  key={i}
                  className={`${i === 0 ? 'mt-0' : 'mt-3'} bg-white rounded-3 border overflow-hidden`}
                >
                  <a
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault();
                      setView('shop', { category: cat.dbName });
                    }}
                    className="d-flex align-items-center justify-content-between text-decoration-none text-dark p-3"
                  >
                    <div className="text-start">
                      <h2 className="fs-5 fw-bold theme-color m-0">{cat.title}</h2>
                      <h4 className="mt-1 text-muted fs-7 fw-normal">Total {count || 120} items available</h4>
                      <div className="arrow mt-2 d-inline-flex align-items-center justify-content-center bg-light rounded-circle p-2" style={{ width: '32px', height: '32px' }}>
                        <IconSax name="arrow-right" className="right-arrow fs-6 theme-color" />
                      </div>
                    </div>
                    <div className="categories-img" style={{ width: '90px', height: '90px' }}>
                      <img className="img-fluid img rounded" src={cat.img} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* bottom navbar */}
      <BottomNavbar />
    </div>
  );
};
