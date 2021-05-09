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

    const uploadFile = (files) => {
        if (!files) {
            return;
        }

        let fileToUpload = files[0];
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);

        return getToken().then((token) =>
            fetch('/api/file', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })
        );
    };

    const addFile = (file) => {
        return getToken().then((token) =>
            fetch('/api/patternfile', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(file),
            })
        );
    };

    const deleteFile = (fileId) => {
        return getToken().then((token) =>
            fetch(`/api/patternfile/${fileId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        );
    };

    return (
        <FileContext.Provider value={{ uploadImage, uploadFile, addFile, deleteFile }}>
            {props.children}
        </FileContext.Provider>
    );
};
