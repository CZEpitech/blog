import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedAuthenticated = localStorage.getItem('authenticated');
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedAuthenticated && storedUser) {
            setAuthenticated(storedAuthenticated);
            setUser(storedUser);
        }
    }, []);

    const login = (userData) => {
        setAuthenticated(true);
        setUser(userData);
        localStorage.setItem('authenticated', true);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setAuthenticated(false);
        setUser(null);
        localStorage.removeItem('authenticated');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ authenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


