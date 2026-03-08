const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const { getEligibility } = require('../controllers/eligibility.controller');

const router = express.Router();
router.get('/status/:tradeId', protect, getEligibility);
module.exports = router;
