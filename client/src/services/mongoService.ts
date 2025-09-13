
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export class MongoService {
  // Products
  static async getProducts() {
    const response = await fetch(`${API_BASE_URL}/products`);
    return response.json();
  }

  static async getProductById(productId: string) {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    if (response.ok) {
      return response.json();
    } else if (response.status === 404) {
      return null;
    } else {
      throw new Error('Failed to fetch product');
    }
  }

  static async createProduct(productData: any) {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    return response.json();
  }

  static async updateProduct(productId: string, productData: any) {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    return response.json();
  }

  static async deleteProduct(productId: string) {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: 'DELETE',
    });
    return response.json();
  }

  // Orders
  static async getOrders() {
    const response = await fetch(`${API_BASE_URL}/orders`);
    return response.json();
  }

  static async createOrder(orderData: any) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    return response.json();
  }

  static async updateOrderStatus(orderId: string, status: string) {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    return response.json();
  }

  // Users
  static async getUsers() {
    const response = await fetch(`${API_BASE_URL}/users`);
    return response.json();
  }

  static async createUser(userData: any) {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  }
}
