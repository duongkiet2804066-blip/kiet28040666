import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
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
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  houseNo: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  type: 'Home' | 'Office' | 'Other';
  isDefault?: boolean;
}

export interface CardInfo {
  id: string;
  cardNo: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
  type: string; // e.g. Visa, Mastercard
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  address: Address;
  shippingMethod: string;
  paymentMethod: string;
  date: string;
  status: 'ordered' | 'shipped' | 'out-for-delivery' | 'delivered' | 'cancelled';
  trackingNumber: string;
}

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: number[]; // Array of product IDs
  user: {
    name: string;
    email: string;
    phone: string;
    profilePic: string;
  };
  addresses: Address[];
  selectedAddressId: string | null;
  cards: CardInfo[];
  orders: Order[];
  notifications: { id: string; title: string; desc: string; time: string; type: string }[];
  searchHistory: string[];
  darkTheme: boolean;
  rtlMode: boolean;
  currentView: string;
  currentViewParams: any;
  selectedShippingMethod: { name: string; price: number; arrival: string; icon: string } | null;
  promoApplied: boolean;

  // Actions
  setView: (view: string, params?: any) => void;
  addToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
  updateCartQty: (productId: number, qty: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: number) => void;
  updateUser: (userInfo: { name: string; email: string; phone: string; profilePic: string }) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setSelectedAddress: (id: string) => void;
  addCard: (card: Omit<CardInfo, 'id'>) => void;
  deleteCard: (id: string) => void;
  placeOrder: (orderInfo: Omit<Order, 'id' | 'date' | 'status' | 'trackingNumber'>) => Order;
  addSearchQuery: (query: string) => void;
  clearSearchHistory: () => void;
  setDarkTheme: (dark: boolean) => void;
  setRtlMode: (rtl: boolean) => void;
  setSelectedShippingMethod: (method: { name: string; price: number; arrival: string; icon: string } | null) => void;
  setPromoApplied: (applied: boolean) => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  coupons: { code: string; discount: number; type: 'percent' | 'flat'; expiry: string }[];
  setCoupons: React.Dispatch<React.SetStateAction<{ code: string; discount: number; type: 'percent' | 'flat'; expiry: string }[]>>;
  admins: { id: string; name: string; email: string; role: string }[];
  setAdmins: React.Dispatch<React.SetStateAction<{ id: string; name: string; email: string; role: string }[]>>;
  roles: { name: string; permissions: string[] }[];
  setRoles: React.Dispatch<React.SetStateAction<{ name: string; permissions: string[] }[]>>;
  activityLogs: { id: string; admin: string; action: string; date: string }[];
  setActivityLogs: React.Dispatch<React.SetStateAction<{ id: string; admin: string; action: string; date: string }[]>>;
  shopSettings: { name: string; tax: number; shippingFee: number; logo: string; banner: string };
  setShopSettings: React.Dispatch<React.SetStateAction<{ name: string; tax: number; shippingFee: number; logo: string; banner: string }>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Generate 30 mock products
const generateMockProducts = (): Product[] => {
  const categories = ['Sofa', 'Chair', 'Table', 'Cabinets', 'Cupboard', 'Lamp'];
  const names = [
    'Buddy Chair', 'Wingback Chair', 'Wingback Chair Premium', 'Mid Century Sofa', 'Beige Chair',
    'Table Lamp', 'Side Table', 'Lounge Chair', 'Swing Chair', 'Bubble Swing Chair',
    'Classic Chair', 'Office Table', 'Modern Cabinet', 'Retro Cupboard', 'Luxe Sofa',
    'Desk Lamp', 'Wooden Desk', 'Shoe Cabinet', 'Large Wardrobe', 'Bedside Table',
    'Comfort Sofa', 'Bar Stool', 'Dining Table', 'Display Shelf', 'Armchair',
    'Reading Lamp', 'Coffee Table', 'Office Cabinet', 'Kitchen Cupboard', 'Chesterfield Sofa'
  ];

  return Array.from({ length: 30 }, (_, index) => {
    const id = index + 1;
    const cat = categories[index % categories.length];
    const name = names[index] || `Product ${id}`;
    const basePrice = Math.floor((index * 37 + 19) % 250) + 15;
    const price = cat === 'Sofa' ? basePrice * 3 : basePrice;
    const discount = (index * 7) % 3 === 0 ? 10 + (index % 4) * 5 : undefined;
    const originalPrice = discount ? Math.round(price * (1 + discount / 100)) : undefined;

    return {
      id,
      name,
      category: cat,
      price,
      originalPrice,
      rating: parseFloat((4.0 + (index % 11) * 0.1).toFixed(1)),
      reviewsCount: 45 + (index * 13) % 400,
      description: `The ${name} offers premium comfort and stylish design. Crafted from high-quality materials to blend seamlessly with modern and classic interiors alike.`,
      image: `/assets/images/product/${id}.png`,
      images: [
        `/assets/images/product/${id}.png`,
        `/assets/images/product/${id === 30 ? 1 : id + 1}.png`,
        `/assets/images/product/${id === 1 ? 30 : id - 1}.png`
      ],
      sizes: ['S', 'M', 'L'],
      colors: ['#122636', '#9B2C2C', '#2B6CB0', '#4A5568'],
      dimensions: {
        height: `${80 + (index % 5) * 10} cm`,
        width: `${60 + (index % 4) * 15} cm`,
        length: `${70 + (index % 6) * 12} cm`,
        weight: `${5 + (index % 10) * 3} kg`
      }
    };
  });
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(generateMockProducts());
  const [cart, setCart] = useState<CartItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['Sofa', 'Chair', 'Table', 'Cabinets', 'Cupboard', 'Lamp']);
  const [coupons, setCoupons] = useState<{ code: string; discount: number; type: 'percent' | 'flat'; expiry: string }[]>([
    { code: 'WELCOME15', discount: 15, type: 'flat', expiry: '2026-12-31' },
    { code: 'GOOGLE20', discount: 20, type: 'flat', expiry: '2026-12-31' },
    { code: 'SOFA50', discount: 50, type: 'percent', expiry: '2026-12-31' }
  ]);
  const [admins, setAdmins] = useState<{ id: string; name: string; email: string; role: string }[]>([
    { id: 'adm-1', name: 'Agasya Admin', email: 'admin@gmail.com', role: 'Super Admin' },
    { id: 'adm-2', name: 'John Editor', email: 'john@gmail.com', role: 'Editor' }
  ]);
  const [roles, setRoles] = useState<{ name: string; permissions: string[] }[]>([
    { name: 'Super Admin', permissions: ['All Actions', 'View Analytics', 'Manage Database', 'User Logs'] },
    { name: 'Manager', permissions: ['All Actions', 'View Analytics'] },
    { name: 'Editor', permissions: ['Manage Products', 'Manage Categories'] },
    { name: 'Staff', permissions: ['View Orders', 'Update Order Status'] }
  ]);
  const [activityLogs, setActivityLogs] = useState<{ id: string; admin: string; action: string; date: string }[]>([
    { id: 'log-1', admin: 'Agasya Admin', action: 'Log In Success', date: '2026-06-30 08:30:12' },
    { id: 'log-2', admin: 'Agasya Admin', action: 'Database Backup Completed', date: '2026-06-30 09:15:00' }
  ]);
  const [shopSettings, setShopSettings] = useState<{ name: string; tax: number; shippingFee: number; logo: string; banner: string }>({
    name: 'Fuzzy Furniture Co.',
    tax: 8,
    shippingFee: 15,
    logo: '/assets/images/logo/logo.png',
    banner: '/assets/images/banner/banner-1.jpg'
  });
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [user, setUser] = useState({
    name: 'Agasya',
    email: 'agasya@gmail.com',
    phone: '+1 (555) 123-4567',
    profilePic: '/assets/images/icons/profile.png'
  });
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 'addr-1',
      name: 'Agasya Home',
      phone: '+1 (555) 123-4567',
      houseNo: 'Flat 402, Block A',
      locality: 'Greenwood Apartments, Sunset Road',
      city: 'San Francisco',
      state: 'California',
      pincode: '94107',
      type: 'Home',
      isDefault: true
    },
    {
      id: 'addr-2',
      name: 'Agasya Office',
      phone: '+1 (555) 987-6543',
      houseNo: 'Floor 12, Tech Tower',
      locality: 'Financial District, Market Street',
      city: 'San Francisco',
      state: 'California',
      pincode: '94103',
      type: 'Office',
      isDefault: false
    }
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>('addr-1');
  const [cards, setCards] = useState<CardInfo[]>([
    {
      id: 'card-1',
      cardNo: '•••• •••• •••• 4242',
      cardHolder: 'AGASYA',
      expiry: '12/28',
      cvv: '123',
      type: 'Visa'
    }
  ]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-9843',
      items: [
        {
          product: generateMockProducts()[0], // Buddy Chair
          quantity: 1,
          selectedColor: '#122636',
          selectedSize: 'M'
        }
      ],
      subtotal: 14,
      shippingFee: 5,
      discount: 2,
      total: 17,
      address: {
        id: 'addr-1',
        name: 'Agasya Home',
        phone: '+1 (555) 123-4567',
        houseNo: 'Flat 402, Block A',
        locality: 'Greenwood Apartments, Sunset Road',
        city: 'San Francisco',
        state: 'California',
        pincode: '94107',
        type: 'Home'
      },
      shippingMethod: 'Standard Delivery',
      paymentMethod: 'Credit Card',
      date: '2026-06-28',
      status: 'shipped',
      trackingNumber: 'TRK843928172'
    }
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Order Placed!',
      desc: 'Your order ORD-9843 has been placed successfully.',
      time: '2 hours ago',
      type: 'order'
    },
    {
      id: 'notif-2',
      title: 'Mega Sale Active',
      desc: 'Get up to 50% discount on sofas today!',
      time: '1 day ago',
      type: 'promo'
    }
  ]);

  const [searchHistory, setSearchHistory] = useState<string[]>(['Sofa', 'Lamp', 'Chair']);
  const [darkTheme, setDarkThemeState] = useState<boolean>(() => {
    return localStorage.getItem('layout_version') === 'dark';
  });
  const [rtlMode, setRtlModeState] = useState<boolean>(() => {
    return localStorage.getItem('dir') === 'rtl';
  });
  const [currentView, setView] = useState<string>('onboarding');
  const [currentViewParams, setViewParams] = useState<any>(null);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<{ name: string; price: number; arrival: string; icon: string } | null>({
    name: 'Regular Delivery',
    price: 15,
    arrival: 'Estimated Arrival, Mar 20-22',
    icon: 'truck-fast'
  });
  const [promoApplied, setPromoApplied] = useState<boolean>(true);

  // Sync dark theme with body class
  useEffect(() => {
    const bodyDom = document.body;
    if (darkTheme) {
      bodyDom.classList.add('dark');
      localStorage.setItem('layout_version', 'dark');
    } else {
      bodyDom.classList.remove('dark');
      localStorage.removeItem('layout_version');
    }
  }, [darkTheme]);

  // Sync RTL mode with HTML attribute and stylesheet
  useEffect(() => {
    const htmlDom = document.documentElement;
    const rtlLink = document.getElementById('rtl-link') as HTMLLinkElement;
    if (rtlMode) {
      htmlDom.setAttribute('dir', 'rtl');
      if (rtlLink) {
        rtlLink.href = '/assets/css/vendors/bootstrap.rtl.min.css';
      }
      localStorage.setItem('dir', 'rtl');
      localStorage.setItem('rtlcss', '/assets/css/vendors/bootstrap.rtl.min.css');
    } else {
      htmlDom.setAttribute('dir', 'ltr');
      if (rtlLink) {
        rtlLink.href = '/assets/css/vendors/bootstrap.min.css';
      }
      localStorage.setItem('dir', 'ltr');
      localStorage.setItem('rtlcss', '/assets/css/vendors/bootstrap.min.css');
    }
  }, [rtlMode]);

  const setViewWithParams = (view: string, params: any = null) => {
    setView(view);
    setViewParams(params);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const addToCart = (product: Product, quantity: number, color?: string, size?: string) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
      }
    });

    // Add a system notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'Added to Cart',
      desc: `${product.name} has been added to your cart.`,
      time: 'Just now',
      type: 'cart'
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const updateCartQty = (productId: number, qty: number) => {
    setCart((prev) => {
      if (qty <= 0) {
        return prev.filter((item) => item.product.id !== productId);
      }
      return prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      );
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const updateUser = (userInfo: typeof user) => {
    setUser(userInfo);
  };

  const addAddress = (addr: Omit<Address, 'id'>) => {
    const newId = `addr-${Date.now()}`;
    const newAddr: Address = { ...addr, id: newId };
    setAddresses((prev) => {
      if (addr.isDefault) {
        setSelectedAddressId(newId);
        return [...prev.map((a) => ({ ...a, isDefault: false })), newAddr];
      }
      return [...prev, newAddr];
    });
  };

  const updateAddress = (id: string, updatedFields: Partial<Address>) => {
    setAddresses((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const updated = { ...a, ...updatedFields };
          if (updatedFields.isDefault) {
            setSelectedAddressId(id);
          }
          return updated;
        }
        if (updatedFields.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      })
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    if (selectedAddressId === id) {
      setSelectedAddressId(null);
    }
  };

  const setSelectedAddress = (id: string) => {
    setSelectedAddressId(id);
  };

  const addCard = (card: Omit<CardInfo, 'id'>) => {
    const newCard = { ...card, id: `card-${Date.now()}` };
    setCards((prev) => [...prev, newCard]);
  };

  const deleteCard = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const placeOrder = (orderInfo: Omit<Order, 'id' | 'date' | 'status' | 'trackingNumber'>) => {
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackNo = `TRK${Math.floor(100000000 + Math.random() * 900000000)}`;
    const newOrder: Order = {
      ...orderInfo,
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      status: 'ordered',
      trackingNumber: trackNo
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Send notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'Order Placed!',
      desc: `Your order ${orderId} has been successfully placed.`,
      time: 'Just now',
      type: 'order'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newOrder;
  };

  const addSearchQuery = (query: string) => {
    if (!query.trim()) return;
    setSearchHistory((prev) => {
      const filtered = prev.filter((q) => q.toLowerCase() !== query.toLowerCase());
      return [query, ...filtered].slice(0, 10);
    });
  };

  const clearSearchHistory = () => setSearchHistory([]);

  const setDarkTheme = (dark: boolean) => setDarkThemeState(dark);
  const setRtlMode = (rtl: boolean) => setRtlModeState(rtl);

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        wishlist,
        user,
        addresses,
        selectedAddressId,
        cards,
        orders,
        notifications,
        searchHistory,
        darkTheme,
        rtlMode,
        currentView,
        currentViewParams,
        selectedShippingMethod,
        promoApplied,
        setView: setViewWithParams,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        toggleWishlist,
        updateUser,
        addAddress,
        updateAddress,
        deleteAddress,
        setSelectedAddress,
        addCard,
        deleteCard,
        placeOrder,
        addSearchQuery,
        clearSearchHistory,
        setDarkTheme,
        setRtlMode,
        setSelectedShippingMethod,
        setPromoApplied,
        setProducts,
        setOrders,
        categories,
        setCategories,
        coupons,
        setCoupons,
        admins,
        setAdmins,
        roles,
        setRoles,
        activityLogs,
        setActivityLogs,
        shopSettings,
        setShopSettings
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
