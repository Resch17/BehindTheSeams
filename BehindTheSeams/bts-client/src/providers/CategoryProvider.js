import React, { useState, useContext } from 'react';
import { UserContext } from './UserProvider';

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([]);
    const { getToken } = useContext(UserContext);

    const apiUrl = '/api/category';

    const getAllCategories = () => {
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
                setCategories(parsed);
                return parsed;
            });
    };

    return (
        <CategoryContext.Provider value={{ getAllCategories, categories }}>
            {props.children}
        </CategoryContext.Provider>
    );
};
