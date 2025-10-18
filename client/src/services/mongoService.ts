
import { sampleProducts } from '../lib/sampleData';

export class MongoService {
  // Products - Now using local data only (no backend API calls)
  static async getProducts() {
    // Return sample products directly
    return sampleProducts.map((product, index) => ({
      ...product,
      id: (index + 1).toString(),
      createdAt: new Date(),
      status: 'featured'
    }));
  }

  static async getProductById(productId: string) {
    // Search sample products directly
    const sampleProduct = sampleProducts.find((p, index) => (index + 1).toString() === productId);
    if (sampleProduct) {
      return {
        ...sampleProduct,
        id: productId,
        createdAt: new Date(),
        status: 'featured'
      };
    }
    return null;
  }

  // Admin functions - These are for demo purposes only (no backend)
  static async createProduct(productData: any) {
    console.log('Demo mode: Product creation not available without backend');
    return { success: false, message: 'Backend not configured' };
  }

  static async updateProduct(productId: string, productData: any) {
    console.log('Demo mode: Product update not available without backend');
    return { success: false, message: 'Backend not configured' };
  }

  static async deleteProduct(productId: string) {
    console.log('Demo mode: Product deletion not available without backend');
    return { success: false, message: 'Backend not configured' };
  }

  // Orders
  static async getOrders() {
    console.log('Demo mode: No orders in frontend-only mode');
    return [];
  }

  static async createOrder(orderData: any) {
    console.log('Demo mode: Order created (not saved):', orderData);
    return { success: true, message: 'Order received (demo mode)', data: orderData };
  }

  static async updateOrderStatus(orderId: string, status: string) {
    console.log('Demo mode: Order status update not available');
    return { success: false, message: 'Backend not configured' };
  }

  // Users
  static async getUsers() {
    console.log('Demo mode: No users in frontend-only mode');
    return [];
  }

  static async createUser(userData: any) {
    console.log('Demo mode: User created (not saved):', userData);
    return { success: true, message: 'User registered (demo mode)', data: userData };
  }
}
