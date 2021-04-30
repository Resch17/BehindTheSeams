import React, { useContext, useState } from 'react';
import { UserContext } from './UserProvider';

export const FabricContext = React.createContext();

export const FabricProvider = (props) => {
    const { getToken } = useContext(UserContext);
    const [fabric, setFabric] = useState([]);

    const apiUrl = '/api/fabric';

    const getAllFabric = () => {
        return getToken()
            .then((token) =>
                fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json())
            .then((parsed) => {
                setFabric(parsed);
                return parsed;
            });
    };

    const getFabricById = (id) => {
        return getToken()
            .then((token) =>
                fetch(`${apiUrl}/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json());
    };

    const addFabric = (fabric) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fabric),
            })
        );
    };

    return (
        <FabricContext.Provider
            value={{ getAllFabric, getFabricById, addFabric, fabric }}
        >
            {props.children}
        </FabricContext.Provider>
    );
};
