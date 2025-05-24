import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || '',
      { expiresIn: '7d' }
    );

    res.json({ token, user: { username: user.username, role: user.role } });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Server error' });
  }
};


export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email and password are required' });
    }

    
    const existing = await User.findOne({ $or: [ { username }, { email } ] });
    if (existing) {
      return res.status(409).json({ message: 'Username or email already taken' });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    
    const user = new User({ username, email, password: hashed, role: 'admin' });
    await user.save();

    
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || '',
      { expiresIn: '7d' }
    );

  
    res.status(201).json({
      token,
      user: { username: user.username, role: user.role, email: user.email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
