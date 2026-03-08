const { verifyToken } = require('../config/jwt');
const User = require('../models/User.model');

const protectAdmin = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.id);
      if (!user || !user.isAdmin || user.isAdmin !== true) {
        return res.status(403).json({ message: 'Admin access required' });
      }
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = { protectAdmin };
