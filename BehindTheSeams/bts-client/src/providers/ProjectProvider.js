import React, { useContext, useState } from 'react';
import { UserContext } from './UserProvider';

export const ProjectContext = React.createContext();

export const ProjectProvider = (props) => {
    const { getToken } = useContext(UserContext);
    const [projects, setProjects] = useState([]);

    const apiUrl = '/api/project';

    const getAllProjects = () => {
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
                setProjects(parsed);
                return parsed;
            });
    };

    const getProjectById = (id) => {
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

    return (
        <ProjectContext.Provider
            value={{ getAllProjects, getProjectById, projects, setProjects }}
        >
            {props.children}
        </ProjectContext.Provider>
    );
};
