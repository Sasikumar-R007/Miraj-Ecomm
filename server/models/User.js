
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  dateOfBirth: Date,
  preferences: {
    newsletter: {
      type: Boolean,
      default: false,
    },
    smsUpdates: {
      type: Boolean,
      default: false,
    },
  },
  orderHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
