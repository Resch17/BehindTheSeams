import React, { useContext, useState } from 'react';
import { UserContext } from './UserProvider';

export const PatternImageContext = React.createContext();

export const PatternImageProvider = (props) => {
    const { getToken } = useContext(UserContext);

    const apiUrl = '/api/patternImage';

    const addPatternImage = (patternImage) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patternImage),
            })
        );
    };

    return (
        <PatternImageContext.Provider value={{ addPatternImage }}>
            {props.children}
        </PatternImageContext.Provider>
    );
};
