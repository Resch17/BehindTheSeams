import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PatternContext } from '../../providers/PatternProvider';
import '../../styles/Pattern.css';
import { PatternCard } from './PatternCard';

export const PatternList = () => {
    const { patterns, setPatterns, getAllPatterns } = useContext(
        PatternContext
    );
    const [modifying, setModifying] = useState(false);

    const history = useHistory();

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
                <button
                    className="button"
                    onClick={() => history.push('/pattern/add')}
                >
                    New Pattern
                </button>
                <button
                    className="button"
                    onClick={() => setModifying(!modifying)}
                >
                    Delete/Edit
                </button>
                <button className="button">Filter List</button>
            </div>
            <div className="patterns__pattern-list">
                {patterns.map((p) => {
                    return (
                        <PatternCard
                            pattern={p}
                            key={p.id}
                            modifying={modifying}
                            setModifying={setModifying}
                        />
                    );
                })}
            </div>
        </main>
    );
};
