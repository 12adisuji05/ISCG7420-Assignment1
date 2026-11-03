import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { errorMessage } from '../api';
import { formatDate, formatTime } from '../format';

function MyAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [message, setMessage] = useState('');

    const loadAppointments = () => {
        api.get('appointments/').then((response) => setAppointments(response.data));
    };

    useEffect(loadAppointments, []);

    const cancelAppointment = async (appointment) => {
        if (!window.confirm('Cancel your appointment with ' + appointment.slot_detail.doctor_name + '?')) return;
        try {
            await api.delete('appointments/' + appointment.id + '/');
            setMessage('Your appointment has been cancelled.');
            loadAppointments();
        } catch (err) {
            setMessage(errorMessage(err));
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="page-title h3 mb-0">My Appointments</h1>
                <Link to="/book" className="btn btn-coral"><i className="bi bi-plus-lg"></i> Book new</Link>
            </div>
            {message && <div className="alert alert-info">{message}</div>}
            <div className="card-soft p-3">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead>
                            <tr><th>Doctor</th><th>Date</th><th>Time</th><th>Reason</th><th></th></tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td className="fw-bold">{appointment.slot_detail.doctor_name}</td>
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
                                <tr><td colSpan="5" className="text-center text-muted py-4">You have no appointments.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default MyAppointments;
