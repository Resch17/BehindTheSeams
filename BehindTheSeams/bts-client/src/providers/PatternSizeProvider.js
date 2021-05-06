import React, { useContext } from 'react';
import { UserContext } from './UserProvider';

export const PatternSizeContext = React.createContext();

export const PatternSizeProvider = (props) => {
    const { getToken } = useContext(UserContext);

    const apiUrl = '/api/patternSize';

    const getPatternSizesByPatternId = (patternId) => {
        return getToken()
            .then((token) =>
                fetch(`${apiUrl}/${patternId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json());
    };

    const addPatternSize = (patternSize) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patternSize),
            })
        );
    };

    return (
        <PatternSizeContext.Provider value={{ addPatternSize, getPatternSizesByPatternId }}>
            {props.children}
        </PatternSizeContext.Provider>
    );
};
