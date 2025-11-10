const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { createVehicle, getMyVehicles } = require('../controllers/vehicleController');


router.post('/', protect, createVehicle);
router.get('/', protect, getMyVehicles);


module.exports = router;