import React, { useContext, useEffect } from 'react';
import { FabricContext } from './providers/FabricProvider';
import { PatternContext } from './providers/PatternProvider';
import { UserContext } from './providers/UserProvider';

export const Hello = () => {
    const { getAllUsers, users } = useContext(UserContext);
    const { getAllPatterns, patterns } = useContext(PatternContext);
    const { getAllFabric, fabric } = useContext(FabricContext);
    const currentUser = JSON.parse(localStorage.getItem('userProfile'));

    useEffect(() => {
        getAllUsers().then(getAllPatterns).then(getAllFabric);
    }, []);

    const logging = () => {
        console.log('fabric', fabric);
        console.log('patterns', patterns);
        console.log('users', users);
    };

    return (
        <>
            {fabric.length > 0 &&
                patterns.length > 0 &&
                users.length > 0 &&
                logging()}
            <h1>Hello and welcome, {currentUser.username}!</h1>
        </>
    );
};