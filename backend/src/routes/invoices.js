const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const { createInvoice, getInvoice } = require('../controllers/invoiceController');


router.post('/', protect, authorize('mechanic', 'admin'), createInvoice);
router.get('/:id', protect, getInvoice);


module.exports = router;