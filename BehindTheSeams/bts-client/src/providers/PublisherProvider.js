import React, { useContext, useState } from 'react';
import { UserContext } from './UserProvider';

export const PublisherContext = React.createContext();

export const PublisherProvider = (props) => {
    const { getToken } = useContext(UserContext);
    const [publishers, setPublishers] = useState([]);

    const apiUrl = '/api/publisher';

    const getAllPublishers = () => {
        return getToken()
            .then((token) =>
                fetch(apiUrl, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
                })
            )
            .then((res) => res.json())
            .then((parsed) => {
                setPublishers(parsed);
                return parsed;
            });
    };

    return (
        <PublisherContext.Provider value={{ getAllPublishers, publishers }}>
            {props.children}
        </PublisherContext.Provider>
    );
};
