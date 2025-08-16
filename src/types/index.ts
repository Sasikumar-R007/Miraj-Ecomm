
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
  createdAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  customerInfo: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface StoreSettings {
  name: string;
  logo: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}
