import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
  },
  discount: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
  }],
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  features: [{
    type: String,
  }],
  status: {
    type: String,
    enum: ['new', 'sale', 'discounted', 'featured', 'bestseller', 'trending'],
    default: 'new',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  weight: String,
  dimensions: String,
  materials: [String],
  careInstructions: String,
  tags: [String],
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  salePrice: {
    type: Number,
    min: 0
  },
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String
  },
  images: [{
    type: String
  }],
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  bestSeller: {
    type: Boolean,
    default: false
  },
  newArrival: {
    type: Boolean,
    default: false
  },
  trending: {
    type: Boolean,
    default: false
  },
  sales: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);