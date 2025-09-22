import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
  role: 'customer' | 'admin'; 
  storeId?: string; 
}

export interface Store {
  id: string;
  name: string;
  distance: string;
  address: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  storeId: string;
  storeName: string;
  image: string;
  canTryOn?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Purchase {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  qrCode: string;
  storeName: string;
}

export interface StoreStats {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  popularProducts: Product[];
}

export interface AdminData {
  storeStats: StoreStats;
  recentOrders: Purchase[];
  lowStockProducts: Product[];
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  currentStore: Store | null;
  setCurrentStore: (store: Store | null) => void;
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  addToCart: (product: Product) => boolean;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  purchases: Purchase[];
  addPurchase: (purchase: Purchase) => void;
  isLoggedIn: boolean;
  // Add these admin properties
  isAdmin: boolean;
  adminData: AdminData;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  addProduct: (product: Product) => void;
  updateStore: (storeId: string, updates: Partial<Store>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentStore, setCurrentStore] = useState<Store | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  
  // Add admin data state
  const [adminData, setAdminData] = useState<AdminData>({
    storeStats: {
      totalRevenue: 0,
      totalOrders: 0,
      averageOrderValue: 0,
      popularProducts: []
    },
    recentOrders: [],
    lowStockProducts: []
  });

  const isAdmin = user?.role === 'admin';

  const addToCart = (product: Product): boolean => {
    if (cart.length > 0 && cart[0].storeId !== product.storeId) {
      return false;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    return true;
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const addPurchase = (purchase: Purchase) => {
    setPurchases(prevPurchases => [purchase, ...prevPurchases]);
    
    if (isAdmin) {
      updateAdminData();
    }
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    console.log(`Updating product ${productId} with:`, updates);

  };

  const deleteProduct = (productId: string) => {

    console.log(`Deleting product ${productId}`);

  };

  const addProduct = (product: Product) => {
 
    console.log('Adding new product:', product);
 
  };

  const updateStore = (storeId: string, updates: Partial<Store>) => {

    console.log(`Updating store ${storeId} with:`, updates);

  };

  const updateAdminData = () => {
    const today = new Date().toLocaleDateString();
    const todaySales = purchases.filter(p => p.date === today);
    const totalRevenue = todaySales.reduce((sum, p) => sum + p.total, 0);
    const totalOrders = todaySales.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const popularProducts = purchases
      .flatMap(p => p.items)
      .reduce((acc, item) => {
        const existing = acc.find(i => i.id === item.id);
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          acc.push({...item});
        }
        return acc;
      }, [] as CartItem[])
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    setAdminData({
      storeStats: {
        totalRevenue,
        totalOrders,
        averageOrderValue: avgOrderValue,
        popularProducts: popularProducts
      },
      recentOrders: purchases.slice(0, 10),
      lowStockProducts: [] 
    });
  };

  React.useEffect(() => {
    if (isAdmin) {
      updateAdminData();
    }
  }, [user, purchases]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        currentStore,
        setCurrentStore,
        cart,
        setCart,
        addToCart,
        removeFromCart,
        clearCart,
        purchases,
        addPurchase,
        isLoggedIn: !!user,
        isAdmin,
        adminData,
        updateProduct,
        deleteProduct,
        addProduct,
        updateStore
      }}
    >
      {children}
    </AppContext.Provider>
  );
};