const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const vehicleRoutes = require('./routes/vehicles');
const serviceRoutes = require('./routes/services');
const bookingRoutes = require('./routes/bookings');
const invoiceRoutes = require('./routes/invoices');
const { errorHandler } = require('./middlewares/error');


dotenv.config();
const app = express();


// Connect DB
connectDB();


// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100
});
app.use(limiter);


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/invoices', invoiceRoutes);


// Health
app.get('/api/health', (req, res) => res.json({ ok: true, env: process.env.NODE_ENV || 'development' }));


// Error handler
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}


module.exports = app; // for tests