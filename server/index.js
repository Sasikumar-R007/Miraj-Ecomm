
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDatabase from './lib/mongodb.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectToDatabase();

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Miraj Candles Server is running with MongoDB!' });
});

// API routes
app.get('/api/products', async (req, res) => {
  try {
    // Import Product model dynamically to avoid import issues
    const { default: Product } = await import('./models/Product.js');
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { default: Product } = await import('./models/Product.js');
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create product' });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const { default: Order } = await import('./models/Order.js');
    const orders = await Order.find({}).populate('items.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { default: Order } = await import('./models/Order.js');
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create order' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
  console.log('Connected to MongoDB');
});
