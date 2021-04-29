import React, { useContext, useEffect } from 'react';
import { FabricContext } from './providers/FabricProvider';
import { PatternContext } from './providers/PatternProvider';
import { UserContext } from './providers/UserProvider';

export const Hello = () => {
    const { getAllUsers, users } = useContext(UserContext);
    const { getAllPatterns, patterns } = useContext(PatternContext);
    const { getAllFabric, fabric } = useContext(FabricContext);
    const currentUser = JSON.parse(localStorage.getItem("userProfile"));

    useEffect(() => {
        getAllUsers().then(getAllPatterns).then(getAllFabric);
    }, []);

    return (
        <>
            {console.log('Users', users)}
            {console.log('Patterns', patterns)}
            {console.log('Fabric', fabric)}
            <h1>Hello and welcome, {currentUser.username}!</h1>
        </>
    );
};
