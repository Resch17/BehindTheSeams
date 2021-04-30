import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PatternContext } from '../../providers/PatternProvider';
import '../../styles/Pattern.css';
import { PatternCard } from './PatternCard';

export const PatternList = () => {
    const { patterns, setPatterns, getAllPatterns } = useContext(
        PatternContext
    );

    useEffect(() => {
        getAllPatterns();
    }, []);

    if (patterns.length < 1) {
        return null;
    }

    return (
        <main className="patterns">
            <div className="patterns__top-row">
                <h1>Patterns</h1>
                <button className="button">New Pattern</button>
                <button className="button">Edit/Delete</button>
                <button className="button">Filter List</button>
            </div>
            <div className="patterns__pattern-list">
                {patterns.map((p) => {
                    return <PatternCard pattern={p} key={p.id} />;
                })}
                {patterns.map((p) => {
                    return <PatternCard pattern={p} key={p.id} />;
                })}
                {patterns.map((p) => {
                    return <PatternCard pattern={p} key={p.id} />;
                })}
            </div>
        </main>
    );
};
