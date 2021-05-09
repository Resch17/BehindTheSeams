import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PatternContext } from '../../providers/PatternProvider';
import { CategoryContext } from '../../providers/CategoryProvider';
import { PublisherContext } from '../../providers/PublisherProvider';
import '../../styles/Pattern.css';
import { PatternCard } from './PatternCard';
import { PatternFilterModal } from './PatternFilterModal';

export const PatternList = () => {
    const [modifying, setModifying] = useState(false);
    const [patterns, setPatterns] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerms, setSearchTerms] = useState('');
    const [showingModal, setShowingModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [filtering, setFiltering] = useState(false);
    const [currentCategoryFilter, setCurrentCategoryFilter] = useState(0);
    const [currentPublisherFilter, setCurrentPublisherFilter] = useState(0);
    const [currentSort, setCurrentSort] = useState('alphaAsc');

    const { getAllPatterns } = useContext(PatternContext);
    const { getAllCategories } = useContext(CategoryContext);
    const { getAllPublishers } = useContext(PublisherContext);

    const history = useHistory();

    const sortDisplay = () => {
        let sort;
        if (currentSort === 'alphaAsc') {
            sort = 'A -> Z';
        }
        if (currentSort === 'alphaDesc') {
            sort = 'Z -> A';
        }
        return `, sorted ${sort}`;
    };

    useEffect(() => {
        getAllPatterns()
            .then(setPatterns)
            .then(getAllCategories)
            .then(setCategories)
            .then(getAllPublishers)
            .then(setPublishers);
    }, []);

    useEffect(() => {
        if (!filtering) {
            setCurrentPublisherFilter(0);
            setCurrentCategoryFilter(0);
            setCurrentSort('alphaAsc');
            getAllPatterns().then(setPatterns);
        } else {
            getAllPatterns().then((apiPatterns) => {
                let filteredSortedPatterns = [...apiPatterns];

                if (currentCategoryFilter > 0) {
                    filteredSortedPatterns = filteredSortedPatterns.filter(
                        (p) => {
                            return p.categoryId === currentCategoryFilter;
                        }
                    );
                }
                if (currentPublisherFilter > 0) {
                    filteredSortedPatterns = filteredSortedPatterns.filter(
                        (p) => {
                            return p.publisherId === currentPublisherFilter;
                        }
                    );
                }

                if (currentSort === 'alphaAsc') {
                    filteredSortedPatterns = filteredSortedPatterns.sort(
                        (a, b) => a.name.localeCompare(b.name)
                    );
                } else if (currentSort === 'alphaDesc') {
                    filteredSortedPatterns = filteredSortedPatterns.sort(
                        (b, a) => a.name.localeCompare(b.name)
                    );
                }
                console.log('filtered', filteredSortedPatterns);
                setPatterns(filteredSortedPatterns);
            });
        }
    }, [filtering]);

    useEffect(() => {
        if (patterns.length > 0 && searchTerms.length > 0) {
            let currentPatterns = [...patterns];
            let newPatterns = currentPatterns.filter((p) =>
                p.name.toLowerCase().includes(searchTerms)
            );
            if (newPatterns.length > 0) {
                setPatterns(newPatterns);
            } else {
                setAlertMessage('No results found');
                setTimeout(() => {
                    setAlertMessage('');
                }, 2000);
            }
        } else {
            setFiltering(false);
            getAllPatterns().then(setPatterns);
        }
    }, [searchTerms]);

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
                    Delete Pattern
                </button>
                <button
                    className="button"
                    onClick={() => {
                        if (filtering) {
                            setFiltering(false);
                        } else {
                            setShowingModal(true);
                        }
                    }}
                >
                    {filtering ? 'Reset Filters' : 'Filter List'}
                </button>
                <div className="pattern__search">
                    <i className="fas fa-search"></i>
                    <input
                        type="search"
                        autoComplete="off"
                        onChange={(evt) => {
                            setSearchTerms(evt.target.value.toLowerCase());
                        }}
                    />
                </div>
            </div>
            {alertMessage.length > 0 && (
                <div className="pattern__alert">{alertMessage}</div>
            )}
            {filtering && (
                <div className="project__filter-display">
                    <strong>Showing: </strong>
                    {`${
                        categories.find((c) => c.id === currentCategoryFilter)
                            .name
                    } patterns from `}
                    {currentPublisherFilter > 0
                        ? `${
                              publishers.find(
                                  (p) => p.id === currentPublisherFilter
                              ).name
                          }`
                        : 'all publishers'}
                    {sortDisplay()}
                </div>
            )}
            <div className="patterns__pattern-list">
                {patterns.length > 0 ? (
                    patterns.map((p) => {
                        return (
                            <PatternCard
                                pattern={p}
                                key={p.id}
                                modifying={modifying}
                                setModifying={setModifying}
                                setPatterns={setPatterns}
                            />
                        );
                    })
                ) : (
                    <div className="pattern__pattern-list-empty">
                        No Patterns Found
                    </div>
                )}
            </div>
            {showingModal ? (
                <div className="modal-backdrop">
                    <PatternFilterModal
                        filtering={filtering}
                        setFiltering={setFiltering}
                        currentCategoryFilter={currentCategoryFilter}
                        setCurrentCategoryFilter={setCurrentCategoryFilter}
                        currentPublisherFilter={currentPublisherFilter}
                        setCurrentPublisherFilter={setCurrentPublisherFilter}
                        currentSort={currentSort}
                        setCurrentSort={setCurrentSort}
                        setShowingModal={setShowingModal}
                    />
                </div>
            ) : null}
        </main>
    );
};
