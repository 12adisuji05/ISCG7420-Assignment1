import { Link } from 'react-router-dom';

const sections = [
    { title: 'Manage Doctors', icon: 'bi-person-badge', link: '/dashboard/doctors' },
    { title: 'Manage Appointment Slots', icon: 'bi-clock', link: '/dashboard/slots' },
    { title: 'All Appointments', icon: 'bi-calendar-check', link: '/dashboard/appointments' },
    { title: 'Patient Accounts', icon: 'bi-people', link: '/dashboard/patients' },
];

function Dashboard() {
    return (
        <>
            <h1 className="page-title h3 mb-4">Admin Dashboard</h1>
            <div className="row g-4">
                {sections.map((section) => (
                    <div className="col-sm-6 col-lg-3" key={section.title}>
                        <Link to={section.link} className="text-decoration-none text-reset">
                            <div className="card-soft lift p-4 h-100">
                                <span className="step-icon mb-3"><i className={'bi ' + section.icon}></i></span>
                                <div className="fw-bold">{section.title}</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Dashboard;
