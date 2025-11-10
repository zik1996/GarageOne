const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const { createBooking, listBookings, updateBooking } = require('../controllers/bookingController');


router.post('/', protect, authorize('user'), createBooking);
router.get('/', protect, listBookings); // role-aware
router.patch('/:id', protect, authorize('mechanic', 'admin'), updateBooking);


module.exports = router;