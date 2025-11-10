import axios from './axios';


export const AuthAPI = {
    login: (data) => axios.post('/auth/login', data),
    register: (data) => axios.post('/auth/register', data),
    me: () => axios.get('/auth/me')
};


export const VehicleAPI = {
    list: () => axios.get('/vehicles'),
    create: (data) => axios.post('/vehicles', data)
};


export const ServiceAPI = {
    list: () => axios.get('/services')
};


export const BookingAPI = {
    list: () => axios.get('/bookings'),
    create: (data) => axios.post('/bookings', data)
};


export const InvoiceAPI = {
    get: (id) => axios.get(`/invoices/${id}`),
    create: (data) => axios.post('/invoices', data)
};