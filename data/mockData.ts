import { Store, Product } from '../contexts/AppContext';

export const mockStores: Store[] = [
  {
    id: '1',
    name: 'Fashion Hub Mall',
    distance: '0.8 km',
    address: '123 Shopping Street, Downtown'
  },
  {
    id: '2',
    name: 'TechMart Electronics',
    distance: '1.2 km',
    address: '456 Tech Avenue, City Center'
  },
  {
    id: '3',
    name: 'Fresh Grocery Plus',
    distance: '2.1 km',
    address: '789 Market Road, Suburb'
  },
  {
    id: '4',
    name: 'Sports Zone',
    distance: '3.5 km',
    address: '321 Athletic Boulevard, North District'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Blue Denim Jacket',
    price: 89.99,
    storeId: '1',
    storeName: 'Fashion Hub Mall',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    canTryOn: true
  },
  {
    id: '2',
    name: 'White Cotton T-Shirt',
    price: 24.99,
    storeId: '1',
    storeName: 'Fashion Hub Mall',
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
    canTryOn: true
  },
  {
    id: '3',
    name: 'Wireless Headphones',
    price: 149.99,
    storeId: '2',
    storeName: 'TechMart Electronics',
    image: 'https://images.pexels.com/photos/3394659/pexels-photo-3394659.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    name: 'Smart Fitness Watch',
    price: 299.99,
    storeId: '2',
    storeName: 'TechMart Electronics',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '5',
    name: 'Organic Bananas',
    price: 3.99,
    storeId: '3',
    storeName: 'Fresh Grocery Plus',
    image: 'https://images.pexels.com/photos/2316466/pexels-photo-2316466.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '6',
    name: 'Running Shoes',
    price: 129.99,
    storeId: '4',
    storeName: 'Sports Zone',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const generateQRCode = (): string => {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
};