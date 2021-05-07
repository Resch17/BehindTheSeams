import React, { useState, useContext, useEffect } from 'react';
import { PublisherContext } from '../../providers/PublisherProvider';
import { CategoryContext } from '../../providers/CategoryProvider';

export const PatternFilterModal = ({
    filtering,
    setFiltering,
    currentCategoryFilter,
    setCurrentCategoryFilter,
    currentPublisherFilter,
    setCurrentPublisherFilter,
    currentSort,
    setCurrentSort,
    setShowingModal,
}) => {
    const [currentLoadout, setCurrentLoadout] = useState({
        currentPublisherFilter,
        currentCategoryFilter,
        currentSort,
    });
    const [publishers, setPublishers] = useState([]);
    const [categories, setCategories] = useState([]);

    const { getAllCategories } = useContext(CategoryContext);
    const { getAllPublishers } = useContext(PublisherContext);

    useEffect(() => {
        getAllPublishers()
            .then(setPublishers)
            .then(getAllCategories)
            .then(setCategories);
    }, []);

    const handleSortChange = (evt) => {
        const sort = evt.target.value;
        const updated = { ...currentLoadout };
        updated.currentSort = sort;
        setCurrentLoadout(updated);
    };

    const handleCategoryChange = (evt) => {
        const categoryId = parseInt(evt.target.value);
        const updated = { ...currentLoadout };
        updated.currentCategoryFilter = categoryId;
        setCurrentLoadout(updated);
    };

    const handlePublisherChange = (evt) => {
        const publisherId = parseInt(evt.target.value);
        const updated = { ...currentLoadout };
        updated.currentPublisherFilter = publisherId;
        setCurrentLoadout(updated);
    };

    const handleClickSave = () => {
        const loadoutToSave = { ...currentLoadout };
        setCurrentCategoryFilter(loadoutToSave.currentCategoryFilter);
        setCurrentPublisherFilter(loadoutToSave.currentPublisherFilter);
        setCurrentSort(loadoutToSave.currentSort);
        setFiltering(true);
        setShowingModal(false);
    };

    return (
        <div className="pattern-filter__modal">
            <div className="pattern-filter">
                <div className="pattern-filter__title">
                    Set Pattern Filter/Sort Options
                </div>
                <div className="pattern-filter__options">
                    <div className="pattern-filter__filters">
                        <div className="pattern-filter__sort-select">
                            <label className="pattern-filter__filter-label">
                                Sort:
                            </label>
                            <select
                                className="pattern-filter__sort"
                                onChange={handleSortChange}
                                value={currentLoadout.currentSort}
                            >
                                <option value="alphaAsc">{'A -> Z'}</option>
                                <option value="alphaDesc">{'Z -> A'}</option>
                            </select>
                        </div>
                        <div className="pattern-filter__category-filter">
                            <label
                                htmlFor="category-filter"
                                className="pattern-filter__filter-label"
                            >
                                Category:{' '}
                            </label>
                            <select
                                name="category-filter"
                                className="category-filter"
                                onChange={handleCategoryChange}
                                value={currentLoadout.currentCategoryFilter}
                            >
                                <option value="0">Select a Category</option>
                                {categories.length > 0
                                    ? categories
                                          .sort((a, b) =>
                                              a.name.localeCompare(b.name)
                                          )
                                          .map((c) => {
                                              return (
                                                  <option
                                                      key={c.id}
                                                      value={c.id}
                                                  >
                                                      {c.name}
                                                  </option>
                                              );
                                          })
                                    : null}
                            </select>
                        </div>
                        <div className="pattern-filter__publisher-filter">
                            <label
                                htmlFor="publisher-filter"
                                className="pattern-filter__filter-label"
                            >
                                Publisher:{' '}
                            </label>
                            <select
                                name="publisher-filter"
                                className="publisher-filter"
                                onChange={handlePublisherChange}
                                value={currentLoadout.currentPublisherFilter}
                            >
                                <option value="0">Select a Publisher</option>
                                {publishers.length > 0
                                    ? publishers
                                          .sort((a, b) =>
                                              a.name.localeCompare(b.name)
                                          )
                                          .map((p) => {
                                              return (
                                                  <option
                                                      key={p.id}
                                                      value={p.id}
                                                  >
                                                      {p.name}
                                                  </option>
                                              );
                                          })
                                    : null}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="pattern-filter__buttons">
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
