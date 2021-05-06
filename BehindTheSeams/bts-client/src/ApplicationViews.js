import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { UserContext } from './providers/UserProvider';
import { Home } from './components/home/Home';
import { Hello } from './Hello';
import { ProjectList } from './components/projects/ProjectList';
import { PatternList } from './components/patterns/PatternList';
import { FabricList } from './components/fabric/FabricList';
import { ProjectDetails } from './components/projects/ProjectDetails';
import { PatternDetails } from './components/patterns/PatternDetails';
import { FabricDetails } from './components/fabric/FabricDetails';
import { FabricForm } from './components/fabric/FabricForm';
import { PatternForm } from './components/patterns/PatternForm';
import { ProjectForm } from "./components/projects/ProjectForm";

export const ApplicationViews = () => {
    const { isLoggedIn } = useContext(UserContext);

    return (
        <Switch>
            <Route path="/" exact>
                {isLoggedIn ? <Home /> : <Redirect to="/auth" />}
            </Route>

            <Route path="/auth" exact>
                <Login />
                <Register />
            </Route>

            <Route path="/projects" exact>
                {isLoggedIn ? <ProjectList /> : <Redirect to="/auth" />}
            </Route>

            <Route path="/patterns" exact>
                {isLoggedIn ? <PatternList /> : <Redirect to="/auth" />}
            </Route>

            <Route path="/fabric" exact>
                {isLoggedIn ? <FabricList /> : <Redirect to="/auth" />}
            </Route>

            <Route path="/project/add" exact>
                {isLoggedIn ? <ProjectForm /> : <Redirect to="/auth" />}
            </Route>

            <Route path="/pattern/add" exact>
                {isLoggedIn ? <PatternForm /> : <Redirect to="/auth" />}
            </Route>

            <Route path="/fabric/add" exact>
                {isLoggedIn ? <FabricForm /> : <Redirect to="/auth" />}
            </Route>

            <Route path="/project/:id" exact>
                {isLoggedIn ? <ProjectDetails /> : <Redirect to="/auth" />}
            </Route>

            <Route path="/pattern/:id" exact>
                {isLoggedIn ? <PatternDetails /> : <Redirect to="/auth" />}
            </Route>

            <Route path="/fabric/:id" exact>
                {isLoggedIn ? <FabricDetails /> : <Redirect to="/auth" />}
            </Route>

            <Route path="/fabric/edit/:id" exact>
                {isLoggedIn ? <FabricForm /> : <Redirect to="/auth" />}
            </Route>
        </Switch>
    );
};
