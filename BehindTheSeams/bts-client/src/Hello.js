import React, { useContext, useEffect } from 'react';
import { PatternContext } from './providers/PatternProvider';
import { UserContext } from './providers/UserProvider';

export const Hello = () => {
    const { getAllUsers, users } = useContext(UserContext);
    const {getAllPatterns, patterns} = useContext(PatternContext);

    useEffect(()=>{
        getAllUsers().then(getAllPatterns());
    },[])

    return (
        <>
            {console.log(users)}
            {console.log(patterns)}
            <h1>Hello!</h1>
        </>
    );
};
