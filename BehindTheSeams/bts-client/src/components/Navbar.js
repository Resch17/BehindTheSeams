import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

export const Navbar = () => {
    const history = useHistory();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.clear();
        history.push('/auth');
    };

    const activeLinkStyle = (resource) => {
        if (location.pathname.includes(resource)) {
            return { borderBottom: '2px solid var(--dark-color1)' };
        }
    };
    return (
        <nav className="navbar">
            <div className="navbar__link">
                <Link to="/">
                    <img className="navbar-logo" src="/assets/logo.png" />
                </Link>
            </div>
            <div className="navbar__link">
                <Link to="/projects" style={activeLinkStyle('project')}>
                    <div>Projects</div>
                </Link>
                <Link to="/patterns" style={activeLinkStyle('pattern')}>
                    <div>Patterns</div>
                </Link>
                <Link to="/fabric" style={activeLinkStyle('fabric')}>
                    <div>Fabric</div>
                </Link>
            </div>
            <div className="navbar__link">
                <div className="logout-button" onClick={handleLogout}>
                    Log Out
                </div>
            </div>
        </nav>
    );
};
