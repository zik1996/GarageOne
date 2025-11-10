const Vehicle = require('../models/Vehicle');


exports.createVehicle = async (req, res, next) => {
    try {
        const data = { ...req.body, user: req.user._id };
        const vehicle = await Vehicle.create(data);
        res.status(201).json(vehicle);
    } catch (err) {
        next(err);
    }
};


exports.getMyVehicles = async (req, res, next) => {
    try {
        const vehicles = await Vehicle.find({ user: req.user._id });
        res.json(vehicles);
    } catch (err) {
        next(err);
    }
};