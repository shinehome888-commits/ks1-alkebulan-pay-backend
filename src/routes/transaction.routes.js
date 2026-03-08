const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const { createTransaction } = require('../controllers/transaction.controller');

const router = express.Router();
router.post('/create', protect, createTransaction);
module.exports = router;
