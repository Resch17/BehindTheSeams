import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './providers/UserProvider';
import { ApplicationViews } from './ApplicationViews';
import { PatternProvider } from './providers/PatternProvider';
import { FabricProvider } from './providers/FabricProvider';
import { ProjectProvider } from './providers/ProjectProvider';
import { Navbar } from './components/Navbar';

export const App = () => {
    return (
        <Router>
            <UserProvider>
                <PatternProvider>
                    <FabricProvider>
                        <ProjectProvider>
                            <Navbar />
                            <ApplicationViews />
                        </ProjectProvider>
                    </FabricProvider>
                </PatternProvider>
            </UserProvider>
        </Router>
    );
};
