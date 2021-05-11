import React, { useContext, useState } from 'react';
import { UserContext } from './UserProvider';

export const FabricContext = React.createContext();

export const FabricProvider = (props) => {
    const { getToken } = useContext(UserContext);
    const [fabrics, setFabrics] = useState([]);

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
                setFabrics(parsed);
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
            .then((res) => {
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                return res.json();
            })
            .catch(() => {
                return false;
            });
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

    const updateFabric = (fabric) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${fabric.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fabric),
            })
        );
    };

    const deleteFabric = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        );
    };

    return (
        <FabricContext.Provider
            value={{
                getAllFabric,
                getFabricById,
                addFabric,
                updateFabric,
                deleteFabric,
                fabrics,
                setFabrics,
            }}
        >
            {props.children}
        </FabricContext.Provider>
    );
};
