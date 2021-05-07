import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './providers/UserProvider';
import { ApplicationViews } from './ApplicationViews';
import { PatternProvider } from './providers/PatternProvider';
import { FabricProvider } from './providers/FabricProvider';
import { ProjectProvider } from './providers/ProjectProvider';
import { Navbar } from './components/Navbar';
import { RetailerProvider } from './providers/RetailerProvider';
import { CategoryProvider } from './providers/CategoryProvider';
import { FabricTypeProvider } from './providers/FabricTypeProvider';
import { FabricImageProvider } from './providers/FabricImageProvider';
import { FileProvider } from './providers/FileProvider';
import { PublisherProvider } from './providers/PublisherProvider';
import { PatternImageProvider } from './providers/PatternImageProvider';
import { SizeProvider } from './providers/SizeProvider';
import { PatternSizeProvider } from './providers/PatternSizeProvider';
import { ProjectFabricProvider } from './providers/ProjectFabricProvider';
import { ProjectNoteProvider } from './providers/ProjectNoteProvider';

export const App = () => {
    return (
        <Router>
            <UserProvider>
                <FileProvider>
                    <ProjectNoteProvider>
                        <ProjectFabricProvider>
                            <PublisherProvider>
                                <PatternSizeProvider>
                                    <SizeProvider>
                                        <RetailerProvider>
                                            <FabricTypeProvider>
                                                <FabricImageProvider>
                                                    <CategoryProvider>
                                                        <PatternImageProvider>
                                                            <PatternProvider>
                                                                <FabricProvider>
                                                                    <ProjectProvider>
                                                                        <Navbar />
                                                                        <ApplicationViews />
                                                                    </ProjectProvider>
                                                                </FabricProvider>
                                                            </PatternProvider>
                                                        </PatternImageProvider>
                                                    </CategoryProvider>
                                                </FabricImageProvider>
                                            </FabricTypeProvider>
                                        </RetailerProvider>
                                    </SizeProvider>
                                </PatternSizeProvider>
                            </PublisherProvider>
                        </ProjectFabricProvider>
                    </ProjectNoteProvider>
                </FileProvider>
            </UserProvider>
        </Router>
    );
};
