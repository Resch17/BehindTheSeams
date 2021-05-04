import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './providers/UserProvider';
import { ApplicationViews } from './ApplicationViews';
import { PatternProvider } from './providers/PatternProvider';
import { FabricProvider } from './providers/FabricProvider';
import { ProjectProvider } from './providers/ProjectProvider';
import { Navbar } from './components/Navbar';
import { RetailerProvider } from './providers/RetailerProvider';
import { FabricTypeProvider } from './providers/FabricTypeProvider';

export const App = () => {
    return (
        <Router>
            <UserProvider>
                <RetailerProvider>
                    <FabricTypeProvider>
                        <PatternProvider>
                            <FabricProvider>
                                <ProjectProvider>
                                    <Navbar />
                                    <ApplicationViews />
                                </ProjectProvider>
                            </FabricProvider>
                        </PatternProvider>
                    </FabricTypeProvider>
                </RetailerProvider>
            </UserProvider>
        </Router>
    );
};
