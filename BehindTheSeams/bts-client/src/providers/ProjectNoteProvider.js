import React, { useContext } from 'react';
import { UserContext } from './UserProvider';

export const ProjectNoteContext = React.createContext();

export const ProjectNoteProvider = (props) => {
    const { getToken } = useContext(UserContext);

    const apiUrl = '/api/projectNote';

    const addProjectNote = (projectNote) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectNote),
            })
        );
    };

    const deleteProjectNote = (projectNoteId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${projectNoteId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        );
    };

    return (
        <ProjectNoteContext.Provider
            value={{ addProjectNote, deleteProjectNote }}
        >
            {props.children}
        </ProjectNoteContext.Provider>
    );
};
