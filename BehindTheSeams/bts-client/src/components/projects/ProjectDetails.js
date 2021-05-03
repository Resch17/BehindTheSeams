import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectContext } from '../../providers/ProjectProvider';
import '../../styles/Project.css';

export const ProjectDetails = () => {
    const [project, setProject] = useState(null);
    const [statusId, setStatusId] = useState(null);
    const { getProjectById } = useContext(ProjectContext);
    const { id } = useParams();

    const dateFormatter = (dateTime) => {
        let date = new Date(dateTime);
        return date.toLocaleDateString('en-US');
    };

    const fabricCost = () => {
        return project.fabric[0].pricePerYard * project.patternSize.yards;
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

    useEffect(() => {
        if (id) {
            getProjectById(id).then((parsed) => {
                setProject(parsed);
                setStatusId(parsed.projectStatusId);
            });
        }
    }, []);

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
                            id="2"
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
                            id="2"
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
                <img src="/assets/thread.png" alt="page-divider" />
            </section>
            <section className="project-details__content">
                <div className="project-details__content-pattern">
                    <div className="project-details__pattern-title">
                        Pattern
                    </div>
                    <div className="project-details__pattern-name">
                        {project.pattern.name}
                    </div>
                    <div className="project-details__pattern-size-row">
                        <div className="project-detalis__size-label">
                            Size:{' '}
                        </div>
                        <div className="project-details__size-icon">
                            {project.patternSize.size.abbreviation}
                        </div>
                    </div>
                    <div className="project-details__pattern-yards">
                        Yards needed: {project.patternSize.yards}
                    </div>
                    <div className="project-details__pattern-image-container">
                        <img
                            className="project-details__pattern-image"
                            src={
                                project.pattern.images.length > 0
                                    ? project.pattern.images[0].url
                                    : '/assets/patternPlaceholder.png'
                            }
                        />
                    </div>
                </div>
                <div className="project-details__content-center">
                    <button
                        className="button project-complete-button"
                        id="projectCompleteButton"
                    >
                        Project Complete
                    </button>
                    <div className="project-details__start-date">
                        Start date: {dateFormatter(project.createDateTime)}
                    </div>
                    <div className="project-details__fabric-cost">
                        Approx fabric cost: ${fabricCost()}
                    </div>
                    <button
                        className="button view-images-button"
                        id="viewImagesButton"
                    >
                        View Images
                    </button>
                    <div className="project-details__notes-container">
                        <div className="project-details__notes-top-row">
                            <div className="project-details__notes-title">
                                Notes
                            </div>
                            <div className="project-details__notes-controls">
                                <i className="fas fa-plus-circle fa-2x"></i>
                                <i className="fas fa-trash fa-2x"></i>
                                <i className="fas fa-pencil-alt fa-2x"></i>
                            </div>
                        </div>
                        <div className="project-details__notes-list">
                            {project.notes.length > 0 &&
                                project.notes.map((n) => (
                                    <div
                                        key={n.id}
                                        className="project-details__note"
                                    >
                                        {n.text}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div className="project-details__content-fabric">
                    <div className="project-details__fabric-top-row">
                        <i className="fas fa-plus-circle fa-2x"></i>
                        <div className="project-details__fabric-title">
                            Fabric
                        </div>
                        <i className="fas fa-trash fa-2x"></i>
                    </div>
                    <div className="project-details__fabric-list">
                        {project.fabric.length > 0 &&
                            project.fabric.map((f) => (
                                <div
                                    key={f.id}
                                    className="project-details__fabric-card"
                                >
                                    <div className="project-details__fabric-card-name">
                                        {f.name}
                                    </div>
                                    <div className="project-details__fabric-card-content">
                                        <div className="project-details__fabric-card-image-container">
                                            <img
                                                className="project-details__fabric-card-image"
                                                alt="fabric image"
                                                src={
                                                    f.images.length > 0
                                                        ? f.images[0].url
                                                        : '/assets/patternPlaceholder.png'
                                                }
                                            />
                                        </div>
                                        <div className="project-details__fabric-card-properties">
                                            <div className="project-details__fabric-card-property">
                                                Fabric type: {f.fabricType.name}
                                            </div>
                                            <div className="project-details__fabric-card-property">
                                                Price/yd: {f.pricePerYard}
                                            </div>
                                            <div className="project-details__fabric-card-property">
                                                Yds in stock: {f.yardsInStock}
                                            </div>
                                            <div className="project-details__fabric-card-property">
                                                Retailer: {f.retailer.name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>
        </main>
    );
};
