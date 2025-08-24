
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

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
