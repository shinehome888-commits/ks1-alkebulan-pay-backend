const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const { generateToken } = require('../config/jwt');

const register = async (req, res) => {
  try {
    const { walletAddress, phoneNumber, password, ...userData } = req.body;
    if (!walletAddress && !phoneNumber) return res.status(400).json({ message: 'Wallet or phone required' });

    const tradeId = 'KS1-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ ...userData, tradeId, walletAddress: walletAddress || undefined, phoneNumber: phoneNumber || undefined, password: hashedPassword });
    await user.save();
    const token = generateToken(user._id);
    res.status(201).json({ success: true, tradeId, token });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: 'Wallet or phone already registered' });
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await User.findOne({ $or: [{ tradeId: identifier }, { walletAddress: identifier }, { phoneNumber: identifier }] });
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: 'Invalid credentials' });
    const token = generateToken(user._id);
    res.json({ success: true, tradeId: user.tradeId, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };
