import { mapToAdminProduct, type AdminProduct } from './ProductModel';

// Mock Network Latency Service
export const ProductService = {
  getProducts: async (appProducts: any[]): Promise<AdminProduct[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mapped = appProducts.map(mapToAdminProduct);
        resolve(mapped);
      }, 600); // 600ms mock network latency
    });
  },

  createProduct: async (productData: Omit<AdminProduct, 'id' | 'rating' | 'reviewsCount'>): Promise<AdminProduct> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct: AdminProduct = {
          ...productData,
          id: Date.now(),
          rating: 5.0,
          reviewsCount: 0
        };
        resolve(newProduct);
      }, 500);
    });
  },

  updateProduct: async (id: number, productData: Partial<AdminProduct>): Promise<AdminProduct> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          ...productData
        } as AdminProduct);
      }, 500);
    });
  },

  deleteProduct: async (_id: number): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 400);
    });
  }
};
