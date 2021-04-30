import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../styles/Navbar.css';

export const Navbar = () => {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.clear();
        history.push('/auth');
    };
    return (
        <nav className="navbar">
            <div className="navbar__link">
                <Link to="/">
                    <img className="navbar-logo" src="/logo.png" />
                </Link>
            </div>
            <div className="navbar__link">
                <Link to="/projects">
                    <div>Projects</div>
                </Link>
                <Link to="/patterns">
                    <div>Patterns</div>
                </Link>
                <Link to="/fabric">
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
