import { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import type { AdminProduct } from './ProductModel';
import { ProductService } from './ProductService';
import { logActivity } from '../services/adminService';

export const useProductController = () => {
  const { products: appProducts, setProducts: setAppProducts, user, setActivityLogs } = useApp();

  // Component States
  const [adminProducts, setAdminProducts] = useState<AdminProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Search & Filter States
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock' | 'sold'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Dialog & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<AdminProduct | null>(null);

  // Snackbar Alerts
  const [snackbar, setSnackbar] = useState<{ show: boolean; msg: string; type: 'success' | 'danger' }>({
    show: false,
    msg: '',
    type: 'success'
  });

  const showToast = (msg: string, type: 'success' | 'danger' = 'success') => {
    setSnackbar({ show: true, msg, type });
    setTimeout(() => {
      setSnackbar(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  // Sync and fetch from mock service on load
  const loadData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await ProductService.getProducts(appProducts);
      setAdminProducts(data);
    } catch (err) {
      setIsError(true);
      showToast('Failed to load products list.', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [appProducts]); // Refetch when appProducts modifications take place

  // Search, filter, and sort calculations
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...adminProducts];

    // Search filter
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.sku.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (categoryFilter) {
      result = result.filter(p => p.category === categoryFilter);
    }

    // Status filter
    if (statusFilter) {
      result = result.filter(p => p.status === statusFilter);
    }

    // Sorting
    result.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = (valB as string).toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [adminProducts, search, categoryFilter, statusFilter, sortBy, sortOrder]);

  // Paginated Results
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProducts.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredAndSortedProducts, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, categoryFilter, statusFilter]);

  // CRUD Handler Hooks
  const handleAddProduct = async (productData: Omit<AdminProduct, 'id' | 'rating' | 'reviewsCount'>) => {
    setIsLoading(true);
    try {
      const newProduct = await ProductService.createProduct(productData);
      
      // Update global context store
      setAppProducts(prev => {
        const mappedNew = {
          id: newProduct.id,
          name: newProduct.name,
          category: newProduct.category,
          price: newProduct.price,
          description: newProduct.description,
          image: newProduct.image,
          images: newProduct.images,
          sizes: newProduct.sizes,
          colors: newProduct.colors,
          rating: newProduct.rating,
          reviewsCount: newProduct.reviewsCount,
          dimensions: newProduct.dimensions
        };
        return [...prev, mappedNew];
      });

      logActivity(user.name, `Created Product: ${newProduct.name} (SKU: ${newProduct.sku})`, setActivityLogs);
      showToast('Product created successfully.', 'success');
      setIsModalOpen(false);
    } catch (err) {
      showToast('Failed to add product.', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProduct = async (id: number, productData: Partial<AdminProduct>) => {
    setIsLoading(true);
    try {
      const updated = await ProductService.updateProduct(id, productData);

      // Update global context store
      setAppProducts(prev => prev.map(p => p.id === id ? {
        ...p,
        name: updated.name ?? p.name,
        category: updated.category ?? p.category,
        price: updated.price ?? p.price,
        description: updated.description ?? p.description,
        image: updated.image ?? p.image,
        images: updated.images ?? p.images
      } : p));

      logActivity(user.name, `Updated Product Details: ${updated.name}`, setActivityLogs);
      showToast('Product updated successfully.', 'success');
      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (err) {
      showToast('Failed to update product.', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    setIsLoading(true);
    try {
      const success = await ProductService.deleteProduct(id);
      if (success) {
        // Remove from global context store
        setAppProducts(prev => prev.filter(p => p.id !== id));
        logActivity(user.name, `Removed product item ID: ${id}`, setActivityLogs);
        showToast('Product deleted successfully.', 'success');
      }
      setIsDeleteOpen(false);
      setProductToDelete(null);
    } catch (err) {
      showToast('Failed to delete product.', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    products: paginatedProducts,
    totalCount: filteredAndSortedProducts.length,
    isLoading,
    isError,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    currentPage,
    setCurrentPage,
    totalPages,
    isModalOpen,
    setIsModalOpen,
    editingProduct,
    setEditingProduct,
    isDeleteOpen,
    setIsDeleteOpen,
    productToDelete,
    setProductToDelete,
    snackbar,
    loadData,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct
  };
};
export type ProductControllerType = ReturnType<typeof useProductController>;
