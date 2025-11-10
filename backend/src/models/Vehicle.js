const mongoose = require('mongoose');


const vehicleSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    make: String,
    model: String,
    year: Number,
    registrationNo: String,
    notes: String,
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Vehicle', vehicleSchema);