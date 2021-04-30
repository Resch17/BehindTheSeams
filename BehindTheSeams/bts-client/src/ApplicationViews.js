import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { UserContext } from './providers/UserProvider';

import { Hello } from './Hello';
import { PatternList } from './components/patterns/PatternList';
import { FabricList } from './components/fabric/FabricList';
import { FabricDetails } from './components/fabric/FabricDetails';

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

            <Route path="/patterns" exact>
                <PatternList />
            </Route>

            <Route path="/fabric" exact>
                <FabricList />
            </Route>

            <Route path="/fabric/:id">
                <FabricDetails />
            </Route>
        </Switch>
    );
};
