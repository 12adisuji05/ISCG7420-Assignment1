import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api, { errorMessage } from '../api';
import { slotLabel } from '../format';

function BookAppointment() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [slots, setSlots] = useState([]);
    // The doctor page sends the chosen slot as ?slot=<id>
    const [slot, setSlot] = useState(searchParams.get('slot') || '');
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        api.get('slots/?available=true').then((response) => setSlots(response.data));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            const response = await api.post('appointments/', { slot, reason });
            navigate('/booked/' + response.data.id);
        } catch (err) {
            setError(errorMessage(err));
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
                <div className="card-soft p-4 p-md-5">
                    <h1 className="page-title h3 mb-4"><i className="bi bi-calendar-plus text-danger"></i> Book Appointment</h1>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Time slot</label>
                            <select className="form-select" value={slot} onChange={(e) => setSlot(e.target.value)} required>
                                <option value="">Choose a time</option>
                                {slots.map((s) => (
                                    <option key={s.id} value={s.id}>{slotLabel(s)}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Reason</label>
                            <input className="form-control" placeholder="Reason for your visit" value={reason}
                                   onChange={(e) => setReason(e.target.value)} required />
                        </div>
                        <button className="btn btn-coral w-100 py-2">Book</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BookAppointment;
