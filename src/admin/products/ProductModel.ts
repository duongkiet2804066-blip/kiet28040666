export interface AdminProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  salePrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  image: string;
  images: string[];
  sizes: string[];
  colors: string[];
  dimensions: {
    height: string;
    width: string;
    length: string;
    weight: string;
  };
  brand: string;
  sku: string;
  stock: number;
  sold: number;
  status: 'active' | 'draft' | 'archived';
  featured: boolean;
  createdDate: string;
}

export const mapToAdminProduct = (product: any): AdminProduct => {
  return {
    id: product.id,
    name: product.name || '',
    category: product.category || 'Sofa',
    price: product.price || 0,
    salePrice: product.salePrice || product.price,
    rating: product.rating || 5.0,
    reviewsCount: product.reviewsCount || 0,
    description: product.description || '',
    image: product.image || '/assets/images/product/1.png',
    images: product.images || [product.image || '/assets/images/product/1.png'],
    sizes: product.sizes || ['S', 'M', 'L'],
    colors: product.colors || ['#122636'],
    dimensions: product.dimensions || { height: '80 cm', width: '60 cm', length: '70 cm', weight: '10 kg' },
    brand: product.brand || 'Fuzzy',
    sku: product.sku || `FUZ-${product.id || Date.now()}`,
    stock: product.stock !== undefined ? product.stock : 25,
    sold: product.sold !== undefined ? product.sold : Math.floor(Math.random() * 50) + 5,
    status: product.status || 'active',
    featured: product.featured !== undefined ? product.featured : false,
    createdDate: product.createdDate || '2026-06-01'
  };
};
