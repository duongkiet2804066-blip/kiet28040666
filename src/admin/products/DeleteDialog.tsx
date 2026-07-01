import React from 'react';
import type { AdminProduct } from './ProductModel';

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: AdminProduct | null;
  onConfirm: (id: number) => void;
  isLoading: boolean;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  onClose,
  product,
  onConfirm,
  isLoading
}) => {
  if (!isOpen || !product) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show" style={{ zIndex: 1040 }} onClick={onClose} />
      
      {/* Dialog Body */}
      <div className="modal fade show d-block text-start" tabIndex={-1} style={{ zIndex: 1050 }}>
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '350px' }}>
          <div className="modal-content border-0 p-3 rounded-4 shadow">
            <div className="modal-header border-0 p-0 mb-3 d-flex justify-content-between align-items-center">
              <h5 className="modal-title fw-bold m-0 text-danger">⚠️ Delete Product</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={onClose} 
                disabled={isLoading}
              />
            </div>
            
            <div className="modal-body p-0 text-start fs-7">
              <p className="theme-color m-0 mb-3">
                Bạn có chắc muốn xóa sản phẩm <strong>"{product.name}"</strong>? Hành động này không thể hoàn tác.
              </p>
            </div>
            
            <div className="modal-footer border-0 p-0 d-flex gap-2">
              <button 
                type="button" 
                onClick={onClose} 
                className="btn btn-sm btn-light border py-2 flex-grow-1 rounded-pill fw-semibold text-dark"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={() => onConfirm(product.id)} 
                className="btn btn-sm btn-danger py-2 flex-grow-1 rounded-pill fw-semibold text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
