import React, { useState, useContext, useEffect } from 'react';
import { FabricTypeContext } from '../../providers/FabricTypeProvider';
import { RetailerContext } from '../../providers/RetailerProvider';

export const FabricFilterModal = ({
    filtering,
    setFiltering,
    currentFabricFilter,
    setCurrentFabricFilter,
    currentStockFilter,
    setCurrentStockFilter,
    currentRetailerFilter,
    setCurrentRetailerFilter,
    currentSort,
    setCurrentSort,
    setShowingModal,
}) => {
    const [currentLoadout, setCurrentLoadout] = useState({
        currentFabricFilter,
        currentStockFilter,
        currentRetailerFilter,
        currentSort,
    });
    const [retailers, setRetailers] = useState([]);
    const [fabricTypes, setFabricTypes] = useState([]);
    const { getAllRetailers } = useContext(RetailerContext);
    const { getAllFabricTypes } = useContext(FabricTypeContext);

    useEffect(() => {
        getAllRetailers().then((parsed) => {
            setRetailers(parsed);
            getAllFabricTypes().then(setFabricTypes);
        });
    }, []);

    const handleSortChange = (evt) => {
        const sort = evt.target.value;
        const updated = { ...currentLoadout };
        updated.currentSort = sort;
        setCurrentLoadout(updated);
    };

    const handleRetailerChange = (evt) => {
        const retailerId = parseInt(evt.target.value);
        const updated = { ...currentLoadout };
        updated.currentRetailerFilter = retailerId;
        setCurrentLoadout(updated);
    };

    const handleFabricTypeChange = (evt) => {
        const fabricType = evt.target.value;
        const updated = { ...currentLoadout };
        updated.currentFabricFilter = fabricType;
        setCurrentLoadout(updated);
    };

    const handleStockChange = (evt) => {
        const stockFilter = evt.target.checked;
        const updated = { ...currentLoadout };
        updated.currentStockFilter = stockFilter;
        setCurrentLoadout(updated);
    };

    const handleClickSave = () => {
        const loadoutToSave = { ...currentLoadout };
        setCurrentFabricFilter(loadoutToSave.currentFabricFilter);
        setCurrentStockFilter(loadoutToSave.currentStockFilter);
        setCurrentRetailerFilter(loadoutToSave.currentRetailerFilter);
        setCurrentSort(loadoutToSave.currentSort);
        setFiltering(true);
        setShowingModal(false);
    };

    return (
        <div className="fabric-filter__modal">
            <div className="fabric-filter">
                <div className="fabric-filter__title">
                    Select Fabric Filter/Sort Options
                </div>
                <div className="fabric-filter__options">
                    <div className="fabric-filter__filters">
                        <div className="fabric-filter__sort-select">
                            <label className="fabric-filter__filter-label">
                                Sort:
                            </label>
                            <select
                                className="fabric-filter__sort"
                                onChange={handleSortChange}
                                value={currentLoadout.currentSort}
                            >
                                <option value="alphaAsc">{'A -> Z'}</option>
                                <option value="alphaDesc">{'Z -> A'}</option>
                                <option value="priceAsc">{'$ -> $$$'}</option>
                                <option value="priceDesc">{'$$$ -> $'}</option>
                            </select>
                        </div>
                        <div className="fabric-filter__retailer-filter">
                            <label
                                htmlFor="retailer-filter"
                                className="fabric-filter__filter-label"
                            >
                                Retailer:
                            </label>
                            <select
                                name="retailer-filter"
                                className="retailer-filter"
                                onChange={handleRetailerChange}
                                value={currentLoadout.currentRetailerFilter}
                            >
                                <option value="0">Select a Retailer</option>
                                {retailers.length > 0
                                    ? retailers
                                          .sort((a, b) =>
                                              a.name.localeCompare(b.name)
                                          )
                                          .map((r) => {
                                              return (
                                                  <option
                                                      key={r.id}
                                                      value={r.id}
                                                  >
                                                      {r.name}
                                                  </option>
                                              );
                                          })
                                    : null}
                            </select>
                        </div>
                        <div className="fabric-filter__fabric-type-filter">
                            <label
                                htmlFor="fabric-type-filter"
                                className="fabric-filter__filter-label"
                            >
                                Fabric type:
                            </label>
                            <select
                                name="fabric-type-filter"
                                className="fabric-type-filter"
                                onChange={handleFabricTypeChange}
                                value={currentLoadout.currentFabricFilter}
                            >
                                <option value="All">
                                    Select a Fabric Type
                                </option>
                                {fabricTypes.length > 0
                                    ? fabricTypes.map((ft) => {
                                          return (
                                              <option
                                                  key={ft.id}
                                                  value={ft.name}
                                              >
                                                  {ft.name}
                                              </option>
                                          );
                                      })
                                    : null}
                            </select>
                        </div>
                        <div className="fabric-filter__stock-filter">
                            <label htmlFor="stock-filter">
                                Show only in-stock?
                            </label>
                            <input
                                type="checkbox"
                                checked={currentLoadout.currentStockFilter}
                                onChange={handleStockChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="fabric-filter__buttons">
                    <button className="button" onClick={handleClickSave}>
                        Save Options
                    </button>
                    <button
                        className="button"
                        onClick={() => {
                            setFiltering(false);
                            setShowingModal(false);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
