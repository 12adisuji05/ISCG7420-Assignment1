import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api, { errorMessage } from '../api';
import { useAuth } from '../AuthContext';
import { slotLabel } from '../format';

// Used by patients (My Appointments) and by staff (Admin Dashboard)
function EditAppointment() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const backTo = user.is_staff ? '/dashboard/appointments' : '/my-appointments';
    const [slots, setSlots] = useState([]);
    const [slot, setSlot] = useState('');
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        Promise.all([api.get('appointments/' + id + '/'), api.get('slots/?available=true')])
            .then(([appointmentResponse, slotsResponse]) => {
                const appointment = appointmentResponse.data;
                setSlot(appointment.slot);
                setReason(appointment.reason);
                // Free slots plus the slot this appointment already has
                setSlots([appointment.slot_detail, ...slotsResponse.data]);
            });
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            await api.put('appointments/' + id + '/', { slot, reason });
            navigate(backTo);
        } catch (err) {
            setError(errorMessage(err));
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
                <div className="card-soft p-4 p-md-5">
                    <h1 className="page-title h3 mb-4"><i className="bi bi-pencil-square text-primary"></i> Edit Appointment</h1>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Time slot</label>
                            <select className="form-select" value={slot} onChange={(e) => setSlot(e.target.value)} required>
                                {slots.map((s) => (
                                    <option key={s.id} value={s.id}>{slotLabel(s)}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Reason</label>
                            <input className="form-control" value={reason} onChange={(e) => setReason(e.target.value)} required />
                        </div>
                        <button className="btn btn-primary w-100 py-2">Save</button>
                    </form>
                    <Link to={backTo} className="d-block text-center mt-3">Back</Link>
                </div>
            </div>
        </div>
    );
}

export default EditAppointment;
