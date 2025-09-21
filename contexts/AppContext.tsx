import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
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

  const addToCart = (product: Product): boolean => {
    // Validate store match
    if (cart.length > 0 && cart[0].storeId !== product.storeId) {
      return false; // Store mismatch
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
  };

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};