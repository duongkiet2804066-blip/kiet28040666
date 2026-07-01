import React from 'react';
import type { AdminProduct } from './ProductModel';
import { ProductForm } from './ProductForm';

interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct: AdminProduct | null;
  onAdd: (data: Omit<AdminProduct, 'id' | 'rating' | 'reviewsCount'>) => void;
  onEdit: (id: number, data: Partial<AdminProduct>) => void;
  isLoading: boolean;
}

export const ProductDialog: React.FC<ProductDialogProps> = ({
  isOpen,
  onClose,
  editingProduct,
  onAdd,
  onEdit,
  isLoading
}) => {
  if (!isOpen) return null;

  const handleSubmit = (formData: any) => {
    if (editingProduct) {
      onEdit(editingProduct.id, formData);
    } else {
      onAdd(formData);
    }
  };

  return (
    <>
      {/* Modal Backdrop */}
      <div className="modal-backdrop fade show" style={{ zIndex: 1040 }} onClick={onClose} />
      
      {/* Modal Dialog */}
      <div className="modal fade show d-block text-start" tabIndex={-1} style={{ zIndex: 1050 }}>
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '420px' }}>
          <div className="modal-content border-0 p-3 rounded-4 shadow">
            <div className="modal-header border-0 p-0 mb-3 d-flex justify-content-between align-items-center">
              <h5 className="modal-title fw-bold m-0">
                {editingProduct ? '✏ Edit Product' : '📦 Add New Product'}
              </h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={onClose} 
                aria-label="Close"
                disabled={isLoading}
              />
            </div>
            
            <div className="modal-body p-0">
              <ProductForm 
                initialValues={editingProduct} 
                onSubmit={handleSubmit} 
                onCancel={onClose} 
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
