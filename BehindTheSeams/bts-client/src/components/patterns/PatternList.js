import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PatternContext } from '../../providers/PatternProvider';
import '../../styles/Pattern.css';

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
                    return <h4 key={p.id}>{p.name}</h4>;
                })}
            </div>
        </main>
    );
};
