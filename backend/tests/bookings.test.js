const request2 = require('supertest');
const app2 = require('../src/index');
const Service = require('../src/models/Service');
const Vehicle = require('../src/models/Vehicle');
const Booking = require('../src/models/Booking');


describe('Bookings flow', () => {
    let token;
    let serviceId;
    let vehicleId;


    beforeAll(async () => {
        // create a user and login
        await request2(app2).post('/api/auth/register').send({ name: 'BUser', email: 'buser@example.com', password: 'pass123' });
        const login = await request2(app2).post('/api/auth/login').send({ email: 'buser@example.com', password: 'pass123' });
        token = login.body.token;


        const svc = await Service.create({ name: 'Oil Change', durationMinutes: 30, price: 30 });
        serviceId = svc._id;


        // add vehicle
        const vres = await request2(app2).post('/api/vehicles').set('Authorization', `Bearer ${token}`).send({ make: 'Honda', model: 'Civic', year: 2018 });
        vehicleId = vres.body._id;
    });


    afterAll(async () => {
        await Service.deleteMany({});
        await Vehicle.deleteMany({});
        await Booking.deleteMany({});
    });


    test('creates a booking', async () => {
        const start = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
        const res = await request2(app2)
            .post('/api/bookings')
            .set('Authorization', `Bearer ${token}`)
            .send({ vehicle: vehicleId, service: serviceId, slotStart: start });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('slotStart');
    });
});