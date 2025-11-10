import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import Services from './pages/Services';
import Bookings from './pages/Bookings';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
          <Route
            path="/vehicles"
            element={<ProtectedRoute><Vehicles /></ProtectedRoute>}
          />
          <Route
            path="/services"
            element={<ProtectedRoute><Services /></ProtectedRoute>}
          />
          <Route
            path="/bookings"
            element={<ProtectedRoute><Bookings /></ProtectedRoute>}
          />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  );
}
export default App;