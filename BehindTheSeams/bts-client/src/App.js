import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './providers/UserProvider';
import { ApplicationViews } from './ApplicationViews';
import { PatternProvider } from './providers/PatternProvider';
import { FabricProvider } from './providers/FabricProvider';

export const App = () => {
    return (
        <Router>
            <UserProvider>
                <PatternProvider>
                    <FabricProvider>
                        <ApplicationViews />
                    </FabricProvider>
                </PatternProvider>
            </UserProvider>
        </Router>
    );
};
