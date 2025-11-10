import { useEffect, useState } from 'react';
import { BookingAPI } from '../services/api';


export default function Bookings() {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        BookingAPI.list().then((res) => setBookings(res.data));
    }, []);


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
            <div className="grid gap-4">
                {bookings.map(b => (
                    <div key={b._id} className="card bg-base-100 shadow p-4">
                        <h3 className="font-bold">{b.service?.name}</h3>
                        <p>Status: {b.status}</p>
                        <p>Start: {new Date(b.slotStart).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}