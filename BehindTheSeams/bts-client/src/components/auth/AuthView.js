import React from 'react';
import { Login } from './Login';
import { Register } from './Register';
import '../../styles/Auth.css';

export const AuthView = () => {
    return (
        <main className="auth">
            <div className="auth-container">
                <div className="bts-logo">
                    <img src="/assets/logo.png" alt="Behind The Seams Logo" />
                </div>
                <Login />
                <Register />
            </div>
        </main>
    );
};
