const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    mechanic: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'assigned', 'in_progress', 'completed', 'cancelled'], default: 'pending' },
    slotStart: { type: Date, required: true },
    slotEnd: { type: Date, required: true },
    notes: String,
    invoice: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Booking', bookingSchema);