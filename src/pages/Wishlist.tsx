import React from 'react';
import { useApp } from '../context/AppContext';
import { IconSax } from '../components/IconSax';
import { BottomNavbar } from '../components/BottomNavbar';

export const Wishlist: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, products, setView } = useApp();

  // Get liked products
  const likedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleRemove = (productId: number) => {
    toggleWishlist(productId);
  };

  const handleAddToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart(product, 1, product.colors[0], product.sizes[0]);
      alert(`${product.name} added to cart!`);
    }
  };

  if (likedProducts.length === 0) {
    return (
      <div className="pb-5 bg-light min-vh-100 text-start">
        {/* header */}
        <header className="section-t-space bg-white py-3 px-3 shadow-sm w-100">
          <div className="custom-container">
            <div className="header-panel d-flex align-items-center">
              <button onClick={() => setView('landing')} className="btn p-0 border-0 bg-transparent me-3">
                <IconSax name="arrow-left" className="back-btn fs-4 text-dark" />
              </button>
              <h3 className="m-0 fs-5 fw-bold theme-color">Wishlist</h3>
            </div>
          </div>
        </header>

        {/* empty view */}
        <div className="custom-container px-3 mt-5">
          <div className="empty-tab text-center bg-white p-4 rounded-4 border">
            <img className="img-fluid empty-img mb-3" src="/assets/images/gif/wishlist.gif" alt="empty-wishlist" style={{ maxWidth: '200px' }} />
            <h2 className="fs-5 fw-bold theme-color">Your Wishlist is Empty!!</h2>
            <h5 className="text-muted mt-2 fs-7 fw-normal mb-4">If you haven't made any wishes yet, do so now for a better life.</h5>
            <button onClick={() => setView('landing')} className="btn theme-btn text-white w-100 py-3 rounded-pill" style={{ backgroundColor: '#122636' }}>
              Add Now
            </button>
          </div>
        </div>

        {/* bottom navbar */}
        <BottomNavbar />
      </div>
    );
  }

  return (
    <div className="pb-5 bg-light min-vh-100 text-start">
      {/* header */}
      <header className="section-t-space bg-white py-3 px-3 shadow-sm position-sticky top-0 w-100" style={{ zIndex: 100 }}>
        <div className="custom-container">
          <div className="header-panel d-flex align-items-center">
            <button onClick={() => setView('landing')} className="btn p-0 border-0 bg-transparent me-3">
              <IconSax name="arrow-left" className="back-btn fs-4 text-dark" />
            </button>
            <h3 className="m-0 fs-5 fw-bold theme-color">Wishlist</h3>
          </div>
        </div>
      </header>

      {/* list */}
      <section className="my-3 px-3">
        <div className="custom-container">
          <div className="row g-3">
            {likedProducts.map((product) => (
              <div key={product.id} className="col-12">
                <div className="horizontal-product-box d-flex gap-3 align-items-center bg-white p-2 rounded-3 border position-relative">
                  <div className="horizontal-product-img flex-shrink-0" style={{ width: '80px', height: '80px' }}>
                    <a href="#!" onClick={(e) => { e.preventDefault(); setView('product-details', { product }); }}>
                      <img className="img-fluid img rounded" src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </a>
                  </div>
                  <div className="horizontal-product-details flex-grow-1 text-start">
                    <div className="d-flex align-items-center justify-content-between">
                      <a href="#!" onClick={(e) => { e.preventDefault(); setView('product-details', { product }); }} className="text-decoration-none text-dark">
                        <h4 className="theme-color fw-semibold fs-6 mb-0">{product.name}</h4>
                      </a>
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="btn p-0 border-0 bg-transparent"
                        aria-label="Remove from wishlist"
                      >
                        {/* The HTML has a close button which is just iconsax add icon rotated or close icon */}
                        <IconSax name="add" className="fs-5 text-muted rotate-45" style={{ transform: 'rotate(45deg)', display: 'inline-block' }} />
                      </button>
                    </div>
                    <h5 className="text-muted fs-7 mt-1 mb-2">Qty: 1</h5>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                      <div className="price">
                        <h3 className="fw-bold theme-color fs-6 m-0">
                          ${product.price}
                          {product.originalPrice && (
                            <del className="text-muted ms-2 fs-7 fw-normal">${product.originalPrice}</del>
                          )}
                        </h3>
                      </div>
                      <button onClick={() => handleAddToCart(product.id)} className="cart-bag btn border-0 p-1 bg-none" aria-label="Add to bag">
                        <IconSax name="basket-2" className="bag fs-5 theme-color" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* bottom navbar */}
      <BottomNavbar />
    </div>
  );
};
