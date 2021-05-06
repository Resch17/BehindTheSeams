import React, { useContext, useState } from 'react';
import { UserContext } from './UserProvider';

export const ProjectFabricContext = React.createContext();

export const ProjectFabricProvider = (props) => {
    const { getToken } = useContext(UserContext);

    const apiUrl = '/api/projectFabric';

    const addProjectFabric = (projectFabric) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectFabric),
            })
        );
    };

    return (
        <ProjectFabricContext.Provider value={{ addProjectFabric }}>
            {props.children}
        </ProjectFabricContext.Provider>
    );
};
