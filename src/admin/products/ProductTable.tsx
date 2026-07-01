import React from 'react';
import type { AdminProduct } from './ProductModel';
import { IconSax } from '../../components/IconSax';

interface ProductTableProps {
  products: AdminProduct[];
  onEdit: (product: AdminProduct) => void;
  onDelete: (product: AdminProduct) => void;
  onView: (product: AdminProduct) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
  onView
}) => {
  return (
    <div className="card border-0 shadow-sm rounded-3 overflow-hidden bg-white">
      <div className="table-responsive">
        <table className="table align-middle fs-7 mb-0 text-start">
          <thead>
            <tr className="table-light text-muted">
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Sold</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Created Date</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                {/* Image */}
                <td>
                  <img 
                    src={p.image} 
                    className="rounded border" 
                    alt={p.name} 
                    style={{ width: '36px', height: '36px', objectFit: 'cover' }} 
                  />
                </td>
                {/* Name */}
                <td className="fw-semibold theme-color" style={{ minWidth: '130px' }}>
                  {p.name}
                  {p.featured && <span className="ms-1 badge bg-warning text-dark fs-9">Featured</span>}
                  <div className="text-muted fs-8">SKU: {p.sku}</div>
                </td>
                {/* Category */}
                <td>{p.category}</td>
                {/* Price */}
                <td>
                  <span className="fw-bold theme-color">${p.price}</span>
                  {p.salePrice && p.salePrice < p.price && (
                    <div className="text-danger text-decoration-line-through fs-8">${p.salePrice}</div>
                  )}
                </td>
                {/* Stock */}
                <td className={p.stock < 5 ? 'text-danger fw-bold' : 'text-muted'}>
                  {p.stock} pcs
                </td>
                {/* Sold */}
                <td>{p.sold} units</td>
                {/* Rating */}
                <td>★ {p.rating}</td>
                {/* Status */}
                <td>
                  <span className={`badge px-2 py-1 rounded-pill ${
                    p.status === 'active' ? 'bg-success-subtle text-success' :
                    p.status === 'draft' ? 'bg-warning-subtle text-warning' :
                    'bg-secondary-subtle text-secondary'
                  }`}>
                    {p.status}
                  </span>
                </td>
                {/* Created Date */}
                <td className="text-muted fs-8">{p.createdDate}</td>
                {/* Actions */}
                <td className="text-end">
                  <div className="d-flex justify-content-end gap-1">
                    <button 
                      onClick={() => onView(p)} 
                      className="btn btn-sm btn-light border p-1 rounded" 
                      title="View Details"
                    >
                      <IconSax name="info-circle" className="fs-7 text-muted" />
                    </button>
                    <button 
                      onClick={() => onEdit(p)} 
                      className="btn btn-sm btn-light border p-1 rounded text-primary" 
                      title="Edit Product"
                    >
                      <IconSax name="edit-2" className="fs-7" />
                    </button>
                    <button 
                      onClick={() => onDelete(p)} 
                      className="btn btn-sm btn-light border p-1 rounded text-danger" 
                      title="Delete Product"
                    >
                      <IconSax name="trash" className="fs-7" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
            {products.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center py-4 text-muted">
                  No products match current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
