import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api';
import { formatDate, formatTime } from '../format';

function BookingConfirmed() {
    const { id } = useParams();
    const [appointment, setAppointment] = useState(null);

    useEffect(() => {
        api.get('appointments/' + id + '/').then((response) => setAppointment(response.data));
    }, [id]);

    if (!appointment) {
        return <p className="text-muted">Loading...</p>;
    }

    const slot = appointment.slot_detail;
    return (
        <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
                <div className="card-soft p-4 p-md-5 text-center">
                    <i className="bi bi-check-circle-fill text-success display-3"></i>
                    <h1 className="page-title h3 mt-3">Your appointment is confirmed!</h1>
                    <ul className="list-group list-group-flush text-start my-4">
                        <li className="list-group-item"><i className="bi bi-person-badge"></i> {slot.doctor_name}</li>
                        <li className="list-group-item"><i className="bi bi-calendar3"></i> {formatDate(slot.date)}</li>
                        <li className="list-group-item"><i className="bi bi-clock"></i> {formatTime(slot.start_time)} - {formatTime(slot.end_time)}</li>
                        <li className="list-group-item"><i className="bi bi-chat-left-text"></i> {appointment.reason}</li>
                    </ul>
                    <Link to="/my-appointments" className="btn btn-primary">My Appointments</Link>
                </div>
            </div>
        </div>
    );
}

export default BookingConfirmed;
