import { Store, Product } from '../contexts/AppContext';

export const mockStores: Store[] = [
  {
    id: '1',
    name: 'Hiya Fashions',
    distance: '0.8 km',
    address: '123 Shopping Street, Valasaravakkam'
  },
  {
    id: '2',
    name: 'Kishkinta Dresses',
    distance: '1.2 km',
    address: '456 Tech Avenue, k.k Nagar'
  },
  {
    id: '3',
    name: 'Womens Fashionz',
    distance: '3.1 km',
    address: '789 Market Road, Porur'
  },
  {
    id: '4',
    name: 'Max',
    distance: '4.0 km',
    address: '321 West street, Ashok Nagar' 
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Blue Denim Jacket',
    price: 1000,
    storeId: '1',
    storeName: 'Hiya Fashions',
    image: 'https://www.cottontraders.com/dw/image/v2/BCDM_PRD/on/demandware.static/-/Sites-cotton-master-catalog/default/dwf3457617/images/original/AD12222W_original_neutral_stonewash_574653.jpg?sw=549',
    canTryOn: true
  },
  {
    id: '2',
    name: 'White Cotton T-Shirt',
    price: 799,
    storeId: '1',
    storeName: 'Hiya Fashions',
    image: 'https://www.rustorange.com/cdn/shop/files/11_bb56b014-ed58-4030-b257-b8c7fe0ab26b_800x.jpg?v=1724499236',
    canTryOn: true
  },
  {
    id: '3',
    name: 'Half Sleeve shirt',
    price: 599,
    storeId: '2',
    storeName: 'Kishkinta Dresses',
    image: 'https://m.media-amazon.com/images/I/81SPA4y-nIL._UY350_.jpg'
  },
  {
    id: '4',
    name: 'blue jeggins',
    price: 799,
    storeId: '2',
    storeName: 'Womens Fashionz',
    image: 'https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/22760454/2023/4/13/bfbe480e-a7f8-4f31-b73d-57bbdf8a58171681390792110Trousers1.jpg'
  },
  {
    id: '5',
    name: 'Black shirt',
    price: 999,
    storeId: '3',
    storeName: 'Max',
    image: 'https://www.beyours.in/cdn/shop/files/elite-black-3-WEB.jpg?v=1688466474'
  },
  {
    id: '6',
    name: 'T shirt',
    price: 699,
    storeId: '4',
    storeName: 'Max',
    image: 'https://tse1.mm.bing.net/th/id/OIP.z2_NA-51M2SR9n7OUw6PWQHaHa?pid=Api&P=0&h=180'
  }
];

export const generateQRCode = (): string => {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
}; 