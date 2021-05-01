import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { UserContext } from './providers/UserProvider';

import { Hello } from './Hello';
import { PatternList } from './components/patterns/PatternList';
import { FabricList } from './components/fabric/FabricList';
import { FabricDetails } from './components/fabric/FabricDetails';
import { PatternDetails } from './components/patterns/PatternDetails';
import { ProjectList } from './components/projects/ProjectList';

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

            <Route path="/projects" exact>
                <ProjectList />
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

            <Route path="/pattern/:id">
                <PatternDetails />
            </Route>
        </Switch>
    );
};
