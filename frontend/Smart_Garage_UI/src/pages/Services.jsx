import { useEffect, useState } from 'react';
import { ServiceAPI } from '../services/api';


export default function Services() {
    const [services, setServices] = useState([]);
    useEffect(() => {
        ServiceAPI.list().then((res) => setServices(res.data));
    }, []);
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Available Services</h2>
            <div className="grid gap-4">
                {services.map(s => (
                    <div key={s._id} className="card bg-base-100 shadow p-4">
                        <h3 className="font-bold">{s.name}</h3>
                        <p>Price: ₹{s.price}</p>
                        <p>{s.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}