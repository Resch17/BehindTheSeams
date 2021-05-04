import React, { useContext, useState } from 'react';
import { UserContext } from './UserProvider';

export const PatternContext = React.createContext();

export const PatternProvider = (props) => {
    const { getToken } = useContext(UserContext);
    const [patterns, setPatterns] = useState([]);

    const apiUrl = '/api/pattern';

    const getAllPatterns = () => {
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
                setPatterns(parsed);
                return parsed;
            });
    };

    const getPatternById = (id) => {
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

    const deletePattern = (id) => {
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
        <PatternContext.Provider
            value={{ getAllPatterns, getPatternById, deletePattern, patterns, setPatterns }}
        >
            {props.children}
        </PatternContext.Provider>
    );
};
