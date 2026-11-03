import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { errorMessage } from '../../api';

const emptyForm = { first_name: '', last_name: '', specialisation: '' };

function AdminDoctors() {
    const [doctors, setDoctors] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');

    const loadDoctors = () => {
        api.get('doctors/').then((response) => setDoctors(response.data));
    };

    useEffect(loadDoctors, []);

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            if (editingId) {
                await api.put('doctors/' + editingId + '/', form);
            } else {
                await api.post('doctors/', form);
            }
            setForm(emptyForm);
            setEditingId(null);
            loadDoctors();
        } catch (err) {
            setError(errorMessage(err));
        }
    };

    const startEdit = (doctor) => {
        setEditingId(doctor.id);
        setForm({ first_name: doctor.first_name, last_name: doctor.last_name, specialisation: doctor.specialisation });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setForm(emptyForm);
    };

    const deleteDoctor = async (doctor) => {
        if (!window.confirm('Delete Dr ' + doctor.first_name + ' ' + doctor.last_name + '? Their slots and bookings will also be removed.')) return;
        try {
            await api.delete('doctors/' + doctor.id + '/');
            loadDoctors();
        } catch (err) {
            setError(errorMessage(err));
        }
    };

    return (
        <>
            <Link to="/dashboard" className="text-decoration-none"><i className="bi bi-arrow-left"></i> Dashboard</Link>
            <h1 className="page-title h3 my-3">Doctors</h1>
            {error && <div className="alert alert-danger">{error}</div>}

            <form className="card-soft p-4 mb-4" onSubmit={handleSubmit}>
                <h2 className="h6 fw-bold mb-3">{editingId ? 'Edit doctor' : 'Add doctor'}</h2>
                <div className="row g-3 align-items-end">
                    <div className="col-md-3">
                        <label className="form-label">First name</label>
                        <input name="first_name" className="form-control" value={form.first_name} onChange={handleChange} required />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Last name</label>
                        <input name="last_name" className="form-control" value={form.last_name} onChange={handleChange} required />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Specialisation</label>
                        <input name="specialisation" className="form-control" value={form.specialisation} onChange={handleChange} required />
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-coral me-2">{editingId ? 'Save' : 'Add Doctor'}</button>
                        {editingId && <button type="button" className="btn btn-outline-secondary" onClick={cancelEdit}>Cancel</button>}
                    </div>
                </div>
            </form>

            <div className="card-soft p-3">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead>
                            <tr><th>Name</th><th>Specialisation</th><th></th></tr>
                        </thead>
                        <tbody>
                            {doctors.map((doctor) => (
                                <tr key={doctor.id}>
                                    <td>Dr {doctor.first_name} {doctor.last_name}</td>
                                    <td>{doctor.specialisation}</td>
                                    <td className="text-end text-nowrap">
                                        <button className="btn btn-outline-primary btn-sm me-1" onClick={() => startEdit(doctor)}>Edit</button>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => deleteDoctor(doctor)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {doctors.length === 0 && (
                                <tr><td colSpan="3" className="text-center text-muted py-4">No doctors yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default AdminDoctors;
