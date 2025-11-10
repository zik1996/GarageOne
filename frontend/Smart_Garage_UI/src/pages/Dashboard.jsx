import { useAuth } from '../context/AuthContext';


export default function Dashboard() {
    const { user } = useAuth();
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">Welcome, {user?.name}</h2>
            <p>Email: {user?.email}</p>
            <p>Role: {user?.role}</p>
        </div>
    );
}