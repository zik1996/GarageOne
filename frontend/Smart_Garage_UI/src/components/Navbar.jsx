import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export default function Navbar() {
    const { user, logout } = useAuth();
    return (
        <div className="navbar bg-base-100 shadow-md px-4">
            <div className="flex-1">
                <Link to="/" className="text-xl font-bold">SmartGarage</Link>
            </div>
            <div className="flex-none gap-2">
                {user ? (
                    <>
                        <Link to="/dashboard" className="btn btn-ghost">Dashboard</Link>
                        <button onClick={logout} className="btn btn-error btn-sm">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-ghost">Login</Link>
                        <Link to="/register" className="btn btn-primary">Register</Link>
                    </>
                )}
            </div>
        </div>
    );
}