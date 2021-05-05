import React, { useState, useContext } from 'react';
import { UserContext } from './UserProvider';

export const SizeContext = React.createContext();

export const SizeProvider = (props) => {
    const { getToken } = useContext(UserContext);
    const [sizes, setSizes] = useState([]);

    const apiUrl = '/api/size';

    const getAllSizes = () => {
        return getToken()
            .then((token) =>
                fetch(apiUrl, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
                })
            )
            .then((res) => res.json())
            .then((parsed) => {
                setSizes(parsed);
                return parsed;
            });
    };

    return (
        <SizeContext.Provider value={{ getAllSizes, sizes }}>
            {props.children}
        </SizeContext.Provider>
    );
};
