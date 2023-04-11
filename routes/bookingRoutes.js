const express = require('express');
const { getCheckoutSession } = require('../controllers/reviewController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router.get('/checkout-session/:tourID', protect, getCheckoutSession);

module.exports = router;
