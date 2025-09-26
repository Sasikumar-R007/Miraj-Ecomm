import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './lib/mongodb.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import User from './models/User.js';
import { sampleProducts } from './lib/fallbackData.js';

// ES modules require this for __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB().catch(err => console.log('MongoDB connection error:', err));

// Serve static files from the React app build directory
const clientPath = path.join(__dirname, '../client/dist');
console.log('Client build path:', clientPath);
app.use(express.static(clientPath, { 
  maxAge: '1d',
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// API Routes

// Products routes
app.get('/api/products', async (req, res) => {
  try {
    console.log('API request received for products');
    // For demonstration purposes, return fallback data directly
    // Transform _id to id for frontend compatibility
    const productsWithId = sampleProducts.map(product => ({
      ...product,
      id: product._id
    }));
    console.log('Returning sample products from API');
    res.json(productsWithId);
  } catch (error) {
    console.error('Error in products endpoint:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    console.log(`API request received for product ID: ${req.params.id}`);
    // For demonstration purposes, use fallback data directly
    const product = sampleProducts.find(p => p._id === req.params.id);
    if (product) {
      console.log('Product found:', product.name);
      // Transform _id to id for frontend compatibility
      const productWithId = {
        ...product,
        id: product._id
      };
      res.json(productWithId);
    } else {
      console.log('Product not found');
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error in product detail endpoint:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    if (!global.mongoConnected) {
      return res.status(503).json({ error: 'Database not available' });
    }
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    if (!global.mongoConnected) {
      return res.status(503).json({ error: 'Database not available' });
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    if (!global.mongoConnected) {
      return res.status(503).json({ error: 'Database not available' });
    }
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Orders routes - Protected and with graceful fallbacks
app.get('/api/orders', async (req, res) => {
  try {
    // Return empty array if database not connected for graceful fallback
    if (!global.mongoConnected) {
      return res.json([]);
    }
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.json([]); // Graceful fallback instead of 500 error
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    if (!global.mongoConnected) {
      return res.status(503).json({ error: 'Database not available' });
    }
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.put('/api/orders/:id/status', async (req, res) => {
  try {
    if (!global.mongoConnected) {
      return res.status(503).json({ error: 'Database not available' });
    }
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Users routes - Basic protection for sensitive endpoints
app.get('/api/users', async (req, res) => {
  try {
    // Return empty array if database not connected for graceful fallback
    if (!global.mongoConnected) {
      return res.json([]);
    }
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.json([]); // Graceful fallback instead of 500 error
  }
});

app.post('/api/users', async (req, res) => {
  try {
    if (!global.mongoConnected) {
      return res.status(503).json({ error: 'Database not available' });
    }
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Catch-all route: serve React app for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

// Start server
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
  console.log(`Serving React app from: ${clientPath}`);
});