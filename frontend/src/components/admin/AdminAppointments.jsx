import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { errorMessage } from '../../api';
import { formatDate, formatTime } from '../../format';

function AdminAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');

    const loadAppointments = () => {
        api.get('appointments/').then((response) => setAppointments(response.data));
    };

    useEffect(loadAppointments, []);

    const cancelAppointment = async (appointment) => {
        if (!window.confirm('Cancel the appointment for ' + appointment.patient + '?')) return;
        try {
            await api.delete('appointments/' + appointment.id + '/');
            loadAppointments();
        } catch (err) {
            setError(errorMessage(err));
        }
    };

    return (
        <>
            <Link to="/dashboard" className="text-decoration-none"><i className="bi bi-arrow-left"></i> Dashboard</Link>
            <h1 className="page-title h3 my-3">All Appointments</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="card-soft p-3">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead>
                            <tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Reason</th><th></th></tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td className="fw-bold">{appointment.patient}</td>
                                    <td>{appointment.slot_detail.doctor_name}</td>
                                    <td>{formatDate(appointment.slot_detail.date)}</td>
                                    <td>{formatTime(appointment.slot_detail.start_time)}</td>
                                    <td>{appointment.reason}</td>
                                    <td className="text-end text-nowrap">
                                        <Link to={'/appointments/' + appointment.id + '/edit'} className="btn btn-outline-primary btn-sm me-1">Edit</Link>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => cancelAppointment(appointment)}>Cancel</button>
                                    </td>
                                </tr>
                            ))}
                            {appointments.length === 0 && (
                                <tr><td colSpan="6" className="text-center text-muted py-4">No appointments yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default AdminAppointments;
