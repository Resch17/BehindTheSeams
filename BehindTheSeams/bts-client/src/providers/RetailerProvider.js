import React, { useContext, useState } from 'react';
import { UserContext } from './UserProvider';

export const RetailerContext = React.createContext();

export const RetailerProvider = (props) => {
    const { getToken } = useContext(UserContext);
    const [retailers, setRetailers] = useState([]);

    const apiUrl = '/api/retailer';

    const getAllRetailers = () => {
        return getToken()
            .then((token) =>
                fetch(apiUrl, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
                })
            )
            .then((res) => res.json())
            .then((parsed) => {
                setRetailers(parsed);
                return parsed;
            });
    };

    return (
        <RetailerContext.Provider value={{ getAllRetailers, retailers }}>
            {props.children}
        </RetailerContext.Provider>
    );
};
