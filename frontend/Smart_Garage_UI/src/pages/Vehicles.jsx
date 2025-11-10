import { useEffect, useState } from 'react';
import { VehicleAPI } from '../services/api';


export default function Vehicles() {
    const [vehicles, setVehicles] = useState([]);


    useEffect(() => {
        VehicleAPI.list().then((res) => setVehicles(res.data));
    }, []);


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Vehicles</h2>
            <div className="grid gap-4">
                {vehicles.map(v => (
                    <div key={v._id} className="card bg-base-100 shadow p-4">
                        <h3 className="font-bold">{v.make} {v.model}</h3>
                        <p>{v.year}</p>
                        <p>{v.registrationNo}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}