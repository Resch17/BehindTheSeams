import React, { useContext } from 'react';
import { UserContext } from './UserProvider';

export const FabricImageContext = React.createContext();

export const FabricImageProvider = (props) => {
    const { getToken } = useContext(UserContext);

    const apiUrl = '/api/fabricImage';

    const addFabricImage = (fabricImage) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fabricImage),
            })
        )
    };

    return (
        <FabricImageContext.Provider value={{ addFabricImage }}>
            {props.children}
        </FabricImageContext.Provider>
    );
};
