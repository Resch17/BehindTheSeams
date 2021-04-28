import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { UserContext } from './providers/UserProvider';

import { Hello } from "./Hello";

export const ApplicationViews = () => {
    const { isLoggedIn } = useContext(UserContext);

    return (
        <Switch>
            <Route path="/" exact>
                {isLoggedIn ? <Hello /> : <Redirect to="/auth" />}
            </Route>

            <Route path="/auth" exact>
                <Login />
                <Register />
            </Route>
        </Switch>
    )
};
