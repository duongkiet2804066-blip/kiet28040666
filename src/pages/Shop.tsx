import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';
import { BottomNavbar } from '../components/BottomNavbar';
import { ProductBox } from '../components/ProductBox';

export const Shop: React.FC = () => {
  const { products, setView, currentViewParams, addSearchQuery } = useApp();
  
  const categoryParam = currentViewParams?.category || '';
  const queryParam = currentViewParams?.query || '';

  const [searchVal, setSearchVal] = useState(queryParam);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      addSearchQuery(searchVal);
      setView('shop', { query: searchVal });
    }
  };

  const handleBack = () => {
    if (categoryParam) {
      setView('categories');
    } else {
      setView('landing');
    }
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    let matchCat = true;
    let matchQuery = true;

    if (categoryParam) {
      // E.g. Match Sofa or Chair
      matchCat = p.category.toLowerCase() === categoryParam.toLowerCase();
    }
    if (queryParam) {
      matchQuery =
        p.name.toLowerCase().includes(queryParam.toLowerCase()) ||
        p.description.toLowerCase().includes(queryParam.toLowerCase()) ||
        p.category.toLowerCase().includes(queryParam.toLowerCase());
    }

    return matchCat && matchQuery;
  });

  const pageTitle = categoryParam ? `${categoryParam}s` : queryParam ? `Results for "${queryParam}"` : 'Shop';

  return (
    <div className="pb-5 bg-light min-vh-100 text-start">
      {/* header start */}
      <header className="section-t-space bg-white py-3 px-3 shadow-sm position-sticky top-0 w-100" style={{ zIndex: 100 }}>
        <div className="custom-container">
          <div className="header-panel d-flex justify-content-between align-items-center">
            <button onClick={handleBack} className="btn p-0 border-0 background-none">
              <IconSax name="arrow-left" className="back-btn fs-4 text-dark" />
            </button>
            <h3 className="m-0 fs-5 fw-bold theme-color text-center flex-grow-1">{pageTitle}</h3>
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
      {/* header end */}

      {/* search section starts */}
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
      {/* search section end */}

      {/* shop section start */}
      <section className="section-b-space px-3">
        <div className="custom-container">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <img
                src="/assets/images/svg/categories.svg"
                alt="empty"
                style={{ width: '80px', opacity: 0.3 }}
                className="mb-3"
              />
              <h4 className="theme-color fw-semibold">No Products Found</h4>
              <p className="text-muted fs-7">Try refining your search terms or filters.</p>
            </div>
          ) : (
            <div className="row g-3">
              {filteredProducts.map((product, idx) => (
                <div key={product.id} className="col-6">
                  {/* Alternating product layouts for style varieties */}
                  <ProductBox product={product} layoutStyle={idx % 2 === 0 ? 'style1' : 'style2'} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* shop section end */}

      {/* bottom navbar start */}
      <BottomNavbar />
    </div>
  );
};
