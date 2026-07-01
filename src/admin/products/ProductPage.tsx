import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IconSax } from '../../components/IconSax';
import { useProductController } from './ProductController';
import { ProductTable } from './ProductTable';
import { ProductDialog } from './ProductDialog';
import { DeleteDialog } from './DeleteDialog';
import type { AdminProduct } from './ProductModel';

export const ProductPage: React.FC = () => {
  const { categories } = useApp();
  const controller = useProductController();

  // Selected product view state for 👁 View
  const [viewProduct, setViewProduct] = useState<AdminProduct | null>(null);

  const handleOpenAdd = () => {
    controller.setEditingProduct(null);
    controller.setIsModalOpen(true);
  };

  const handleOpenEdit = (p: AdminProduct) => {
    controller.setEditingProduct(p);
    controller.setIsModalOpen(true);
  };

  const handleOpenDelete = (p: AdminProduct) => {
    controller.setProductToDelete(p);
    controller.setIsDeleteOpen(true);
  };

  const handleOpenView = (p: AdminProduct) => {
    setViewProduct(p);
  };

  return (
    <div className="admin-product-page text-start position-relative">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold theme-color m-0">Product Management</h4>
          <p className="text-muted fs-8 m-0">Create, edit, search, and delete furniture catalog items.</p>
        </div>
        <button 
          onClick={handleOpenAdd} 
          className="btn btn-dark btn-sm rounded-pill px-3 py-2 fw-semibold fs-7"
        >
          + Add Product
        </button>
      </div>

      {/* Control Panel: Search, Filters, Sorters, Refresh */}
      <div className="card border-0 shadow-sm p-3 rounded-3 bg-white mb-3">
        <div className="row g-2 align-items-center">
          {/* Search Box */}
          <div className="col-12 col-md-4">
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-light border-end-0">
                <IconSax name="search-normal-2" className="fs-7 text-muted" />
              </span>
              <input 
                type="text" 
                className="form-control form-control-sm bg-light border-start-0" 
                placeholder="Search by SKU, name..." 
                value={controller.search}
                onChange={(e) => controller.setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="col-6 col-md-2">
            <select 
              className="form-select form-select-sm bg-light"
              value={controller.categoryFilter}
              onChange={(e) => controller.setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="col-6 col-md-2">
            <select 
              className="form-select form-select-sm bg-light"
              value={controller.statusFilter}
              onChange={(e) => controller.setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Sorter */}
          <div className="col-6 col-md-2">
            <select 
              className="form-select form-select-sm bg-light"
              value={controller.sortBy}
              onChange={(e) => controller.setSortBy(e.target.value as any)}
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="stock">Sort by Stock</option>
              <option value="sold">Sort by Sales</option>
            </select>
          </div>

          {/* Sorter Direction & Refresh */}
          <div className="col-6 col-md-2 d-flex gap-2">
            <button 
              onClick={() => controller.setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')} 
              className="btn btn-sm btn-light border flex-grow-1"
              title="Toggle sort direction"
            >
              {controller.sortOrder === 'asc' ? '▲ Asc' : '▼ Desc'}
            </button>
            <button 
              onClick={controller.loadData} 
              className="btn btn-sm btn-light border px-2"
              title="Refresh dataset"
            >
              <IconSax name="box-rotate" className="fs-7" />
            </button>
          </div>
        </div>
      </div>

      {/* States: Loading, Error, Table Empty, or Display List */}
      {controller.isLoading ? (
        // Loading State: Skeleton list representation
        <div className="card border-0 shadow-sm p-4 rounded-3 bg-white text-center">
          <div className="spinner-border text-muted mb-2" role="status" />
          <p className="text-muted fs-7 m-0">Synchronizing database inventory...</p>
        </div>
      ) : controller.isError ? (
        // Error State
        <div className="card border-0 shadow-sm p-4 rounded-3 bg-white text-center border-danger">
          <IconSax name="info-circle" className="fs-2 text-danger mb-2" />
          <h6 className="fw-bold text-danger">Connection Timeout Error</h6>
          <p className="text-muted fs-8">Failed to download inventory metrics from mock endpoint.</p>
          <button onClick={controller.loadData} className="btn btn-sm btn-dark px-3 py-1 rounded-pill mt-2">
            Retry Connection
          </button>
        </div>
      ) : controller.products.length === 0 ? (
        // Empty State
        <div className="card border-0 shadow-sm p-5 rounded-3 bg-white text-center">
          <IconSax name="box" className="fs-1 text-muted mb-2" />
          <h6 className="fw-bold theme-color">No Products Found</h6>
          <p className="text-muted fs-8">We couldn't find any products matching your search query or filters.</p>
          <button 
            onClick={() => { controller.setSearch(''); controller.setCategoryFilter(''); controller.setStatusFilter(''); }}
            className="btn btn-sm btn-light border px-3 py-1 rounded-pill mt-2"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        // Display Table
        <>
          <ProductTable 
            products={controller.products} 
            onEdit={handleOpenEdit} 
            onDelete={handleOpenDelete} 
            onView={handleOpenView}
          />

          {/* Pagination Controls */}
          {controller.totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center mt-3 fs-8 text-muted px-2">
              <span>Showing {controller.products.length} of {controller.totalCount} items</span>
              <div className="btn-group btn-group-sm">
                <button 
                  disabled={controller.currentPage === 1}
                  onClick={() => controller.setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="btn btn-light border px-3"
                >
                  Prev
                </button>
                <button 
                  disabled={true} 
                  className="btn btn-light border px-3 text-dark fw-bold"
                >
                  {controller.currentPage}
                </button>
                <button 
                  disabled={controller.currentPage === controller.totalPages}
                  onClick={() => controller.setCurrentPage(prev => Math.min(controller.totalPages, prev + 1))}
                  className="btn btn-light border px-3"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* dialog forms */}
      <ProductDialog 
        isOpen={controller.isModalOpen}
        onClose={() => controller.setIsModalOpen(false)}
        editingProduct={controller.editingProduct}
        onAdd={controller.handleAddProduct}
        onEdit={controller.handleEditProduct}
        isLoading={controller.isLoading}
      />

      {/* delete warnings */}
      <DeleteDialog 
        isOpen={controller.isDeleteOpen}
        onClose={() => controller.setIsDeleteOpen(false)}
        product={controller.productToDelete}
        onConfirm={controller.handleDeleteProduct}
        isLoading={controller.isLoading}
      />

      {/* Product Detail Modal for 👁 View action */}
      {viewProduct && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1040 }} onClick={() => setViewProduct(null)} />
          <div className="modal fade show d-block text-start" tabIndex={-1} style={{ zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '380px' }}>
              <div className="modal-content border-0 p-3 rounded-4 shadow">
                <div className="modal-header border-0 p-0 mb-3 d-flex justify-content-between align-items-center">
                  <h5 className="modal-title fw-bold m-0">👁 Product View</h5>
                  <button type="button" className="btn-close" onClick={() => setViewProduct(null)} />
                </div>
                <div className="modal-body p-0 fs-7">
                  <div className="text-center mb-3">
                    <img 
                      src={viewProduct.image} 
                      className="rounded border" 
                      alt={viewProduct.name} 
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }} 
                    />
                  </div>
                  <p className="mb-1"><strong>Name:</strong> {viewProduct.name}</p>
                  <p className="mb-1"><strong>SKU:</strong> {viewProduct.sku}</p>
                  <p className="mb-1"><strong>Category:</strong> {viewProduct.category}</p>
                  <p className="mb-1"><strong>Price:</strong> <span className="fw-bold">${viewProduct.price}</span></p>
                  <p className="mb-1"><strong>Sale Price:</strong> <span className="fw-bold text-success">${viewProduct.salePrice || viewProduct.price}</span></p>
                  <p className="mb-1"><strong>Stock Inventory:</strong> {viewProduct.stock} units</p>
                  <p className="mb-1"><strong>Total Sold:</strong> {viewProduct.sold} units</p>
                  <p className="mb-1"><strong>Status:</strong> {viewProduct.status}</p>
                  <p className="mb-1"><strong>Created Date:</strong> {viewProduct.createdDate}</p>
                  <p className="mb-0"><strong>Description:</strong> {viewProduct.description}</p>
                </div>
                <div className="modal-footer border-0 p-0 mt-3">
                  <button 
                    onClick={() => setViewProduct(null)} 
                    className="btn btn-dark w-100 py-2 rounded-pill fs-7 fw-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Floating Snackbar Alert */}
      {controller.snackbar.show && (
        <div 
          className={`position-fixed bottom-0 start-50 translate-middle-x mb-4 alert alert-${controller.snackbar.type} shadow border-0 py-2 px-4 rounded-pill fs-7 text-center`}
          style={{ zIndex: 2000, minWidth: '220px', color: '#ffffff', backgroundColor: controller.snackbar.type === 'success' ? '#2e7d32' : '#c62828' }}
        >
          {controller.snackbar.msg}
        </div>
      )}
    </div>
  );
};
export default ProductPage;
