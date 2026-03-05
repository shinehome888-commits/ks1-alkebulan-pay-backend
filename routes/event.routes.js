const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const { postEvent } = require('../controllers/event.controller');

const router = express.Router();
router.post('/', protect, postEvent);
module.exports = router;
