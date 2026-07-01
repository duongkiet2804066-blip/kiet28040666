import React, { memo } from 'react';
import { useApp, type Product } from '../context/AppContext';
import { IconSax } from './IconSax';

interface ProductBoxProps {
  product: Product;
  layoutStyle?: 'style1' | 'style2';
}

export const ProductBox = memo<ProductBoxProps>(({ product, layoutStyle = 'style1' }) => {
  const { wishlist, toggleWishlist, addToCart, setView } = useApp();

  const isLiked = wishlist.includes(product.id);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWishlist(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product, 1, product.colors[0], product.sizes[0]);
  };

  const handleProductClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setView('product-details', { product, layout: layoutStyle });
  };

  return (
    <div className="product-box position-relative h-100" onClick={handleProductClick} style={{ cursor: 'pointer' }}>
      <div className="product-box-img">
        <img className="img img-fluid" src={product.image} alt={product.name} />
        <div className="cart-box">
          <button
            onClick={handleAddToCart}
            className="cart-bag btn border-0 p-0"
            aria-label="Add to cart"
          >
            <IconSax name="basket-2" className="bag fs-5 text-white" />
          </button>
        </div>
      </div>
      
      <div
        onClick={handleLike}
        className={`like-btn position-absolute top-0 end-0 m-2 ${isLiked ? 'active' : 'inactive'}`}
        style={{ cursor: 'pointer', zIndex: 10 }}
      >
        <img className="outline-icon" src="/assets/images/svg/like.svg" alt="like" />
        <img className="fill-icon" src="/assets/images/svg/like-fill.svg" alt="like" />
        <div className="effect-group">
          <span className="effect"></span>
          <span className="effect"></span>
          <span className="effect"></span>
          <span className="effect"></span>
          <span className="effect"></span>
        </div>
      </div>

      <div className="product-box-detail mt-2">
        <h4 className="theme-color fw-semibold mb-1">{product.name}</h4>
        <h5 className="light-text mb-2">{product.description.substring(0, 30)}...</h5>
        <div className="bottom-panel d-flex justify-content-between align-items-center">
          <div className="price">
            <h4 className="fw-bold theme-color m-0">
              ${product.price}
              {product.originalPrice && (
                <del className="pev-price ms-1 fs-7 text-muted fw-normal">${product.originalPrice}</del>
              )}
            </h4>
          </div>
          <div className="rating d-flex align-items-center gap-1">
            <img src="/assets/images/svg/Star.svg" alt="star" style={{ width: '12px' }} />
            <h6 className="m-0 theme-color fs-7 fw-normal">{product.rating}</h6>
          </div>
        </div>
      </div>
    </div>
  );
});

ProductBox.displayName = 'ProductBox';
