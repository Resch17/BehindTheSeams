import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';

export const Register = () => {
    const history = useHistory();
    const { register } = useContext(UserContext);

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (evt) => {
        evt.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match");
        } else {
            const user = { username, email };
            register(user, password).then(() => history.push('/'));
        }
    };

    return (
        <div className="register">
            <h1>Register</h1>
            <form onSubmit={registerClick}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        autoComplete="off"
                        id="username"
                        onChange={(evt) => setUsername(evt.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        autoComplete="off"
                        id="email"
                        onChange={(evt) => setEmail(evt.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        autoComplete="off"
                        id="password"
                        onChange={(evt) => setPassword(evt.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        autoComplete="off"
                        id="confirmPassword"
                        onChange={(evt) => setConfirmPassword(evt.target.value)}
                    />
                </div>
                <button>Register</button>
            </form>
        </div>
    );
};
