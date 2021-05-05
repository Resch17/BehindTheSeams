import React, { useContext, useState } from 'react';
import { UserContext } from './UserProvider';

export const FileContext = React.createContext();

export const FileProvider = (props) => {
    const { getToken } = useContext(UserContext);

    const uploadImage = (files) => {
        if (files.length === 0) {
            return;
        }

        let fileToUpload = files[0];
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);

        return getToken().then((token) =>
            fetch('/api/image', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })
        );
    };

    return (
        <FileContext.Provider value={{ uploadImage }}>
            {props.children}
        </FileContext.Provider>
    );
};
