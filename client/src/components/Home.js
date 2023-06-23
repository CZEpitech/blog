import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function Home() {
    const { authenticated, user } = useContext(AuthContext);
    return (
        <div>
            {authenticated ? (
                <p>Hi {user.user.login}</p>
            ) : (
                <p>Welcome to the home page!</p>
            )}
        </div>
    );
}

export default Home;
