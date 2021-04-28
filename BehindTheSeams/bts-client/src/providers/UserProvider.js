import React, { createContext, useEffect, useState } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const apiUrl = '/api/user';

    const userProfile = localStorage.getItem('userProfile');
    const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);
    const [users, setUsers] = useState([]);

    const [isFirebaseReady, setIsFirebaseReady] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((u) => {
            setIsFirebaseReady(true);
        });
    }, []);

    const login = (email, pw) => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, pw)
            .then((signInResponse) => getUserProfile(signInResponse.user.uid))
            .then((userProfile) => {
                localStorage.setItem(
                    'userProfile',
                    JSON.stringify(userProfile)
                );
                setIsLoggedIn(true);
            });
    };

    const logout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                localStorage.clear();
                setIsLoggedIn(false);
            });
    };

    const register = (userProfile, password) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(userProfile.email, password)
            .then((createResponse) =>
                saveUser({
                    ...userProfile,
                    firebaseUserId: createResponse.user.uid,
                })
            )
            .then((savedUserProvile) => {
                localStorage.setItem(
                    'userProfile',
                    JSON.stringify(savedUserProvile)
                );
                setIsLoggedIn(true);
            });
    };

    const getToken = () => firebase.auth().currentUser.getIdToken();

    const getUserProfile = (firebaseUserId) => {
        return getToken()
            .then((token) =>
                fetch(`${apiUrl}/${firebaseUserId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json());
    };

    const getAllUsers = () => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then(setUsers)
        );
    };

    const saveUser = (user) => {
        return getToken()
            .then((token) =>
                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                })
            )
            .then((res) => res.json());
    };

    return (
        <UserContext.Provider
            value={{
                isLoggedIn,
                login,
                logout,
                register,
                getToken,
                getAllUsers,
                users
            }}
        >
            {isFirebaseReady ? props.children : <h1>HANG ON</h1>}
        </UserContext.Provider>
    );
};
