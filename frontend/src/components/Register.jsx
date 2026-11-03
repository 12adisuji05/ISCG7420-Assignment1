import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { errorMessage } from '../api';
import { useAuth } from '../AuthContext';

function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', first_name: '', last_name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            await register(form);
            navigate('/');
        } catch (err) {
            setError(errorMessage(err));
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
                <div className="card-soft p-4 p-md-5">
                    <h1 className="page-title h3 mb-4 text-center">Create your account</h1>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input name="username" className="form-control" value={form.username} onChange={handleChange} required />
                        </div>
                        <div className="row">
                            <div className="col-sm-6 mb-3">
                                <label className="form-label">First name</label>
                                <input name="first_name" className="form-control" value={form.first_name} onChange={handleChange} required />
                            </div>
                            <div className="col-sm-6 mb-3">
                                <label className="form-label">Last name</label>
                                <input name="last_name" className="form-control" value={form.last_name} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} required />
                            <div className="form-text">At least 8 characters, not only numbers.</div>
                        </div>
                        <button className="btn btn-coral w-100 py-2">Register</button>
                    </form>
                    <p className="text-center small mt-3 mb-0">Already registered? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;
