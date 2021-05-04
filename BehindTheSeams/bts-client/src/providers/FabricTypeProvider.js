import React, { useContext, useState } from 'react';
import { UserContext } from './UserProvider';

export const FabricTypeContext = React.createContext();

export const FabricTypeProvider = (props) => {
    const { getToken } = useContext(UserContext);
    const [fabricTypes, setFabricTypes] = useState([]);

    const apiUrl = '/api/fabricType';

    const getAllFabricTypes = () => {
        return getToken()
            .then((token) =>
                fetch(apiUrl, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
                })
            )
            .then((res) => res.json())
            .then((parsed) => {
                setFabricTypes(parsed);
                return parsed;
            });
    };

    return (
        <FabricTypeContext.Provider value={{ getAllFabricTypes, fabricTypes }}>
            {props.children}
        </FabricTypeContext.Provider>
    );
};
