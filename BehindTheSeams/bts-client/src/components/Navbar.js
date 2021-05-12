import React, { useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';
import '../styles/Navbar.css';

export const Navbar = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        history.push('/auth');
    };

    const loggedOutStyle = () => {
        if (!isLoggedIn) {
            return { display: 'none' };
        }
    };

    const activeLinkStyle = (resource) => {
        if (location.pathname.includes(resource)) {
            return { borderBottom: '2px solid var(--dark-color1)' };
        }
    };
    return (
        <nav className="navbar" style={loggedOutStyle()}>
            <div className="navbar__link">
                <Link to="/">
                    <img className="navbar-logo" src="/assets/logo.png" alt="Behind The Seams logo" />
                </Link>
            </div>
            {isLoggedIn ? (
                <>
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
                    </div>{' '}
                </>
            ) : null}
        </nav>
    );
};
