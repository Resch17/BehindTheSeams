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
import { FabricImageProvider } from './providers/FabricImageProvider';
import { FileProvider } from './providers/FileProvider';

export const App = () => {
    return (
        <Router>
            <UserProvider>
                <FileProvider>
                    <RetailerProvider>
                        <FabricTypeProvider>
                            <FabricImageProvider>
                                <PatternProvider>
                                    <FabricProvider>
                                        <ProjectProvider>
                                            <Navbar />
                                            <ApplicationViews />
                                        </ProjectProvider>
                                    </FabricProvider>
                                </PatternProvider>
                            </FabricImageProvider>
                        </FabricTypeProvider>
                    </RetailerProvider>
                </FileProvider>
            </UserProvider>
        </Router>
    );
};
