import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Navbar() {
    const { authenticated, user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <img src="/images/logo.png" alt="Logo" className="logo" />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/acheter" className="nav-link">
                                <i className="fa-solid fa-cart-shopping fa-2xl"></i> Acheter
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/vendre" className="nav-link">
                                <i className="fa-solid fa-sack-dollar fa-2xl"></i> Vendre
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="d-flex">
                    <ul className="navbar-nav">
                        {authenticated ? (
                            <li className="nav-item">
                                <span className="nav-link">
                                    <i className="fa-solid fa-user-circle fa-2xl"></i> <Link to={user.user.login}>{user.user.login}</Link>

                                    <button className="btn btn-link" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </span>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">
                                    <i className="fa-solid fa-user-circle fa-2xl"></i> Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
