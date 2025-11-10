const Service = require('../models/Service');


exports.listServices = async (req, res, next) => {
    try {
        const services = await Service.find().sort('name');
        res.json(services);
    } catch (err) {
        next(err);
    }
};


exports.createService = async (req, res, next) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json(service);
    } catch (err) {
        next(err);
    }
};