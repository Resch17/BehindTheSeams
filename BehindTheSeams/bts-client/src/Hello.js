import React, { useContext, useEffect } from 'react';
import { UserContext } from './providers/UserProvider';

export const Hello = () => {
    const { getAllUsers, users } = useContext(UserContext);

    useEffect(()=>{
        getAllUsers();
    },[])

    return (
        <>
            {console.log(users)}
            <h1>Hello!</h1>
        </>
    );
};
