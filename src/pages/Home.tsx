import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';
import { Sidebar } from '../components/Sidebar';
import { BottomNavbar } from '../components/BottomNavbar';
import { ProductBox } from '../components/ProductBox';
import { HorizontalProductBox } from '../components/HorizontalProductBox';

export const Home: React.FC = () => {
  const { products, setView, user, addSearchQuery } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  
  const offerSwiperRef = useRef<HTMLDivElement>(null);
  const categoriesSwiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let offerSwiper: any = null;
    let categoriesSwiper: any = null;

    if ((window as any).Swiper) {
      if (offerSwiperRef.current) {
        offerSwiper = new (window as any).Swiper(offerSwiperRef.current, {
          slidesPerView: 1.5,
          spaceBetween: 20,
          loop: true,
          breakpoints: {
            0: { slidesPerView: 1 },
            375: { slidesPerView: 1.2 },
            425: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
          },
        });
      }
      if (categoriesSwiperRef.current) {
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
    }

    return () => {
      offerSwiper?.destroy?.();
      categoriesSwiper?.destroy?.();
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      addSearchQuery(searchVal);
      setView('shop', { query: searchVal });
    }
  };

  const handleCategoryClick = (category: string) => {
    setView('shop', { category });
  };

  // Get products filtered for display
  const newArrivals = useMemo(() => products.filter((p) => p.id <= 4), [products]);
  const trendingProducts = useMemo(() => products.filter((p) => p.id > 4 && p.id <= 7), [products]);
  const offerProducts = useMemo(() => products.filter((p) => p.id > 7 && p.id <= 11), [products]);
  const decorProducts = useMemo(() => products.filter((p) => p.id > 11 && p.id <= 15), [products]);

  const categories = [
    { name: 'Sofa', icon: '/assets/images/svg/sofa.svg' },
    { name: 'Chair', icon: '/assets/images/svg/categories.svg' }, // fallback icon
    { name: 'Table', icon: '/assets/images/svg/categories.svg' },
    { name: 'Cabinets', icon: '/assets/images/svg/categories.svg' },
    { name: 'Cupboard', icon: '/assets/images/svg/categories.svg' },
    { name: 'Lamp', icon: '/assets/images/svg/categories.svg' }
  ];

  return (
    <div className="pb-5 bg-light min-vh-100">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* header start */}
      <header className="section-t-space bg-white py-3 px-3 shadow-sm position-sticky top-0 w-100" style={{ zIndex: 100 }}>
        <div className="custom-container">
          <div className="header d-flex justify-content-between align-items-center">
            <div className="head-content d-flex align-items-center gap-3">
              <button
                className="sidebar-btn btn p-0 border-0 background-none"
                onClick={() => setIsSidebarOpen(true)}
              >
                <IconSax menu-icon="true" name="menu-hamburger" className="fs-3 text-dark" />
              </button>
              <div className="header-info d-flex align-items-center gap-2">
                <img
                  className="img-fluid profile-pic rounded-circle"
                  src={user.profilePic}
                  alt="profile"
                  style={{ width: '38px', height: '38px' }}
                />
                <div className="text-start">
                  <h4 className="light-text m-0 fs-7 text-muted">Hello</h4>
                  <h2 className="theme-color m-0 fs-5 fw-bold">{user.name}!</h2>
                </div>
              </div>
            </div>
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                setView('notification');
              }}
              className="notification btn p-0 border-0 position-relative"
            >
              <IconSax name="bell-2" className="notification-icon fs-3 text-dark" />
            </a>
          </div>
        </div>
      </header>
      {/* header end */}

      {/* search section starts */}
      <section className="my-3">
        <div className="custom-container px-3">
          <form className="theme-form search-head d-flex gap-2" onSubmit={handleSearchSubmit}>
            <div className="form-group flex-grow-1 m-0">
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
            <button
              type="button"
              onClick={() => setView('search')}
              className="btn filter-btn border py-2 px-3 rounded-3 d-flex align-items-center bg-white"
            >
              <IconSax name="media-sliders-3" className="filter-icon fs-5 theme-color" />
            </button>
          </form>
        </div>
      </section>
      {/* search section end */}

      {/* banner section start */}
      <section className="banner-wapper my-3 px-3">
        <div className="custom-container">
          <div className="banner-bg rounded-4 overflow-hidden position-relative" style={{ height: '140px' }}>
            <img className="img-fluid img-bg w-100 h-100" src="/assets/images/banner/banner-1.jpg" alt="banner-1" style={{ objectFit: 'cover' }} />
            <div className="banner-content position-absolute top-50 start-0 translate-middle-y ps-4 text-start">
              <h2 className="fw-bold text-white fs-4 m-0">Best Selling</h2>
              <h4 className="text-white-50 fw-normal fs-6 mt-1">Comforts & Modern Stylish Sofa</h4>
            </div>
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                setView('shop');
              }}
              className="more-btn position-absolute bottom-0 end-0 m-3 bg-white text-dark d-flex align-items-center gap-1 py-1 px-3 rounded-pill text-decoration-none shadow"
            >
              <h4 className="m-0 fs-7 fw-semibold">View More</h4>
              <IconSax name="arrow-right" className="right-arrow fs-7" />
            </a>
          </div>
        </div>
      </section>
      {/* banner section start */}

      {/* categories section start */}
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
      {/* categories section end */}

      {/* New Arrivals section start */}
      <section className="my-4 px-3 text-start">
        <div className="custom-container">
          <div className="title d-flex justify-content-between align-items-center mb-3">
            <h2 className="fs-5 fw-bold m-0 theme-color">New Arrivals</h2>
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                setView('shop');
              }}
              className="text-decoration-none fs-7 fw-medium"
            >
              View All
            </a>
          </div>

          <div className="row g-3">
            {newArrivals.map((product) => (
              <div key={product.id} className="col-6">
                <ProductBox product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* New Arrivals section end */}

      {/* Trending Furniture section start */}
      <section className="my-4 px-3 text-start">
        <div className="custom-container">
          <div className="title d-flex justify-content-between align-items-center mb-3">
            <h2 className="fs-5 fw-bold m-0 theme-color">Trending Furniture</h2>
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                setView('shop');
              }}
              className="text-decoration-none fs-7 fw-medium"
            >
              View All
            </a>
          </div>

          <div className="row g-3">
            {trendingProducts.map((product) => (
              <div key={product.id} className="col-12">
                <HorizontalProductBox product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Trending Furniture section end */}

      {/* banner section 2 start */}
      <section className="banner-wapper my-4 px-3">
        <div className="custom-container">
          <div className="banner-bg rounded-4 overflow-hidden position-relative" style={{ height: '140px' }}>
            <img className="img-fluid img-bg w-100 h-100" src="/assets/images/banner/banner-2.jpg" alt="banner-2" style={{ objectFit: 'cover' }} />
            <div className="banner-content position-absolute top-50 start-0 translate-middle-y ps-4 text-start">
              <h2 className="fw-bold text-white fs-4 m-0">Best Selling</h2>
              <h4 className="text-white-50 fw-normal fs-6 mt-1">Comforts & Modern Stylish Sofa</h4>
            </div>
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                setView('shop');
              }}
              className="more-btn position-absolute bottom-0 end-0 m-3 bg-white text-dark d-flex align-items-center gap-1 py-1 px-3 rounded-pill text-decoration-none shadow"
            >
              <h4 className="m-0 fs-7 fw-semibold">View More</h4>
              <IconSax name="arrow-right" className="right-arrow fs-7" />
            </a>
          </div>
        </div>
      </section>
      {/* banner section end */}

      {/* offer section start */}
      <section className="my-4 px-3 text-start">
        <div className="custom-container">
          <div className="title d-flex justify-content-between align-items-center mb-3">
            <h2 className="fs-5 fw-bold m-0 theme-color">Offer Zone</h2>
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                setView('shop');
              }}
              className="text-decoration-none fs-7 fw-medium"
            >
              View All
            </a>
          </div>

          <div ref={offerSwiperRef} className="swiper offer pb-3">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <HorizontalProductBox product={offerProducts[0] || products[5]} />
                <div className="mt-2"></div>
                <HorizontalProductBox product={offerProducts[1] || products[6]} />
              </div>
              <div className="swiper-slide">
                <HorizontalProductBox product={offerProducts[2] || products[7]} />
                <div className="mt-2"></div>
                <HorizontalProductBox product={offerProducts[3] || products[8]} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* offer section end */}

      {/* other furniture section start */}
      <section className="my-4 px-3 text-start">
        <div className="custom-container">
          <div className="title d-flex justify-content-between align-items-center mb-3">
            <h2 className="fs-5 fw-bold m-0 theme-color">Furniture And Decor</h2>
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                setView('shop');
              }}
              className="text-decoration-none fs-7 fw-medium"
            >
              View All
            </a>
          </div>

          <div className="row g-3">
            {decorProducts.map((product) => (
              <div key={product.id} className="col-6">
                <ProductBox product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* other furniture section end */}

      {/* bottom navbar start */}
      <BottomNavbar />
    </div>
  );
};
