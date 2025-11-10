const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const { listServices, createService } = require('../controllers/serviceController');


router.get('/', listServices);
router.post('/', protect, authorize('admin'), createService);

module.exports = router;