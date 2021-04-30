import React, { useContext, useEffect } from 'react';
import { FabricContext } from './providers/FabricProvider';
import { PatternContext } from './providers/PatternProvider';
import { ProjectContext } from './providers/ProjectProvider';
import { UserContext } from './providers/UserProvider';

export const Hello = () => {
    const { getAllUsers, users } = useContext(UserContext);
    const { getAllPatterns, patterns } = useContext(PatternContext);
    const { getAllFabric, fabrics } = useContext(FabricContext);
    const { getAllProjects, projects} = useContext(ProjectContext);
    const currentUser = JSON.parse(localStorage.getItem('userProfile'));

    useEffect(() => {
        getAllUsers().then(getAllPatterns).then(getAllFabric).then(getAllProjects);
    }, []);

    const logging = () => {
        console.log('fabric', fabrics);
        console.log('patterns', patterns);
        console.log('users', users);
        console.log('projects', projects);
    };

    return (
        <>
            {fabrics.length > 0 &&
                patterns.length > 0 &&
                users.length > 0 &&
                logging()}
            <h1>Hello and welcome, {currentUser.username}!</h1>
        </>
    );
};
