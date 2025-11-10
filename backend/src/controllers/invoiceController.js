const Invoice = require('../models/Invoice');
const BookingModel = require('../models/Booking');


exports.createInvoice = async (req, res, next) => {
    try {
        const { bookingId, amount, tax = 0 } = req.body;
        if (!bookingId || !amount) return res.status(400).json({ message: 'Missing required fields' });
        const booking = await BookingModel.findById(bookingId);
        if (!booking) return res.status(400).json({ message: 'Invalid booking' });
        const total = Number(amount) + Number(tax);
        const invoice = await Invoice.create({ booking: bookingId, amount, tax, total, paid: false });
        booking.invoice = invoice._id;
        await booking.save();
        res.status(201).json(invoice);
    } catch (err) {
        next(err);
    }
};


exports.getInvoice = async (req, res, next) => {
    try {
        const invoice = await Invoice.findById(req.params.id).populate({ path: 'booking', populate: ['vehicle', 'service', 'user'] });
        if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
        res.json(invoice);
    } catch (err) {
        next(err);
    }
};