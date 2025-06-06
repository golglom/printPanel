import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    const newUser = await user.save();
    res.status(201).json(newUser);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const updatedData = { ...rest };

    if (password && password.trim() !== '') {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
      context: 'query' });
    res.json(user);
    console.log(req.params.id);

  } catch (error) {
    
    if (error.code === 11000) {
      const champ = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ message: `${champ} déjà utilisé.` });
    }
    
    res.status(400).json({ message: error.message });
  }
};


export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
