import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';

export const Login = () => {
    const history = useHistory();
    const { login } = useContext(UserContext);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (evt) => {
        evt.preventDefault();
        login(email, password)
            .then(() => history.push('/'))
            .catch(() => alert('Invalid email or password'));
    };

    return (
        <div className="login">
            <h1>Log In</h1>
            <form onSubmit={loginSubmit}>
                <div className="form-group">
                    <label htmlFor="login-email">Email</label>
                    <input
                        type="text"
                        autoComplete="off"
                        id="login-email"
                        onChange={(evt) => setEmail(evt.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="login-password">Password</label>
                    <input
                        type="password"
                        autoComplete="off"
                        id="login-password"
                        onChange={(evt) => setPassword(evt.target.value)}
                    />
                </div>
                <button>Submit</button>
            </form>
        </div>
    );
};
