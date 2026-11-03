import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function NavBar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg sticky-top">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <span className="brand-icon"><i className="bi bi-heart-pulse-fill"></i></span>Piki Ora
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" end><i className="bi bi-person-badge"></i> Doctors</NavLink>
                        </li>
                        {user && user.is_staff && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/dashboard"><i className="bi bi-speedometer2"></i> Admin Dashboard</NavLink>
                            </li>
                        )}
                        {user && !user.is_staff && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/book"><i className="bi bi-calendar-plus"></i> Book Appointment</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/my-appointments"><i className="bi bi-calendar-check"></i> My Appointments</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    <ul className="navbar-nav align-items-lg-center gap-2">
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link"><i className="bi bi-person-circle"></i> {user.username}</span>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                                <li className="nav-item"><Link className="btn btn-coral btn-sm px-3" to="/register">Register</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
