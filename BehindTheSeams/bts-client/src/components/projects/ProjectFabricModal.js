import React, { useState, useContext, useEffect } from 'react';
import { FabricContext } from '../../providers/FabricProvider';
import { ProjectFabricContext } from '../../providers/ProjectFabricProvider';
import { FabricCard } from '../fabric/FabricCard';

export const ProjectFabricModal = ({
    projectFabric,
    setProjectFabric,
    setShowingFabricModal,
    projectId,
}) => {
    const [eligibleFabric, setEligibleFabric] = useState([]);
    const [newFabric, setNewFabric] = useState([]);
    const [fabricSearchTerms, setFabricSearchTerms] = useState('');
    const { getAllFabric } = useContext(FabricContext);
    const { addProjectFabric } = useContext(ProjectFabricContext);

    const handleClickSave = () => {
        newFabric.forEach((f) => {
            addProjectFabric({ fabricId: f.id, projectId });
        });
        setShowingFabricModal(false);
    };

    useEffect(() => {
        getAllFabric().then((apiFabric) => {
            // only want fabric that is NOT currently on the project to appear in the modal
            for (let i = 0; i < apiFabric.length; i++) {
                for (let j = 0; j < projectFabric.length; j++) {
                    if (apiFabric[i].id === projectFabric[j].id) {
                        apiFabric.splice(i, 1);
                    }
                }
            }
            setEligibleFabric(apiFabric);
        });
    }, []);

    useEffect(() => {
        if (fabricSearchTerms.length > 0) {
            let searchResults = [...eligibleFabric];
            searchResults = searchResults.filter((f) => {
                if (
                    f.name
                        .toLowerCase()
                        .includes(fabricSearchTerms.toLowerCase()) ||
                    f.fabricType.name
                        .toLowerCase()
                        .includes(fabricSearchTerms.toLowerCase())
                ) {
                    return f;
                }
            });
            if (searchResults.length > 0) {
                setEligibleFabric(searchResults);
            } else {
                getAllFabric().then((apiFabric) => {
                    // only want fabric that is NOT currently on the project to appear in the modal
                    for (let i = 0; i < apiFabric.length; i++) {
                        for (let j = 0; j < projectFabric.length; j++) {
                            if (apiFabric[i].id === projectFabric[j].id) {
                                apiFabric.splice(i, 1);
                            }
                        }
                    }
                    setEligibleFabric(apiFabric);
                    window.alert('No search results found');
                    setFabricSearchTerms('');
                });
            }
        }

        if (fabricSearchTerms === '') {
            getAllFabric().then((apiFabric) => {
                // only want fabric that is NOT currently on the project to appear in the modal
                for (let i = 0; i < apiFabric.length; i++) {
                    for (let j = 0; j < projectFabric.length; j++) {
                        if (apiFabric[i].id === projectFabric[j].id) {
                            apiFabric.splice(i, 1);
                        }
                    }
                }
                setEligibleFabric(apiFabric);
                setFabricSearchTerms('');
            });
        }
    }, [fabricSearchTerms]);

    return (
        <section className="fabric-modal">
            <div className="fabric-modal__title">Add Fabric</div>
            <div className="fabric-modal__selected-fabric">
                {newFabric.length > 0 && (
                    <>
                        <span>Selected Fabric</span>
                        {newFabric.map((f, i) => (
                            <div className="selected-fabric-item">
                                <i
                                    className="fas fa-times cursorPointer"
                                    onClick={() => {
                                        setNewFabric((prevState) => {
                                            let newState = [...prevState];
                                            newState.splice(i, 1);
                                            return newState;
                                        });
                                    }}
                                ></i>
                                <div className="selected-fabric-item__name">
                                    {f.name}
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
            <div className="project-form__fabric-search-group">
                <i className="fas fa-search"></i>
                <input
                    type="search"
                    name="fabric-search"
                    value={fabricSearchTerms}
                    autoComplete="off"
                    onChange={(evt) => {
                        setFabricSearchTerms(evt.target.value);
                    }}
                />
            </div>
            <div className="fabric-modal__fabric-list">
                {eligibleFabric.length > 0
                    ? eligibleFabric.map((f) => {
                          if (!newFabric.find((pf) => pf.id === f.id)) {
                              return (
                                  <FabricCard
                                      key={f.id}
                                      fabric={f}
                                      projectUse={newFabric}
                                      setProjectFabric={setNewFabric}
                                      setFabricSearchTerms={
                                          setFabricSearchTerms
                                      }
                                  />
                              );
                          }
                      })
                    : null}
            </div>
            <div className="fabric-modal__buttons">
                <button className="button" onClick={handleClickSave}>
                    Save Fabric
                </button>
                <button
                    className="button"
                    onClick={() => setShowingFabricModal(false)}
                >
                    Cancel
                </button>
            </div>
        </section>
    );
};
