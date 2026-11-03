import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

function Dashboard() {
    const [counts, setCounts] = useState({ doctors: 0, slots: 0, appointments: 0, patients: 0 });

    useEffect(() => {
        Promise.all([api.get('doctors/'), api.get('slots/'), api.get('appointments/'), api.get('patients/')])
            .then(([doctors, slots, appointments, patients]) => {
                setCounts({
                    doctors: doctors.data.length,
                    slots: slots.data.length,
                    appointments: appointments.data.length,
                    patients: patients.data.length,
                });
            });
    }, []);

    const cards = [
        { title: 'Doctors', count: counts.doctors, icon: 'bi-person-badge', link: '/dashboard/doctors' },
        { title: 'Time Slots', count: counts.slots, icon: 'bi-clock', link: '/dashboard/slots' },
        { title: 'Appointments', count: counts.appointments, icon: 'bi-calendar-check', link: '/dashboard/appointments' },
        { title: 'Patients', count: counts.patients, icon: 'bi-people', link: '/dashboard/patients' },
    ];

    return (
        <>
            <h1 className="page-title h3 mb-1">Admin Dashboard</h1>
            <p className="text-muted mb-4">Manage doctors, time slots, bookings and patient accounts.</p>
            <div className="row g-4">
                {cards.map((card) => (
                    <div className="col-sm-6 col-lg-3" key={card.title}>
                        <Link to={card.link} className="text-decoration-none text-reset">
                            <div className="card-soft lift p-4 h-100">
                                <span className="step-icon mb-3"><i className={'bi ' + card.icon}></i></span>
                                <div className="display-6 fw-bold">{card.count}</div>
                                <div className="fw-bold">{card.title}</div>
                                <div className="small text-primary mt-2">Manage <i className="bi bi-arrow-right"></i></div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Dashboard;
