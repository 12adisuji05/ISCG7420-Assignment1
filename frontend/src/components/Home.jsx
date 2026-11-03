import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../AuthContext';

function Home() {
    const { user } = useAuth();
    const [doctors, setDoctors] = useState([]);
    const [freeSlots, setFreeSlots] = useState(0);

    useEffect(() => {
        api.get('doctors/').then((response) => setDoctors(response.data));
        api.get('slots/?available=true').then((response) => setFreeSlots(response.data.length));
    }, []);

    return (
        <>
            <section className="hero mb-5">
                <div className="row align-items-center g-4">
                    <div className="col-lg-7">
                        <p className="text-uppercase small fw-bold opacity-75 mb-2">Kia ora</p>
                        <h1 className="display-5 fw-bold">Piki Ora Medical Centre</h1>
                        <p className="lead opacity-75">See when our doctors are free and book your appointment online.</p>
                        {!user && (
                            <>
                                <Link to="/register" className="btn btn-coral btn-lg me-2">Create an account</Link>
                                <Link to="/login" className="btn btn-outline-light btn-lg">Login</Link>
                            </>
                        )}
                        {user && user.is_staff && (
                            <Link to="/dashboard" className="btn btn-light btn-lg"><i className="bi bi-speedometer2"></i> Admin Dashboard</Link>
                        )}
                        {user && !user.is_staff && (
                            <>
                                <Link to="/book" className="btn btn-coral btn-lg me-2"><i className="bi bi-calendar-plus"></i> Book Appointment</Link>
                                <Link to="/my-appointments" className="btn btn-outline-light btn-lg">My Appointments</Link>
                            </>
                        )}
                    </div>
                    <div className="col-lg-5">
                        <div className="row g-3">
                            <div className="col-6">
                                <div className="stat">
                                    <div className="num">{doctors.length}</div>
                                    <div className="small">Doctors</div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="stat">
                                    <div className="num">{freeSlots}</div>
                                    <div className="small">Free times</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-5">
                <h2 className="page-title h4 mb-4">How it works</h2>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card-soft p-4 h-100">
                            <span className="step-icon mb-3"><i className="bi bi-person-plus"></i></span>
                            <h3 className="h6 fw-bold">Register</h3>
                            <p className="text-muted small mb-0">Create a free patient account.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card-soft p-4 h-100">
                            <span className="step-icon mb-3"><i className="bi bi-calendar-week"></i></span>
                            <h3 className="h6 fw-bold">Pick a doctor and time</h3>
                            <p className="text-muted small mb-0">Only free times are shown, so a slot can't be booked twice.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card-soft p-4 h-100">
                            <span className="step-icon mb-3"><i className="bi bi-pencil-square"></i></span>
                            <h3 className="h6 fw-bold">Change or cancel</h3>
                            <p className="text-muted small mb-0">Manage your bookings any time from My Appointments.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="page-title h4 mb-4">Our Doctors</h2>
                <div className="row g-4">
                    {doctors.map((doctor) => (
                        <div className="col-sm-6 col-lg-3" key={doctor.id}>
                            <Link to={'/doctors/' + doctor.id} className="text-decoration-none text-reset">
                                <div className="card-soft lift p-4 h-100 text-center">
                                    <div className="avatar mx-auto mb-3">{doctor.first_name[0]}{doctor.last_name[0]}</div>
                                    <h3 className="h6 fw-bold mb-1">Dr {doctor.first_name} {doctor.last_name}</h3>
                                    <span className="badge rounded-pill text-bg-light mb-3">{doctor.specialisation}</span>
                                    <div className="small text-primary fw-bold">View times <i className="bi bi-arrow-right"></i></div>
                                </div>
                            </Link>
                        </div>
                    ))}
                    {doctors.length === 0 && <p className="text-muted">No doctors yet.</p>}
                </div>
            </section>
        </>
    );
}

export default Home;
