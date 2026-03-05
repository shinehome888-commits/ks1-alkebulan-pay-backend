const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const { generateToken } = require('../config/jwt');

const adminLogin = async (req, res) => {
  try {
    const { tradeId, password } = req.body;
    if (tradeId !== 'KS1-ADMN') {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const admin = await User.findOne({ tradeId, isAdmin: true });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const token = generateToken(admin._id);
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: { $ne: true } }, '-password -__v').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { adminLogin, getAllUsers };
