const express = require('express');
const { adminLogin, getAllUsers } = require('../controllers/admin.controller');
const { protectAdmin } = require('../middleware/admin.middleware');

const router = express.Router();
router.post('/login', adminLogin);
router.get('/users', protectAdmin, getAllUsers);
module.exports = router;
