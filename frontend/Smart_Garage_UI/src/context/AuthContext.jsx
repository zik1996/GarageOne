import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../services/axios';
import toast from 'react-hot-toast';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('/auth/me').then(res => {
                setUser(res.data.user);
            }).catch(() => localStorage.removeItem('token'));
        }
        setLoading(false);
    }, []);


    const login = async (email, password) => {
        try {
            const res = await axios.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            toast.success('Logged in successfully');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        }
    };


    const register = async (data) => {
        try {
            const res = await axios.post('/auth/register', data);
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            toast.success('Registration successful');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        }
    };


    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        toast.success('Logged out');
    };


    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);