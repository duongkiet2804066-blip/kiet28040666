import React, { memo } from 'react';
import { useApp, type Product } from '../context/AppContext';
import { IconSax } from './IconSax';

interface HorizontalProductBoxProps {
  product: Product;
  layoutStyle?: 'style1' | 'style2';
}

export const HorizontalProductBox = memo<HorizontalProductBoxProps>(({
  product,
  layoutStyle = 'style1'
}) => {
  const { addToCart, setView } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product, 1, product.colors[0], product.sizes[0]);
  };

  const handleProductClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setView('product-details', { product, layout: layoutStyle });
  };

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  return (
    <div
      className="horizontal-product-box d-flex gap-3 align-items-center bg-white p-2 rounded-3 mb-3 border"
      onClick={handleProductClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="horizontal-product-img flex-shrink-0" style={{ width: '80px', height: '80px' }}>
        <img className="img-fluid img rounded" src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className="horizontal-product-details flex-grow-1">
        <div className="d-flex align-items-center justify-content-between mb-1">
          <h4 className="theme-color fw-semibold fs-6 mb-0">{product.name}</h4>
          <div className="rating d-flex align-items-center gap-1">
            <img src="/assets/images/svg/Star.svg" alt="star" style={{ width: '11px' }} />
            <h6 className="theme-color fw-normal m-0 fs-7">{product.rating}</h6>
          </div>
        </div>
        <h5 className="light-text fs-7 mb-2">{product.description.substring(0, 32)}...</h5>

        <div className="d-flex align-items-center justify-content-between mt-1">
          <div className="d-flex align-items-center gap-2">
            <h3 className="fw-semibold theme-color fs-6 m-0">${product.price}</h3>
            {savings > 0 && <h6 className="save fs-7 text-success m-0 fw-medium">Save ${savings}</h6>}
          </div>
          <button
            onClick={handleAddToCart}
            className="cart-bag btn border-0 p-1 bg-none"
            aria-label="Add to cart"
          >
            <IconSax name="basket-2" className="bag fs-5 theme-color" />
          </button>
        </div>
      </div>
    </div>
  );
});

HorizontalProductBox.displayName = 'HorizontalProductBox';
