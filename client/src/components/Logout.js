import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Logout() {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        logout();
        navigate('/login');
    }, [logout, navigate]);

    return (
        <div>
            <h1>Logging Out...</h1>
        </div>
    );
}

export default Logout;
