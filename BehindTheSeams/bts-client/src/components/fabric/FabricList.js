import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FabricContext } from '../../providers/FabricProvider';
import { RetailerContext } from '../../providers/RetailerProvider';
import '../../styles/Fabric.css';
import { FabricCard } from './FabricCard';
import { FabricFilterModal } from './FabricFilterModal';

export const FabricList = () => {
    const [modifying, setModifying] = useState(false);
    const [fabrics, setFabrics] = useState([]);
    const [retailers, setRetailers] = useState([]);
    const [searchTerms, setSearchTerms] = useState('');
    const [showingModal, setShowingModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [filtering, setFiltering] = useState(false);
    const [currentFabricFilter, setCurrentFabricFilter] = useState('All');
    const [currentStockFilter, setCurrentStockFilter] = useState(false);
    const [currentSort, setCurrentSort] = useState('priceAsc');
    const [currentRetailerFilter, setCurrentRetailerFilter] = useState(0);
    const { getAllFabric } = useContext(FabricContext);
    const { getAllRetailers } = useContext(RetailerContext);

    useEffect(() => {
        getAllRetailers().then(setRetailers);
    }, []);

    useEffect(() => {
        if (!filtering) {
            setCurrentFabricFilter('All');
            setCurrentStockFilter(false);
            setCurrentRetailerFilter(0);
            setCurrentSort('alphaAsc');
            getAllFabric().then(setFabrics);
        } else {
            getAllFabric().then((apiFabrics) => {
                let filteredSortedFabrics = [...apiFabrics];

                if (currentFabricFilter !== 'All') {
                    filteredSortedFabrics = apiFabrics.filter(
                        (f) => f.fabricType.name === currentFabricFilter
                    );
                }

                if (currentStockFilter) {
                    filteredSortedFabrics = filteredSortedFabrics.filter(
                        (f) => f.yardsInStock > 0
                    );
                }

                if (currentRetailerFilter > 0) {
                    filteredSortedFabrics = filteredSortedFabrics.filter(
                        (f) => {
                            return f.retailerId === currentRetailerFilter;
                        }
                    );
                }

                if (currentSort === 'alphaAsc') {
                    filteredSortedFabrics = filteredSortedFabrics.sort((a, b) =>
                        a.name.localeCompare(b.name)
                    );
                } else if (currentSort === 'alphaDesc') {
                    filteredSortedFabrics = filteredSortedFabrics.sort((b, a) =>
                        a.name.localeCompare(b.name)
                    );
                } else if (currentSort === 'priceAsc') {
                    filteredSortedFabrics = filteredSortedFabrics.sort(
                        (a, b) => a.pricePerYard - b.pricePerYard
                    );
                } else if (currentSort === 'priceDesc') {
                    filteredSortedFabrics = filteredSortedFabrics.sort(
                        (b, a) => a.pricePerYard - b.pricePerYard
                    );
                }
                console.log('filtered', filteredSortedFabrics);
                setFabrics(filteredSortedFabrics);
            });
        }
    }, [filtering]);

    useEffect(() => {
        if (fabrics.length > 0 && searchTerms.length > 0) {
            let currentFabrics = [...fabrics];
            let newFabrics = currentFabrics.filter((f) =>
                f.name.toLowerCase().includes(searchTerms)
            );
            if (newFabrics.length > 0) {
                setFabrics(newFabrics);
            } else {
                setAlertMessage('No results found');
                setTimeout(() => {
                    setAlertMessage('');
                }, 2000);
            }
        } else {
            setFiltering(false);
            getAllFabric().then(setFabrics);
        }
    }, [searchTerms]);

    const sortDisplay = () => {
        let sort;
        if (currentSort === 'alphaAsc') {
            sort = 'A -> Z';
        }
        if (currentSort === 'alphaDesc') {
            sort = 'Z -> A';
        }
        if (currentSort === 'priceAsc') {
            sort = '$ -> $$$';
        }
        if (currentSort === 'priceDesc') {
            sort = '$$$ -> $';
        }
        return `, sorted ${sort}`;
    };

    return (
        <main className="fabric">
            <div className="fabric__top-row">
                <h1>Fabric</h1>
                <button className="button">New Fabric</button>

                <button
                    className="button"
                    onClick={() => setModifying(!modifying)}
                >
                    Delete/Edit
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
                <div className="fabric__search">
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
                <div className="fabric__alert">{alertMessage}</div>
            )}
            {filtering && (
                <div className="fabric__filter-display">
                    <strong>Showing: </strong>
                    {`${currentFabricFilter} fabric from `}
                    {currentRetailerFilter > 0
                        ? `${
                              retailers.find(
                                  (r) => r.id === currentRetailerFilter
                              ).name
                          }`
                        : 'all retailers'}
                    {currentStockFilter && ' (in-stock only)'}
                    {sortDisplay()}
                </div>
            )}
            <div className="fabric__fabric-list">
                {fabrics.length > 0 ? (
                    fabrics.map((f) => (
                        <FabricCard
                            key={f.id}
                            fabric={f}
                            modifying={modifying}
                            setModifying={setModifying}
                        />
                    ))
                ) : (
                    <div className="fabric__fabric-list-empty">
                        No Fabric Found
                    </div>
                )}
            </div>
            {showingModal ? (
                <FabricFilterModal
                    filtering={filtering}
                    setFiltering={setFiltering}
                    currentFabricFilter={currentFabricFilter}
                    setCurrentFabricFilter={setCurrentFabricFilter}
                    currentStockFilter={currentStockFilter}
                    setCurrentStockFilter={setCurrentStockFilter}
                    currentRetailerFilter={currentRetailerFilter}
                    setCurrentRetailerFilter={setCurrentRetailerFilter}
                    currentSort={currentSort}
                    setCurrentSort={setCurrentSort}
                    setShowingModal={setShowingModal}
                />
            ) : null}
        </main>
    );
};
