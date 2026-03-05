const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const { createEscrow } = require('../controllers/escrow.controller');

const router = express.Router();
router.post('/create', protect, createEscrow);
module.exports = router;
