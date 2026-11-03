import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../AuthContext';
import { formatDate, formatTime } from '../format';

function DoctorDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        api.get('doctors/' + id + '/').then((response) => setDoctor(response.data));
        api.get('slots/?available=true&doctor=' + id).then((response) => setSlots(response.data));
    }, [id]);

    // Group the slots by date: { "2026-11-06": [slot, slot], ... }
    const days = {};
    slots.forEach((slot) => {
        if (!days[slot.date]) days[slot.date] = [];
        days[slot.date].push(slot);
    });

    const chooseSlot = (slotId) => {
        navigate(user ? '/book?slot=' + slotId : '/login');
    };

    if (!doctor) {
        return <p className="text-muted">Loading...</p>;
    }

    return (
        <>
            <Link to="/" className="text-decoration-none"><i className="bi bi-arrow-left"></i> All doctors</Link>

            <div className="card-soft p-4 my-3 d-flex align-items-center gap-3">
                <div className="avatar">{doctor.first_name[0]}{doctor.last_name[0]}</div>
                <div>
                    <h1 className="page-title h3 mb-1">Dr {doctor.first_name} {doctor.last_name}</h1>
                    <span className="badge rounded-pill text-bg-light">{doctor.specialisation}</span>
                </div>
            </div>

            <h2 className="page-title h5 mb-3">Available times</h2>
            {Object.keys(days).map((date) => (
                <div className="card-soft p-4 mb-3" key={date}>
                    <h3 className="h6 fw-bold mb-3"><i className="bi bi-calendar3"></i> {formatDate(date)}</h3>
                    <div className="d-flex flex-wrap gap-2">
                        {days[date].map((slot) => (
                            <button key={slot.id} className="btn btn-outline-primary" onClick={() => chooseSlot(slot.id)}>
                                {formatTime(slot.start_time)}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
            {slots.length === 0 && <div className="card-soft p-4 text-muted">No available times.</div>}
            {!user && <p className="small text-muted mt-3"><Link to="/login">Login</Link> to book a time.</p>}
        </>
    );
}

export default DoctorDetail;
