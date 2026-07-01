import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';
import { BottomNavbar } from '../components/BottomNavbar';
import { ProductBox } from '../components/ProductBox';

export const Search: React.FC = () => {
  const { products, setView, searchHistory, addSearchQuery, clearSearchHistory } = useApp();
  const [searchVal, setSearchVal] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const categoriesSwiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let categoriesSwiper: any = null;
    if (categoriesSwiperRef.current && (window as any).Swiper) {
      categoriesSwiper = new (window as any).Swiper(categoriesSwiperRef.current, {
        slidesPerView: 4,
        spaceBetween: 10,
        loop: true,
        breakpoints: {
          0: { slidesPerView: 3 },
          375: { slidesPerView: 4 },
          767: { slidesPerView: 5 },
        },
      });
    }
    return () => {
      categoriesSwiper?.destroy?.();
    };
  }, []);

  useEffect(() => {
    if (!searchVal.trim()) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.description.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.category.toLowerCase().includes(searchVal.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchVal, products]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      addSearchQuery(searchVal);
      setView('shop', { query: searchVal });
    }
  };

  const handleHistoryClick = (q: string) => {
    setSearchVal(q);
    setView('shop', { query: q });
  };

  const handleCategoryClick = (category: string) => {
    setView('shop', { category });
  };

  const categories = [
    { name: 'Sofa', icon: '/assets/images/svg/sofa.svg' },
    { name: 'Chair', icon: '/assets/images/svg/categories.svg' },
    { name: 'Table', icon: '/assets/images/svg/categories.svg' },
    { name: 'Cabinets', icon: '/assets/images/svg/categories.svg' },
    { name: 'Cupboard', icon: '/assets/images/svg/categories.svg' },
    { name: 'Lamp', icon: '/assets/images/svg/categories.svg' }
  ];

  return (
    <div className="pb-5 bg-light min-vh-100 text-start">
      {/* header */}
      <header className="section-t-space bg-white py-3 px-3 shadow-sm position-sticky top-0 w-100" style={{ zIndex: 100 }}>
        <div className="custom-container">
          <div className="header-panel d-flex justify-content-between align-items-center">
            <button onClick={() => setView('landing')} className="btn p-0 border-0 background-none">
              <IconSax name="arrow-left" className="back-btn fs-4 text-dark" />
            </button>
            <h3 className="m-0 fs-5 fw-bold theme-color text-center flex-grow-1">Search</h3>
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

      {/* search input */}
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
                  autoFocus
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

      {/* Search history list */}
      {!searchVal.trim() && searchHistory.length > 0 && (
        <section className="px-3 my-3">
          <div className="custom-container bg-white p-3 rounded-3 border">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="fs-7 fw-semibold text-muted mb-0">Recent Searches</h5>
              <button
                onClick={clearSearchHistory}
                className="btn btn-sm text-primary p-0 border-0 fs-7"
              >
                Clear All
              </button>
            </div>
            <ul className="list-unstyled m-0 p-0 d-flex flex-wrap gap-2">
              {searchHistory.map((query, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleHistoryClick(query)}
                    className="btn btn-light btn-sm border rounded-pill px-3 fs-7"
                  >
                    {query}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* categories swiper */}
      <section className="my-3 px-3">
        <div className="custom-container">
          <div ref={categoriesSwiperRef} className="swiper categories">
            <div className="swiper-wrapper">
              {categories.map((cat, i) => (
                <div key={i} className="swiper-slide">
                  <a
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryClick(cat.name);
                    }}
                    className="categories-item text-decoration-none text-dark bg-white d-flex flex-column align-items-center p-3 rounded-3 border h-100"
                  >
                    <img className="categories-img mb-2" src={cat.icon} alt={cat.name} style={{ width: '24px', height: '24px' }} />
                    <h4 className="fs-7 m-0 fw-medium">{cat.name}</h4>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* shop list */}
      <section className="section-b-space px-3">
        <div className="custom-container">
          <h4 className="fs-6 fw-bold theme-color mb-3">
            {searchVal ? `Search Results (${filteredProducts.length})` : 'All Products'}
          </h4>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <img
                src="/assets/images/svg/categories.svg"
                alt="empty"
                style={{ width: '80px', opacity: 0.3 }}
                className="mb-3"
              />
              <h4 className="theme-color fw-semibold">No Results Found</h4>
              <p className="text-muted fs-7">We couldn't find anything matching your search.</p>
            </div>
          ) : (
            <div className="row g-3">
              {filteredProducts.map((product) => (
                <div key={product.id} className="col-6">
                  <ProductBox product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* bottom navbar */}
      <BottomNavbar />
    </div>
  );
};
