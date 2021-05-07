import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { ProjectContext } from '../../providers/ProjectProvider';
import { ProjectFabricContext } from '../../providers/ProjectFabricProvider';
import { ProjectNoteContext } from '../../providers/ProjectNoteProvider';
import '../../styles/Project.css';
import { ProjectFabricModal } from './ProjectFabricModal';
import { PatternSizeContext } from '../../providers/PatternSizeProvider';

export const ProjectDetails = () => {
    const [project, setProject] = useState(null);
    const [statusId, setStatusId] = useState(null);
    const [updatedNotes, setUpdatedNotes] = useState([]);
    const [addingNotes, setAddingNotes] = useState(false);
    const [deleteNoteMode, setDeleteNoteMode] = useState(false);
    const [deleteFabricMode, setDeleteFabricMode] = useState(false);
    const [showingFabricModal, setShowingFabricModal] = useState(false);
    const [updatedProjectFabric, setUpdatedProjectFabric] = useState([]);

    const { getAllProjects, getProjectById, updateProject } = useContext(
        ProjectContext
    );
    const { addProjectNote, deleteProjectNote } = useContext(
        ProjectNoteContext
    );
    const { deleteProjectFabric } = useContext(ProjectFabricContext);
    const { id } = useParams();
    const history = useHistory();

    const dateFormatter = (dateTime) => {
        let date = new Date(dateTime);
        return date.toLocaleDateString('en-US');
    };

    const fabricCost = () => {
        let cost = project.fabric[0].pricePerYard * project.patternSize.yards;
        return cost.toFixed(2);
    };

    const highestCheckedBoxStyle = (boxNum) => {
        if (statusId === boxNum) {
            return { cursor: 'pointer' };
        }
    };

    const emptyBoxStyle = (boxNum) => {
        if (statusId === boxNum - 1) {
            return { cursor: 'pointer' };
        }
    };

    const handleBoxClick = (evt) => {
        const clicked = parseInt(evt.target.parentNode.id);
        if (statusId + 1 === clicked) {
            setStatusId(clicked);
        }
        if (statusId === clicked) {
            setStatusId(clicked - 1);
        }
    };

    const initializeProjectState = (apiProject) => {
        setProject(apiProject);
        setStatusId(apiProject.projectStatusId);
        setUpdatedNotes(apiProject.notes);
        setUpdatedProjectFabric(apiProject.fabric);
        setAddingNotes(false);
        setDeleteNoteMode(false);
        setDeleteFabricMode(false);
    };

    const handleAddNote = () => {
        updatedNotes.forEach((n) => {
            if (!n.id) {
                addProjectNote(n).then(() =>
                    getProjectById(id).then((parsed) => {
                        initializeProjectState(parsed);
                    })
                );
            }
        });
    };

    const handleDeleteNote = (noteId) => {
        deleteProjectNote(noteId).then(() => {
            getProjectById(id).then((parsed) => {
                initializeProjectState(parsed);
            });
        });
    };

    const handleProjectFabricDelete = (projectFabricId) => {
        deleteProjectFabric(projectFabricId).then(() => {
            getProjectById(id).then((parsed) => {
                initializeProjectState(parsed);
            });
        });
    };

    useEffect(() => {
        if (id) {
            getProjectById(id)
                .then((parsed) => {
                    initializeProjectState(parsed);
                })
                .catch(() => history.push('/projects'));
        }
    }, []);

    useEffect(() => {
        if (statusId && statusId !== project.projectStatusId) {
            const newProject = { ...project };
            newProject.projectStatusId = statusId;
            if (newProject.projectStatusId === 5) {
                newProject.isComplete = true;
            }
            updateProject(newProject).then(() => {
                getProjectById(id).then((parsed) => {
                    initializeProjectState(parsed);
                });
            });
        }
    }, [statusId]);

    useEffect(() => {
        if (addingNotes) {
            // if no notes exist yet
            if (updatedNotes.length === 0) {
                setUpdatedNotes([{ projectId: parseInt(id), text: '' }]);
                return;
            }

            // check if last "new" note is empty, add another if not
            if (updatedNotes[updatedNotes.length - 1].text.length > 0) {
                setUpdatedNotes((prevState) => {
                    return [
                        ...prevState,
                        { projectId: parseInt(id), text: '' },
                    ];
                });
            }
        }
    }, [addingNotes]);

    useEffect(() => {
        if (!showingFabricModal) {
            getProjectById(id).then((parsed) => {
                initializeProjectState(parsed);
            });
        }
    }, [showingFabricModal]);

    if (!project) {
        return null;
    }

    return (
        <main className="project-details">
            <section className="project-details__top">
                <div className="project-details__title">{project.name}</div>
                <div className="project-details__status-controls">
                    <div className="project-details__status-group">
                        <div
                            className="project-details__status-box"
                            id="2"
                            onClick={handleBoxClick}
                        >
                            {statusId >= 2 ? (
                                <i
                                    className="fas fa-check"
                                    style={highestCheckedBoxStyle(2)}
                                ></i>
                            ) : (
                                <div
                                    className="project-details__empty-box"
                                    style={emptyBoxStyle(2)}
                                ></div>
                            )}
                        </div>
                        <div className="project-details__status-label">
                            Fabric Ordered
                        </div>
                    </div>
                    <div className="project-details__status-group">
                        <div
                            className="project-details__status-box"
                            id="3"
                            onClick={handleBoxClick}
                        >
                            {statusId >= 3 ? (
                                <i
                                    className="fas fa-check"
                                    style={highestCheckedBoxStyle(3)}
                                ></i>
                            ) : (
                                <div
                                    className="project-details__empty-box"
                                    style={emptyBoxStyle(3)}
                                ></div>
                            )}
                        </div>
                        <div className="project-details__status-label">
                            Fabric Cut
                        </div>
                    </div>
                    <div className="project-details__status-group">
                        <div
                            className="project-details__status-box"
                            id="4"
                            onClick={handleBoxClick}
                        >
                            {statusId >= 4 ? (
                                <i
                                    className="fas fa-check"
                                    style={highestCheckedBoxStyle(4)}
                                ></i>
                            ) : (
                                <div
                                    className="project-details__empty-box"
                                    style={emptyBoxStyle(4)}
                                ></div>
                            )}
                        </div>
                        <div className="project-details__status-label">
                            Sewing Started
                        </div>
                    </div>
                </div>
                <img src="/assets/thread.png" alt="page divider" />
            </section>
            <section className="project-details__content">
                <div className="project-details__content-pattern">
                    <div className="project-details__pattern-title">
                        Pattern
                    </div>
                    <div className="project-details__content-pattern-properties">
                        <div className="project-details__pattern-name">
                            <Link to={`/pattern/${project.pattern.id}`}>
                                {project.pattern.name}
                            </Link>
                        </div>
                        <div className="project-details__pattern-size-row">
                            <div className="project-details__size-label">
                                Size:{' '}
                            </div>
                            <div className="project-details__size-icon">
                                {project.patternSize.size.abbreviation}
                            </div>
                        </div>
                        <div className="project-details__pattern-yards">
                            Yards needed: {project.patternSize.yards}
                        </div>
                    </div>
                    <div className="project-details__pattern-image-container">
                        <Link to={`/pattern/${project.pattern.id}`}>
                            <img
                                className="project-details__pattern-image"
                                src={
                                    project.pattern.images.length > 0
                                        ? project.pattern.images[0].url
                                        : '/assets/patternPlaceholder.png'
                                }
                            />
                        </Link>
                    </div>
                </div>
                <div className="project-details__content-center">
                    {project.isComplete ? (
                        <div className="project-details__completed-badge">
                            Project is complete!
                        </div>
                    ) : (
                        <button
                            className="button project-complete-button"
                            id="projectCompleteButton"
                            onClick={() => {
                                if (
                                    window.confirm(
                                        "Are you sure you're done with this project?"
                                    )
                                ) {
                                    setStatusId(5);
                                }
                            }}
                        >
                            Project Complete
                        </button>
                    )}
                    <div className="project-details__start-date">
                        Start date: {dateFormatter(project.createDateTime)}
                    </div>
                    {project.fabric.length > 0 ? (
                        <div className="project-details__fabric-cost">
                            Approx fabric cost: ${fabricCost()}
                        </div>
                    ) : null}
                    {/* <button
                        className="button view-images-button"
                        id="viewImagesButton"
                    >
                        View Images
                    </button> */}
                    <div className="project-details__notes-container">
                        <div className="project-details__notes-top-row">
                            <div className="project-details__notes-title">
                                Notes
                            </div>
                            {!addingNotes && (
                                <div className="project-details__notes-controls">
                                    <i
                                        className="fas fa-plus-circle fa-2x"
                                        onClick={() => setAddingNotes(true)}
                                    ></i>
                                    <i
                                        className="fas fa-trash fa-2x"
                                        onClick={() =>
                                            setDeleteNoteMode(!deleteNoteMode)
                                        }
                                    ></i>
                                </div>
                            )}
                        </div>
                        {addingNotes ? (
                            <div className="project-details__notes-list">
                                {project.notes.length > 0 &&
                                    project.notes.map((n) => (
                                        <div
                                            key={n.id}
                                            className="project-details__note"
                                        >
                                            {deleteNoteMode && (
                                                <i
                                                    className="fas fa-times"
                                                    onClick={() =>
                                                        handleDeleteNote(n.id)
                                                    }
                                                />
                                            )}
                                            {n.text}
                                        </div>
                                    ))}
                                {updatedNotes.map((n, i) => {
                                    if (!n.id) {
                                        return (
                                            <div
                                                className="project-details__new-note"
                                                key={i}
                                            >
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    value={n.text}
                                                    onChange={(evt) => {
                                                        setUpdatedNotes(
                                                            (prevState) => {
                                                                let newState = [
                                                                    ...prevState,
                                                                ];
                                                                newState[
                                                                    i
                                                                ].text =
                                                                    evt.target.value;
                                                                return newState;
                                                            }
                                                        );
                                                    }}
                                                />
                                                <i
                                                    className="fas fa-check"
                                                    onClick={handleAddNote}
                                                ></i>
                                                <i
                                                    className="fas fa-times"
                                                    onClick={() => {
                                                        setUpdatedNotes(
                                                            project.notes
                                                        );
                                                        setAddingNotes(false);
                                                    }}
                                                ></i>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        ) : (
                            <div className="project-details__notes-list">
                                {project.notes.length > 0 ? (
                                    project.notes.map((n) => (
                                        <div
                                            key={n.id}
                                            className="project-details__note"
                                        >
                                            {deleteNoteMode && (
                                                <i
                                                    className="fas fa-times"
                                                    onClick={() =>
                                                        handleDeleteNote(n.id)
                                                    }
                                                />
                                            )}
                                            {n.text}
                                        </div>
                                    ))
                                ) : (
                                    <div
                                        className="project-details__note"
                                        style={{ textAlign: 'center' }}
                                    >
                                        Click the{' '}
                                        <i className="fas fa-plus-circle"></i>{' '}
                                        above to write a note!
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="project-details__content-fabric">
                    <div className="project-details__fabric-top-row">
                        {!project.isComplete && (
                            <i
                                className="fas fa-plus-circle fa-2x"
                                onClick={() => setShowingFabricModal(true)}
                            ></i>
                        )}
                        <div
                            className="project-details__fabric-title"
                            style={{ margin: '0 auto' }}
                        >
                            Fabric
                        </div>
                        {!project.isComplete && (
                            <i
                                className="fas fa-trash fa-2x"
                                onClick={() =>
                                    setDeleteFabricMode(!deleteFabricMode)
                                }
                            ></i>
                        )}
                    </div>
                    <div className="project-details__fabric-list">
                        {project.fabric.length > 0 ? (
                            project.fabric.map((f) => (
                                <div
                                    key={f.id}
                                    className="project-details__fabric-card"
                                >
                                    <div className="project-details__fabric-card-name">
                                        {deleteFabricMode && (
                                            <div
                                                className="project-details__fabric-remove"
                                                style={{ marginTop: '5px' }}
                                            >
                                                <i
                                                    className="fas fa-times-circle fa-2x cursorPointer"
                                                    onClick={() => {
                                                        handleProjectFabricDelete(
                                                            f.projectFabricId
                                                        );
                                                    }}
                                                ></i>
                                            </div>
                                        )}
                                        <Link to={`/fabric/${f.id}`}>
                                            {f.name}
                                        </Link>
                                    </div>
                                    <div className="project-details__fabric-card-image-container">
                                        <Link to={`/fabric/${f.id}`}>
                                            <img
                                                className="project-details__fabric-card-image"
                                                alt="fabric image"
                                                src={
                                                    f.images.length > 0
                                                        ? f.images[0].url
                                                        : '/assets/patternPlaceholder.png'
                                                }
                                            />
                                        </Link>
                                    </div>
                                    <div className="project-details__fabric-card-property project-details__fabric-card-property--type">
                                        Fabric type: {f.fabricType.name}
                                    </div>
                                    <div className="project-details__fabric-card-property project-details__fabric-card-property--price">
                                        Price/yd: ${f.pricePerYard.toFixed(2)}
                                    </div>
                                    <div className="project-details__fabric-card-property project-details__fabric-card-property--yards">
                                        Yds in stock: {f.yardsInStock}
                                    </div>
                                    <div className="project-details__fabric-card-property project-details__fabric-card-property--retailer">
                                        Retailer: {f.retailer.name}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h3 style={{ textAlign: 'center' }}>
                                No fabric selected.
                                <br /> Click{' '}
                                <i className="fas fa-plus-circle"></i> above to
                                add fabric.
                            </h3>
                        )}
                    </div>
                </div>
            </section>
            {showingFabricModal && (
                <div className="project-fabric-modal">
                    <ProjectFabricModal
                        projectFabric={updatedProjectFabric}
                        setProjectFabric={setUpdatedProjectFabric}
                        setShowingFabricModal={setShowingFabricModal}
                        projectId={parseInt(id)}
                    />
                </div>
            )}
        </main>
    );
};
