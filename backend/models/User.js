import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'user'],
    default: 'manager ',
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('User', userSchema);