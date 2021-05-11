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

    const getCompletedProjects = () => {
        return getToken()
            .then((token) =>
                fetch(`${apiUrl}/complete`, {
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

    const addProject = (project) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(project),
            })
        );
    };

    const updateProject = (project) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${project.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(project),
            })
        );
    };

    return (
        <ProjectContext.Provider
            value={{
                getAllProjects,
                getCompletedProjects,
                getProjectById,
                addProject,
                updateProject,
                projects,
                setProjects,
            }}
        >
            {props.children}
        </ProjectContext.Provider>
    );
};
