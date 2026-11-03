import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { errorMessage } from '../../api';

function AdminPatients() {
    const [patients, setPatients] = useState([]);
    const [form, setForm] = useState(null);
    const [error, setError] = useState('');

    const loadPatients = () => {
        api.get('patients/').then((response) => setPatients(response.data));
    };

    useEffect(loadPatients, []);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            await api.put('patients/' + form.id + '/', form);
            setForm(null);
            loadPatients();
        } catch (err) {
            setError(errorMessage(err));
        }
    };

    const deletePatient = async (patient) => {
        if (!window.confirm('Delete the account for ' + patient.username + '? Their appointments will also be removed.')) return;
        try {
            await api.delete('patients/' + patient.id + '/');
            loadPatients();
        } catch (err) {
            setError(errorMessage(err));
        }
    };

    return (
        <>
            <Link to="/dashboard" className="text-decoration-none"><i className="bi bi-arrow-left"></i> Dashboard</Link>
            <h1 className="page-title h3 my-3">Patient Accounts</h1>
            {error && <div className="alert alert-danger">{error}</div>}

            {form && (
                <form className="card-soft p-4 mb-4" onSubmit={handleSubmit}>
                    <h2 className="h6 fw-bold mb-3">Edit {form.username}</h2>
                    <div className="row g-3 align-items-end">
                        <div className="col-md-3">
                            <label className="form-label">First name</label>
                            <input name="first_name" className="form-control" value={form.first_name} onChange={handleChange} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Last name</label>
                            <input name="last_name" className="form-control" value={form.last_name} onChange={handleChange} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Email</label>
                            <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} />
                        </div>
                        <div className="col-md-1">
                            <div className="form-check mb-2">
                                <input type="checkbox" id="is_active" name="is_active" className="form-check-input"
                                       checked={form.is_active} onChange={handleChange} />
                                <label htmlFor="is_active" className="form-check-label">Active</label>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-coral me-2">Save</button>
                            <button type="button" className="btn btn-outline-secondary" onClick={() => setForm(null)}>Cancel</button>
                        </div>
                    </div>
                </form>
            )}

            <div className="card-soft p-3">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead>
                            <tr><th>Username</th><th>Name</th><th>Email</th><th>Active</th><th></th></tr>
                        </thead>
                        <tbody>
                            {patients.map((patient) => (
                                <tr key={patient.id}>
                                    <td>{patient.username}</td>
                                    <td>{patient.first_name} {patient.last_name}</td>
                                    <td>{patient.email}</td>
                                    <td>
                                        {patient.is_active
                                            ? <span className="badge text-bg-success">Yes</span>
                                            : <span className="badge text-bg-secondary">No</span>}
                                    </td>
                                    <td className="text-end text-nowrap">
                                        <button className="btn btn-outline-primary btn-sm me-1" onClick={() => setForm(patient)}>Edit</button>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => deletePatient(patient)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {patients.length === 0 && (
                                <tr><td colSpan="5" className="text-center text-muted py-4">No patients yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default AdminPatients;
