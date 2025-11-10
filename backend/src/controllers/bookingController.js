const Booking = require('../models/Booking');
const ServiceModel = require('../models/Service');


// Create booking (user)
exports.createBooking = async (req, res, next) => {
    try {
        const { vehicle, service, slotStart } = req.body;
        if (!vehicle || !service || !slotStart) return res.status(400).json({ message: 'Missing required fields' });
        const svc = await ServiceModel.findById(service);
        if (!svc) return res.status(400).json({ message: 'Invalid service' });


        const start = new Date(slotStart);
        const end = new Date(start.getTime() + svc.durationMinutes * 60000);


        // Basic conflict check: same vehicle overlapping slot
        const conflict = await Booking.findOne({
            vehicle,
            status: { $in: ['pending', 'assigned', 'in_progress'] },
            $or: [
                { slotStart: { $lt: end }, slotEnd: { $gt: start } }
            ]
        });
        if (conflict) return res.status(409).json({ message: 'Booking conflict for selected slot' });


        const booking = await Booking.create({
            user: req.user._id,
            vehicle,
            service,
            slotStart: start,
            slotEnd: end,
            notes: req.body.notes
        });
        res.status(201).json(booking);
    } catch (err) {
        next(err);
    }
};

// List bookings (role-aware)
exports.listBookings = async (req, res, next) => {
    try {
        const { role, _id } = req.user;
        let filter = {};
        if (role === 'user') filter.user = _id;
        if (role === 'mechanic') filter.mechanic = _id;
        const bookings = await Booking.find(filter).populate('vehicle service user mechanic').sort('-slotStart');
        res.json(bookings);
    } catch (err) {
        next(err);
    }
};


// Update booking status (mechanic/admin)
exports.updateBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        const allowed = ['assigned', 'in_progress', 'completed', 'cancelled'];
        const { status, mechanic } = req.body;
        if (status && !allowed.includes(status)) return res.status(400).json({ message: 'Invalid status' });


        const booking = await Booking.findById(id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });


        if (status) booking.status = status;
        if (mechanic) booking.mechanic = mechanic;
        await booking.save();
        res.json(booking);
    } catch (err) {
        next(err);
    }
};