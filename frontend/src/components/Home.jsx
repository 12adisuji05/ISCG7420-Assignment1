import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function Home() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        api.get('doctors/').then((response) => setDoctors(response.data));
    }, []);

    return (
        <>
            <h1 className="page-title h3 mb-1">Our Doctors</h1>
            <p className="text-muted mb-4">Choose a doctor to see their available appointment times.</p>
            <div className="row g-4">
                {doctors.map((doctor) => (
                    <div className="col-sm-6 col-lg-3" key={doctor.id}>
                        <Link to={'/doctors/' + doctor.id} className="text-decoration-none text-reset">
                            <div className="card-soft lift p-4 h-100 text-center">
                                <div className="avatar mx-auto mb-3">{doctor.first_name[0]}{doctor.last_name[0]}</div>
                                <h2 className="h6 fw-bold mb-1">Dr {doctor.first_name} {doctor.last_name}</h2>
                                <span className="badge rounded-pill text-bg-light mb-3">{doctor.specialisation}</span>
                                <div className="small text-primary fw-bold">View times <i className="bi bi-arrow-right"></i></div>
                            </div>
                        </Link>
                    </div>
                ))}
                {doctors.length === 0 && <p className="text-muted">No doctors yet.</p>}
            </div>
        </>
    );
}

export default Home;
