import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const Onboarding: React.FC = () => {
  const { setView } = useApp();
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let swiperInstance: any = null;
    if (swiperRef.current && (window as any).Swiper) {
      swiperInstance = new (window as any).Swiper(swiperRef.current, {
        slidesPerView: 1,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    }

    return () => {
      if (swiperInstance) {
        swiperInstance.destroy?.();
      }
    };
  }, []);

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setView('login');
  };

  return (
    <div className="auth-body dark min-vh-100 position-relative d-flex flex-column justify-content-center">
      <section className="section-b-space flex-grow-1 d-flex align-items-center">
        <div ref={swiperRef} className="swiper intro slider-1 w-100">
          <div className="swiper-wrapper">
            {/* Slide 1 */}
            <div className="swiper-slide">
              <div className="theme-logo pb-3 text-center">
                <img className="img-fluid logo-img" src="/assets/images/logo/logo.png" alt="logo" />
              </div>
              <div className="onboarding-design text-center position-relative">
                <img className="img-fluid design-img" src="/assets/images/onboarding/design1.png" alt="bg-design" />
                <img className="img-fluid slider-img1 position-absolute top-50 start-50 translate-middle" src="/assets/images/onboarding/1.png" alt="slider-1" style={{ zIndex: 2 }} />
                <img className="img-fluid vector1" src="/assets/images/onboarding/vector1.png" alt="v1" />
                <img className="img-fluid vector2" src="/assets/images/onboarding/vector2.png" alt="v2" />
                <img className="img-fluid vector3" src="/assets/images/onboarding/vector3.png" alt="v3" />
              </div>
              <div className="product-details text-center mt-4 px-3">
                <h1 className="text-white fs-3">Office Furniture</h1>
                <span className="d-inline-block bg-primary my-2" style={{ width: '40px', height: '2px' }}></span>
                <p className="text-muted">The best payment method connects your money to friends, family, brands, and experiences.</p>
                <div className="redirate-btn mt-4">
                  <a href="#!" onClick={handleNext} className="next-arrow d-inline-flex align-items-center justify-content-center bg-white rounded-circle p-3 text-dark text-decoration-none">
                    <IconSax name="arrow-right" className="right-arrow fs-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="swiper-slide">
              <div className="theme-logo pb-3 text-center">
                <img className="img-fluid logo-img" src="/assets/images/logo/logo.png" alt="logo" />
              </div>
              <div className="onboarding-design text-center position-relative">
                <img className="img-fluid design-img" src="/assets/images/onboarding/design1.png" alt="bg-design" />
                <img className="img-fluid slider-img2 position-absolute top-50 start-50 translate-middle" src="/assets/images/onboarding/2.png" alt="slider-2" style={{ zIndex: 2 }} />
                <img className="img-fluid vector1" src="/assets/images/onboarding/vector1.png" alt="v1" />
                <img className="img-fluid vector2" src="/assets/images/onboarding/vector2.png" alt="v2" />
                <img className="img-fluid vector3" src="/assets/images/onboarding/vector3.png" alt="v3" />
              </div>
              <div className="product-details text-center mt-4 px-3">
                <h1 className="text-white fs-3">Relaxing Furniture</h1>
                <span className="d-inline-block bg-primary my-2" style={{ width: '40px', height: '2px' }}></span>
                <p className="text-muted">The best payment method connects your money to friends, family, brands, and experiences.</p>
                <div className="redirate-btn mt-4">
                  <a href="#!" onClick={handleNext} className="next-arrow d-inline-flex align-items-center justify-content-center bg-white rounded-circle p-3 text-dark text-decoration-none">
                    <IconSax name="arrow-right" className="right-arrow fs-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="swiper-slide">
              <div className="theme-logo pb-3 text-center">
                <img className="img-fluid logo-img" src="/assets/images/logo/logo.png" alt="logo" />
              </div>
              <div className="onboarding-design text-center position-relative">
                <img className="img-fluid design-img" src="/assets/images/onboarding/design1.png" alt="bg-design" />
                <img className="img-fluid slider-img3 position-absolute top-50 start-50 translate-middle" src="/assets/images/onboarding/3.png" alt="slider-3" style={{ zIndex: 2 }} />
                <img className="img-fluid vector1" src="/assets/images/onboarding/vector1.png" alt="v1" />
                <img className="img-fluid vector2" src="/assets/images/onboarding/vector2.png" alt="v2" />
                <img className="img-fluid vector3" src="/assets/images/onboarding/vector3.png" alt="v3" />
              </div>
              <div className="product-details text-center mt-4 px-3">
                <h1 className="text-white fs-3">Home Decor</h1>
                <span className="d-inline-block bg-primary my-2" style={{ width: '40px', height: '2px' }}></span>
                <p className="text-muted">The best payment method connects your money to friends, family, brands, and experiences.</p>
                <div className="redirate-btn mt-4">
                  <a href="#!" onClick={handleNext} className="next-arrow d-inline-flex align-items-center justify-content-center bg-white rounded-circle p-3 text-dark text-decoration-none">
                    <IconSax name="arrow-right" className="right-arrow fs-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-pagination mt-3"></div>
        </div>
      </section>

      {/* install app popup */}
      <div className="offcanvas offcanvas-bottom addtohome-popup theme-offcanvas" tabIndex={-1} id="offcanvas" style={{ visibility: 'hidden' }}>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        <div className="offcanvas-body small">
          <div className="app-info">
            <img src="/assets/images/logo/48.png" className="img-fluid" alt="app-logo" />
            <div className="content">
              <h4>fuzzy app</h4>
              <a href="#!">www.fuzzy-app.com</a>
            </div>
          </div>
          <a href="#!" className="btn theme-btn install-app btn-inline home-screen-btn m-0" id="installapp">Add to Home Screen</a>
        </div>
      </div>
    </div>
  );
};
