const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/index');
const User = require('../src/models/User');


beforeAll(async () => {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/smart_garage_test';
    await mongoose.connect(uri);
    await User.deleteMany({});
});


afterAll(async () => {
    await mongoose.disconnect();
});


describe('Auth: Register & Login', () => {
    test('registers a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ name: 'Test User', email: 'testuser@example.com', password: 'password123' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('token');
        expect(res.body.user.email).toBe('testuser@example.com');
    });


    test('login with correct credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'testuser@example.com', password: 'password123' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });


    test('login fails with wrong password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'testuser@example.com', password: 'wrongpass' });
        expect(res.statusCode).toBe(400);
    });
});