const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');

router.get('/profile', protect, (req, res) => res.json({ user: req.user }));


module.exports = router;