import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import type { AdminProduct } from './ProductModel';

interface ProductFormProps {
  initialValues: AdminProduct | null;
  onSubmit: (data: Omit<AdminProduct, 'id' | 'rating' | 'reviewsCount'>) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialValues, onSubmit, onCancel, isLoading }) => {
  const { categories } = useApp();

  // Form Field States
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [salePrice, setSalePrice] = useState<number>(0);
  const [category, setCategory] = useState(categories[0] || 'Sofa');
  const [brand, setBrand] = useState('Fuzzy');
  const [qty, setQty] = useState<number>(10);
  const [sku, setSku] = useState('');
  const [status, setStatus] = useState<'active' | 'draft' | 'archived'>('active');
  const [featured, setFeatured] = useState(false);
  const [images, setImages] = useState<string[]>(['/assets/images/product/1.png']);

  // Error States
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Initialize fields on editing edit item
  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name);
      setDesc(initialValues.description);
      setPrice(initialValues.price);
      setSalePrice(initialValues.salePrice || initialValues.price);
      setCategory(initialValues.category);
      setBrand(initialValues.brand || 'Fuzzy');
      setQty(initialValues.stock || 10);
      setSku(initialValues.sku || `FUZ-${initialValues.id}`);
      setStatus(initialValues.status || 'active');
      setFeatured(initialValues.featured || false);
      setImages(initialValues.images || [initialValues.image]);
    } else {
      setSku(`FUZ-${Date.now().toString().slice(-6)}`);
    }
  }, [initialValues]);

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};

    if (!name.trim()) tempErrors.name = 'Product name is required.';
    else if (name.trim().length < 3) tempErrors.name = 'Name must be at least 3 characters.';

    if (!desc.trim()) tempErrors.desc = 'Description is required.';
    else if (desc.trim().length < 10) tempErrors.desc = 'Description must be at least 10 characters.';

    if (price <= 0) tempErrors.price = 'Price must be a positive number greater than 0.';
    if (salePrice < 0) tempErrors.salePrice = 'Sale price cannot be negative.';
    else if (salePrice > price) tempErrors.salePrice = 'Sale price cannot exceed normal price.';

    if (!brand.trim()) tempErrors.brand = 'Brand name is required.';
    if (qty < 0) tempErrors.qty = 'Quantity cannot be negative.';
    if (!sku.trim()) tempErrors.sku = 'SKU identifier is required.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        name,
        description: desc,
        price,
        salePrice,
        category,
        brand,
        stock: qty,
        sku: sku.toUpperCase().trim(),
        status,
        featured,
        image: images[0] || '/assets/images/product/1.png',
        images,
        sizes: initialValues?.sizes || ['S', 'M', 'L'],
        colors: initialValues?.colors || ['#122636'],
        dimensions: initialValues?.dimensions || { height: '80 cm', width: '60 cm', length: '70 cm', weight: '10 kg' },
        sold: initialValues?.sold || 0,
        createdDate: initialValues?.createdDate || new Date().toISOString().substring(0, 10)
      });
    }
  };

  const handleAddMockImage = () => {
    // Inject random mock images from existing local files
    const randomImgIdx = Math.floor(Math.random() * 29) + 1;
    setImages(prev => [...prev, `/assets/images/product/${randomImgIdx}.png`]);
  };

  const handleRemoveImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <form onSubmit={handleSubmit} className="text-start fs-7">
      {/* Product Name */}
      <div className="mb-2">
        <label className="form-label mb-1 fw-semibold text-muted fs-8">Product Name</label>
        <input 
          type="text" 
          className={`form-control form-control-sm ${errors.name ? 'is-invalid' : ''}`} 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        {errors.name && <div className="invalid-feedback fs-8">{errors.name}</div>}
      </div>

      {/* Description */}
      <div className="mb-2">
        <label className="form-label mb-1 fw-semibold text-muted fs-8">Description</label>
        <textarea 
          className={`form-control form-control-sm ${errors.desc ? 'is-invalid' : ''}`} 
          value={desc} 
          onChange={(e) => setDesc(e.target.value)} 
          rows={3}
        />
        {errors.desc && <div className="invalid-feedback fs-8">{errors.desc}</div>}
      </div>

      {/* Prices Row */}
      <div className="row g-2 mb-2">
        <div className="col-6">
          <label className="form-label mb-1 fw-semibold text-muted fs-8">Price ($)</label>
          <input 
            type="number" 
            className={`form-control form-control-sm ${errors.price ? 'is-invalid' : ''}`} 
            value={price} 
            onChange={(e) => setPrice(Number(e.target.value))} 
          />
          {errors.price && <div className="invalid-feedback fs-8">{errors.price}</div>}
        </div>
        <div className="col-6">
          <label className="form-label mb-1 fw-semibold text-muted fs-8">Sale Price ($)</label>
          <input 
            type="number" 
            className={`form-control form-control-sm ${errors.salePrice ? 'is-invalid' : ''}`} 
            value={salePrice} 
            onChange={(e) => setSalePrice(Number(e.target.value))} 
          />
          {errors.salePrice && <div className="invalid-feedback fs-8">{errors.salePrice}</div>}
        </div>
      </div>

      {/* Category & Brand Row */}
      <div className="row g-2 mb-2">
        <div className="col-6">
          <label className="form-label mb-1 fw-semibold text-muted fs-8">Category</label>
          <select 
            className="form-select form-select-sm" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="col-6">
          <label className="form-label mb-1 fw-semibold text-muted fs-8">Brand</label>
          <input 
            type="text" 
            className={`form-control form-control-sm ${errors.brand ? 'is-invalid' : ''}`} 
            value={brand} 
            onChange={(e) => setBrand(e.target.value)} 
          />
          {errors.brand && <div className="invalid-feedback fs-8">{errors.brand}</div>}
        </div>
      </div>

      {/* Quantity & SKU Row */}
      <div className="row g-2 mb-2">
        <div className="col-6">
          <label className="form-label mb-1 fw-semibold text-muted fs-8">Quantity</label>
          <input 
            type="number" 
            className={`form-control form-control-sm ${errors.qty ? 'is-invalid' : ''}`} 
            value={qty} 
            onChange={(e) => setQty(Number(e.target.value))} 
          />
          {errors.qty && <div className="invalid-feedback fs-8">{errors.qty}</div>}
        </div>
        <div className="col-6">
          <label className="form-label mb-1 fw-semibold text-muted fs-8">SKU ID</label>
          <input 
            type="text" 
            className={`form-control form-control-sm ${errors.sku ? 'is-invalid' : ''}`} 
            value={sku} 
            onChange={(e) => setSku(e.target.value)} 
          />
          {errors.sku && <div className="invalid-feedback fs-8">{errors.sku}</div>}
        </div>
      </div>

      {/* Status & Featured */}
      <div className="row g-2 mb-3 align-items-center">
        <div className="col-6">
          <label className="form-label mb-1 fw-semibold text-muted fs-8">Publish Status</label>
          <select 
            className="form-select form-select-sm" 
            value={status} 
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="active">Active (Published)</option>
            <option value="draft">Draft (Hidden)</option>
            <option value="archived">Archived (Inactive)</option>
          </select>
        </div>
        <div className="col-6 pt-3 text-start">
          <div className="form-check">
            <input 
              type="checkbox" 
              className="form-check-input text-start" 
              id="featuredCheck" 
              checked={featured} 
              onChange={(e) => setFeatured(e.target.checked)} 
            />
            <label className="form-check-label text-start" htmlFor="featuredCheck">Featured Product</label>
          </div>
        </div>
      </div>

      {/* Images Upload Mockup */}
      <div className="mb-4">
        <label className="form-label mb-1 fw-semibold text-muted fs-8">Upload Images</label>
        <div className="d-flex flex-wrap gap-2">
          {images.map((img, idx) => (
            <div key={idx} className="position-relative border rounded p-1" style={{ width: '45px', height: '45px' }}>
              <img src={img} className="w-100 h-100 object-fit-cover" alt="prod" style={{ objectFit: 'cover' }} />
              <button 
                type="button" 
                onClick={() => handleRemoveImage(idx)} 
                className="position-absolute top-0 end-0 bg-danger text-white border-0 rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '12px', height: '12px', fontSize: '8px', transform: 'translate(4px, -4px)' }}
              >
                ×
              </button>
            </div>
          ))}
          <button 
            type="button" 
            onClick={handleAddMockImage}
            className="btn btn-sm btn-light border d-flex flex-column align-items-center justify-content-center rounded"
            style={{ width: '45px', height: '45px', borderStyle: 'dashed' }}
          >
            <span className="fs-6">+</span>
          </button>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="d-flex gap-2">
        <button 
          type="button" 
          onClick={onCancel} 
          className="btn btn-sm btn-light border py-2 flex-grow-1 rounded-pill fw-semibold text-dark"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="btn btn-sm btn-dark py-2 flex-grow-1 rounded-pill fw-semibold text-white"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};
