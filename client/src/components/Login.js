import React, { useState, useContext, useEffect } from 'react';
import sha1 from 'js-sha1';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, useParamas } from 'react-router-dom';

function Login() {
    const { authenticated, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const setLogin = useContext(AuthContext).login;
    const [loginData, setLoginData] = useState({
        login: '',
        password: '',
    });

    useEffect(() => {
        if (authenticated) {
            navigate('/');
        }
    }, [authenticated, navigate]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const hashedPassword = sha1(loginData.password);

        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: loginData.login,
                password: hashedPassword,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            setLogin(data);
            navigate('/');
        } else {
            console.log('Login failed');
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div>
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Login:
                    <input
                        type="text"
                        name="login"
                        value={loginData.login}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}

export default Login;
