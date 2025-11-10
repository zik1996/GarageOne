const mongoose = require('mongoose');


const invoiceSchema = new mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    amount: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paid: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Invoice', invoiceSchema);