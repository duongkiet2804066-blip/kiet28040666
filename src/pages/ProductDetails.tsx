import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';

export const ProductDetails: React.FC = () => {
  const { currentViewParams, setView, addToCart, wishlist, toggleWishlist } = useApp();
  const product = currentViewParams?.product || null;
  const layout = currentViewParams?.layout || 'style1'; // 'style1' or 'style2'

  if (!product) {
    return (
      <div className="text-center py-5">
        <h4>No Product Selected</h4>
        <button onClick={() => setView('landing')} className="btn btn-primary mt-3">Go Home</button>
      </div>
    );
  }

  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [activeTab, setActiveTab] = useState<'dimensions' | 'delivery' | 'details' | 'reviews'>('dimensions');

  // Swiper configuration
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let swiperInstance: any = null;
    if (swiperRef.current && (window as any).Swiper) {
      if (layout === 'style1') {
        swiperInstance = new (window as any).Swiper(swiperRef.current, {
          slidesPerView: 1.6,
          spaceBetween: 10,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
          },
        });
      } else {
        swiperInstance = new (window as any).Swiper(swiperRef.current, {
          slidesPerView: 1.2,
          spaceBetween: 15,
          centeredSlides: true,
          loop: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
      }
    }

    return () => {
      swiperInstance?.destroy?.();
    };
  }, [layout]);

  const handleQtyChange = (val: number) => {
    if (val >= 1 && val <= 10) {
      setQty(val);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, qty, selectedColor, selectedSize);
    alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, qty, selectedColor, selectedSize);
    setView('cart');
  };

  const handleCheckPincode = () => {
    if (pincode.trim()) {
      setPincodeChecked(true);
    }
  };

  const isLiked = wishlist.includes(product.id);

  return (
    <div className={`pb-5 text-start bg-light min-vh-100 ${layout === 'style2' ? 'details-page2' : ''}`}>
      {/* Top Header Background Image for Style 1 */}
      {layout === 'style1' && (
        <div className="top-image position-absolute w-100 top-0 left-0" style={{ zIndex: 0 }}>
          <img className="product-header img-fluid w-100" src="/assets/images/background/header-bg.png" alt="header-bg" />
        </div>
      )}

      {/* Header bar */}
      <header className={`product-page-header ${layout === 'style2' ? 'product2-header' : ''} bg-transparent position-relative w-100`} style={{ zIndex: 10 }}>
        <div className="header-panel d-flex align-items-center justify-content-between px-3 py-3">
          <button onClick={() => setView('shop')} className="product-back btn p-0 border-0 background-none">
            <IconSax name="arrow-left" className="back-btn fs-4 text-dark" />
          </button>
          <h3 className="title m-0 fs-5 fw-bold text-center flex-grow-1">{product.category}s</h3>
          <div className="d-flex gap-3 align-items-center">
            <button onClick={() => setView('search')} className="search btn p-0 border-0 background-none">
              <IconSax name="search-normal-2" className="icons fs-4 text-dark" />
            </button>
            <div
              onClick={() => toggleWishlist(product.id)}
              className={`like-btn border-0 p-0 m-0 ${isLiked ? 'active' : 'inactive'}`}
              style={{ cursor: 'pointer' }}
            >
              <img className="outline-icon" src="/assets/images/svg/like.svg" alt="like" />
              <img className="fill-icon" src="/assets/images/svg/like-fill.svg" alt="like" />
            </div>
          </div>
        </div>
      </header>

      {/* Product Image Slider */}
      <section className={`${layout === 'style2' ? 'product2-image-section' : ''} position-relative py-3`} style={{ zIndex: 2 }}>
        <div className="custom-container px-3">
          <div className="product-image-slider position-relative">
            {layout === 'style2' && (
              <img className="img-fluid product2-bg w-100" src="/assets/images/background/product-img-bg.png" alt="product-bg" />
            )}
            
            <div ref={swiperRef} className={`swiper ${layout === 'style2' ? 'product-2' : 'product-1'} ms-2`}>
              <div className="swiper-wrapper">
                {product.images.map((imgUrl: string, idx: number) => (
                  <div key={idx} className="swiper-slide text-center">
                    <img className="img-fluid product-img" src={imgUrl} alt={product.name} style={{ maxHeight: '240px', objectFit: 'contain' }} />
                  </div>
                ))}
              </div>
              
              {layout === 'style1' ? (
                <div className="product-info d-flex justify-content-between mt-3 px-3">
                  <div className="swiper-pagination"></div>
                  <ul className="color-variation d-flex gap-2 list-unstyled m-0 p-0">
                    {product.colors.map((color: string, idx: number) => (
                      <li
                        key={idx}
                        onClick={() => setSelectedColor(color)}
                        className={`product-color rounded-circle border ${selectedColor === color ? 'active border-primary' : ''}`}
                        style={{ backgroundColor: color, width: '16px', height: '16px', cursor: 'pointer', outlineOffset: '2px', outline: selectedColor === color ? `1px solid ${color}` : '' }}
                      />
                    ))}
                  </ul>
                </div>
              ) : (
                <>
                  <div className="swiper-button-next">
                    <IconSax name="arrow-right" className="arrow text-white fs-5" />
                  </div>
                  <div className="swiper-button-prev">
                    <IconSax name="arrow-left" className="arrow text-white fs-5" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="position-relative pt-3" style={{ zIndex: 2 }}>
        {layout === 'style2' && (
          <>
            <img src="/assets/images/effect.png" className="img-fluid product-details-effect position-absolute top-0 start-0" alt="effect" style={{ zIndex: -1 }} />
            <img className="img-fluid product-details-effect-dark position-absolute top-0 start-0" src="/assets/images/effect-dark.png" alt="effect-dark" style={{ zIndex: -1 }} />
            <ul className="color-option d-flex gap-2 list-unstyled p-0 m-3 justify-content-center">
              {product.colors.map((color: string, idx: number) => (
                <li
                  key={idx}
                  onClick={() => setSelectedColor(color)}
                  className={`product-color rounded-circle border ${selectedColor === color ? 'active' : ''}`}
                  style={{ backgroundColor: color, width: '20px', height: '20px', cursor: 'pointer', outlineOffset: '2px', outline: selectedColor === color ? `1px solid ${color}` : '' }}
                />
              ))}
            </ul>
          </>
        )}

        <div className="custom-container px-3">
          <div className="product-details bg-white p-3 rounded-4 border">
            <div className="product-name d-flex justify-content-between align-items-center mb-2">
              <h2 className="theme-color fs-4 fw-bold m-0 text-start">{product.name}</h2>
              {product.originalPrice && (
                <span className="badge bg-danger fs-8">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            {layout === 'style1' && (
              <div className="ratings d-flex align-items-center gap-2 mb-3">
                <h4 className="theme-color fw-semibold m-0">{product.rating}</h4>
                <ul className="rating-stars d-flex list-unstyled m-0 p-0 gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <li key={i}>
                      <img
                        className="img-fluid stars"
                        src={i < Math.floor(product.rating) ? '/assets/images/svg/Star.svg' : '/assets/images/svg/star1.svg'}
                        alt="star"
                        style={{ width: '12px' }}
                      />
                    </li>
                  ))}
                </ul>
                <h4 className="reviews text-muted m-0 fs-7">{product.reviewsCount} Reviews</h4>
              </div>
            )}

            <div className="product-price d-flex justify-content-between align-items-center mb-3">
              <h3 className="fw-bold theme-color m-0 fs-4">
                ${product.price}
                {product.originalPrice && <del className="fs-7 text-muted ms-2 fw-normal">${product.originalPrice}</del>}
              </h3>
              <div className="plus-minus d-flex align-items-center border rounded-pill px-3 py-1">
                <button onClick={() => handleQtyChange(qty - 1)} className="btn p-0 border-0 bg-transparent">
                  <IconSax name="minus" className="sub fs-6 text-muted" />
                </button>
                <input
                  type="number"
                  value={qty}
                  readOnly
                  className="text-center border-0 fw-bold mx-2"
                  style={{ width: '20px' }}
                />
                <button onClick={() => handleQtyChange(qty + 1)} className="btn p-0 border-0 bg-transparent">
                  <IconSax name="add" className="add fs-6 text-muted" />
                </button>
              </div>
            </div>

            <p className="text-muted fs-7 mb-3 text-start">{product.description}</p>

            {/* Size Options */}
            <div className="size-option mb-3 text-start">
              <h5 className="fs-7 fw-semibold text-muted mb-2">Size</h5>
              <div className="d-flex gap-2">
                {product.sizes.map((sz: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSize(sz)}
                    className={`btn btn-sm border rounded-pill px-3 py-1 fw-semibold fs-7 ${selectedSize === sz ? 'btn-primary text-white border-primary' : 'btn-light'}`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Style 2 Dimensions Display */}
            {layout === 'style2' && (
              <div className="d-flex justify-content-between gap-3 mb-4 mt-2">
                <div className="dimensions-box border rounded p-2 text-center flex-grow-1 bg-light">
                  <IconSax name="ruler" className="dimensions-icons fs-5 text-muted mb-1" />
                  <h6 className="m-0 fs-8 fw-semibold">{product.dimensions.height}</h6>
                </div>
                <div className="dimensions-box border rounded p-2 text-center flex-grow-1 bg-light">
                  <IconSax name="ruler" className="dimensions-icons fs-5 text-muted mb-1" />
                  <h6 className="m-0 fs-8 fw-semibold">{product.dimensions.width}</h6>
                </div>
                <div className="dimensions-box border rounded p-2 text-center flex-grow-1 bg-light">
                  <IconSax name="measure" className="dimensions-icons fs-5 text-muted mb-1" />
                  <h6 className="m-0 fs-8 fw-semibold">{product.dimensions.length}</h6>
                </div>
                <div className="dimensions-box border rounded p-2 text-center flex-grow-1 bg-light">
                  <IconSax name="weights" className="dimensions-icons fs-5 text-muted mb-1" />
                  <h6 className="m-0 fs-8 fw-semibold">{product.dimensions.weight}</h6>
                </div>
              </div>
            )}

            {/* Tabs / Accordion for Details */}
            <div className="accordion details-accordion mt-4 border-top pt-3">
              <div className="d-flex border-bottom mb-3 justify-content-between">
                <button
                  onClick={() => setActiveTab('dimensions')}
                  className={`btn pb-2 px-1 border-0 rounded-0 fs-7 fw-semibold ${activeTab === 'dimensions' ? 'border-bottom border-primary text-primary' : 'text-muted'}`}
                >
                  Dimensions
                </button>
                <button
                  onClick={() => setActiveTab('delivery')}
                  className={`btn pb-2 px-1 border-0 rounded-0 fs-7 fw-semibold ${activeTab === 'delivery' ? 'border-bottom border-primary text-primary' : 'text-muted'}`}
                >
                  Delivery
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`btn pb-2 px-1 border-0 rounded-0 fs-7 fw-semibold ${activeTab === 'details' ? 'border-bottom border-primary text-primary' : 'text-muted'}`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`btn pb-2 px-1 border-0 rounded-0 fs-7 fw-semibold ${activeTab === 'reviews' ? 'border-bottom border-primary text-primary' : 'text-muted'}`}
                >
                  Reviews
                </button>
              </div>

              {activeTab === 'dimensions' && (
                <div className="tab-pane-content text-start">
                  <table className="table table-bordered text-center m-0">
                    <thead>
                      <tr>
                        <th scope="col" className="fs-8 py-2">Height</th>
                        <th scope="col" className="fs-8 py-2">Width</th>
                        <th scope="col" className="fs-8 py-2">Length</th>
                        <th scope="col" className="fs-8 py-2">Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="fs-8 py-2">{product.dimensions.height}</td>
                        <td className="fs-8 py-2">{product.dimensions.width}</td>
                        <td className="fs-8 py-2">{product.dimensions.length}</td>
                        <td className="fs-8 py-2">{product.dimensions.weight}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'delivery' && (
                <div className="tab-pane-content text-start">
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control fs-7"
                      placeholder="Enter Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                    <button onClick={handleCheckPincode} className="btn theme-btn text-white px-3" type="button" style={{ backgroundColor: '#122636' }}>Check</button>
                  </div>
                  {pincodeChecked && (
                    <p className="text-success fs-8 fw-semibold mb-2">Estimated delivery: 2-3 business days. COD available.</p>
                  )}
                  <ul className="address-type d-flex justify-content-between p-0 m-0 list-unstyled border-top pt-2">
                    <li className="text-center">
                      <IconSax name="truck-fast" className="icon fs-5 text-muted mb-1" />
                      <h6 className="m-0 fs-8">Free Delivery</h6>
                    </li>
                    <li className="text-center">
                      <IconSax name="dollar-circle" className="icon fs-5 text-muted mb-1" />
                      <h6 className="m-0 fs-8">COD Available</h6>
                    </li>
                    <li className="text-center">
                      <IconSax name="box-rotate" className="icon fs-5 text-muted mb-1" />
                      <h6 className="m-0 fs-8">21 Days Return</h6>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="tab-pane-content text-start text-muted fs-7">
                  <p className="m-0">This high-end piece of furniture is made from FSC-certified sustainable wood and utilizes scratch-resistant, water-repellent fabrics. Fully assembled and quality checked before dispatch.</p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="tab-pane-content text-start">
                  <div className="reviews-display">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="theme-color fs-7 fw-bold m-0">{product.reviewsCount} Reviews</h4>
                      <h4 className="theme-color fs-7 fw-semibold m-0 text-primary">Avg: {product.rating} / 5</h4>
                    </div>

                    <div className="reviews-box border-bottom pb-2 mb-2">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <img className="img-fluid profile-pic rounded-circle" src="/assets/images/icons/profile2.png" alt="profile2" style={{ width: '28px', height: '28px' }} />
                        <div className="d-flex justify-content-between w-100">
                          <div>
                            <h4 className="theme-color fs-7 fw-semibold m-0">Rina Jones</h4>
                            <h4 className="light-text fs-8 text-muted mt-1 m-0">Just Now</h4>
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            <img className="img-fluid stars" src="/assets/images/svg/Star.svg" alt="star" style={{ width: '10px' }} />
                            <h4 className="theme-color m-0 fs-7 fw-normal">5.0</h4>
                          </div>
                        </div>
                      </div>
                      <p className="fs-7 text-muted m-0">I adore this item. Just fantastic!! They create the actual product seen in the picture!</p>
                    </div>

                    <div className="reviews-box pb-1">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <img className="img-fluid profile-pic rounded-circle" src="/assets/images/icons/profile3.png" alt="profile3" style={{ width: '28px', height: '28px' }} />
                        <div className="d-flex justify-content-between w-100">
                          <div>
                            <h4 className="theme-color fs-7 fw-semibold m-0">Smith Williams</h4>
                            <h4 className="light-text fs-8 text-muted mt-1 m-0">1 min ago</h4>
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            <img className="img-fluid stars" src="/assets/images/svg/Star.svg" alt="star" style={{ width: '10px' }} />
                            <h4 className="theme-color m-0 fs-7 fw-normal">4.5</h4>
                          </div>
                        </div>
                      </div>
                      <p className="fs-7 text-muted m-0">Very sturdy and highly customizable. It looks beautiful in our living room.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Actions */}
      <div className="fixed-bottom bg-white border-top p-3 d-flex gap-3 justify-content-between align-items-center" style={{ zIndex: 100 }}>
        <button onClick={handleAddToCart} className="btn btn-outline-dark flex-grow-1 py-3 fw-bold rounded-pill text-uppercase fs-7">
          Add to Cart
        </button>
        <button onClick={handleBuyNow} className="btn btn-dark flex-grow-1 py-3 fw-bold rounded-pill text-uppercase fs-7" style={{ backgroundColor: '#122636' }}>
          Buy Now
        </button>
      </div>
    </div>
  );
};
