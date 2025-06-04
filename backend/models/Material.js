import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  supplier: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Material', materialSchema);