import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import DoctorDetail from './components/DoctorDetail';
import Login from './components/Login';
import Register from './components/Register';
import BookAppointment from './components/BookAppointment';
import BookingConfirmed from './components/BookingConfirmed';
import MyAppointments from './components/MyAppointments';
import EditAppointment from './components/EditAppointment';
import Dashboard from './components/admin/Dashboard';
import AdminDoctors from './components/admin/AdminDoctors';
import AdminSlots from './components/admin/AdminSlots';
import AdminAppointments from './components/admin/AdminAppointments';
import AdminPatients from './components/admin/AdminPatients';

function App() {
    return (
        <>
            <NavBar />
            <main className="container my-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/doctors/:id" element={<DoctorDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Patient pages - login required */}
                    <Route path="/book" element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />
                    <Route path="/booked/:id" element={<ProtectedRoute><BookingConfirmed /></ProtectedRoute>} />
                    <Route path="/my-appointments" element={<ProtectedRoute><MyAppointments /></ProtectedRoute>} />
                    <Route path="/appointments/:id/edit" element={<ProtectedRoute><EditAppointment /></ProtectedRoute>} />

                    {/* Administrator dashboard - staff only */}
                    <Route path="/dashboard" element={<ProtectedRoute admin><Dashboard /></ProtectedRoute>} />
                    <Route path="/dashboard/doctors" element={<ProtectedRoute admin><AdminDoctors /></ProtectedRoute>} />
                    <Route path="/dashboard/slots" element={<ProtectedRoute admin><AdminSlots /></ProtectedRoute>} />
                    <Route path="/dashboard/appointments" element={<ProtectedRoute admin><AdminAppointments /></ProtectedRoute>} />
                    <Route path="/dashboard/patients" element={<ProtectedRoute admin><AdminPatients /></ProtectedRoute>} />

                    <Route path="*" element={<h1 className="page-title h3">Page not found</h1>} />
                </Routes>
            </main>
            <footer className="py-4 mt-5">
                <div className="container d-flex flex-column flex-md-row justify-content-between gap-2 small">
                    <span><i className="bi bi-heart-pulse-fill"></i> Piki Ora Medical Centre</span>
                    <span>Online appointment booking</span>
                </div>
            </footer>
        </>
    );
}

export default App;
