import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  orders: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: Number,
    date: {
      type: Date,
      default: Date.now,
    },

  }],
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Client', clientSchema);