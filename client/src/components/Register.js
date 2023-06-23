import React, { useState, useContext, useEffect } from 'react';
import sha1 from 'js-sha1';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Register() {
    const { authenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (authenticated) {
            navigate('/');
        }
    }, [authenticated, navigate]);

    const [registerData, setRegisterData] = useState({
        login: '',
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRegisterData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { login, email, password } = registerData;
        const hashedPassword = sha1(password);
        const admin = false;

        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login,
                email,
                password: hashedPassword,
                admin,
            }),
        });

        if (response.ok) {
            navigate('/login');
        } else {
            console.log('Registration failed');
        }
    };

    return (
        <div>
            <h1>Registration Form</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Login:
                    <input
                        type="text"
                        name="login"
                        value={registerData.login}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={registerData.email}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={registerData.password}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <input type="submit" value="Register" />
            </form>
        </div>
    );
}

export default Register;
