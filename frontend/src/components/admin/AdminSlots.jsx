import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { errorMessage } from '../../api';
import { formatDate, formatTime } from '../../format';

const emptyForm = { doctor: '', date: '', start_time: '', end_time: '' };

function AdminSlots() {
    const [slots, setSlots] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');

    const loadSlots = () => {
        api.get('slots/').then((response) => setSlots(response.data));
    };

    useEffect(() => {
        loadSlots();
        api.get('doctors/').then((response) => setDoctors(response.data));
    }, []);

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            if (editingId) {
                await api.put('slots/' + editingId + '/', form);
            } else {
                await api.post('slots/', form);
            }
            setForm(emptyForm);
            setEditingId(null);
            loadSlots();
        } catch (err) {
            setError(errorMessage(err));
        }
    };

    const startEdit = (slot) => {
        setEditingId(slot.id);
        setForm({
            doctor: slot.doctor,
            date: slot.date,
            start_time: slot.start_time.slice(0, 5),
            end_time: slot.end_time.slice(0, 5),
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setForm(emptyForm);
    };

    const deleteSlot = async (slot) => {
        if (!window.confirm('Delete this slot? Any booking for it will also be removed.')) return;
        try {
            await api.delete('slots/' + slot.id + '/');
            loadSlots();
        } catch (err) {
            setError(errorMessage(err));
        }
    };

    return (
        <>
            <Link to="/dashboard" className="text-decoration-none"><i className="bi bi-arrow-left"></i> Dashboard</Link>
            <h1 className="page-title h3 my-3">Appointment Slots</h1>
            {error && <div className="alert alert-danger">{error}</div>}

            <form className="card-soft p-4 mb-4" onSubmit={handleSubmit}>
                <h2 className="h6 fw-bold mb-3">{editingId ? 'Edit slot' : 'Add slot'}</h2>
                <div className="row g-3 align-items-end">
                    <div className="col-md-3">
                        <label className="form-label">Doctor</label>
                        <select name="doctor" className="form-select" value={form.doctor} onChange={handleChange} required>
                            <option value="">Choose a doctor</option>
                            {doctors.map((doctor) => (
                                <option key={doctor.id} value={doctor.id}>Dr {doctor.first_name} {doctor.last_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Date</label>
                        <input type="date" name="date" className="form-control" value={form.date} onChange={handleChange} required />
                    </div>
                    <div className="col-md-2">
                        <label className="form-label">Start time</label>
                        <input type="time" name="start_time" className="form-control" value={form.start_time} onChange={handleChange} required />
                    </div>
                    <div className="col-md-2">
                        <label className="form-label">End time</label>
                        <input type="time" name="end_time" className="form-control" value={form.end_time} onChange={handleChange} required />
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-coral me-2">{editingId ? 'Save' : 'Add Slot'}</button>
                        {editingId && <button type="button" className="btn btn-outline-secondary" onClick={cancelEdit}>Cancel</button>}
                    </div>
                </div>
            </form>

            <div className="card-soft p-3">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead>
                            <tr><th>Doctor</th><th>Date</th><th>Time</th><th>Status</th><th></th></tr>
                        </thead>
                        <tbody>
                            {slots.map((slot) => (
                                <tr key={slot.id}>
                                    <td>{slot.doctor_name}</td>
                                    <td>{formatDate(slot.date)}</td>
                                    <td>{formatTime(slot.start_time)} - {formatTime(slot.end_time)}</td>
                                    <td>
                                        {slot.is_booked
                                            ? <span className="badge text-bg-secondary">Booked</span>
                                            : <span className="badge text-bg-success">Available</span>}
                                    </td>
                                    <td className="text-end text-nowrap">
                                        <button className="btn btn-outline-primary btn-sm me-1" onClick={() => startEdit(slot)}>Edit</button>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => deleteSlot(slot)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {slots.length === 0 && (
                                <tr><td colSpan="5" className="text-center text-muted py-4">No slots yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default AdminSlots;
