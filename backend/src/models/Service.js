const mongoose = require('mongoose');


const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    durationMinutes: { type: Number, default: 60 },
    price: { type: Number, default: 0 },
    description: String,
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Service', serviceSchema);

