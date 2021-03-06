import React, { useContext} from 'react';
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

    const deleteProjectFabric = (projectFabricId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${projectFabricId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        );
    };

    return (
        <ProjectFabricContext.Provider
            value={{ addProjectFabric, deleteProjectFabric }}
        >
            {props.children}
        </ProjectFabricContext.Provider>
    );
};
