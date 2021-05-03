import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../styles/Project.css';

export const ProjectCard = ({ project }) => {
    const [statusId, setStatusId] = useState(project.projectStatusId);
    const history = useHistory();

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

    return (
        <div className="project-card">
            <div className="project-card__image-container">
                {project.pattern.images.length > 0 ? (
                    <img
                        className="project-card__image"
                        src={project.pattern.images[0].url}
                    />
                ) : (
                    <img
                        className="project-card__image"
                        src="./assets/patternPlaceholder.png"
                    />
                )}
            </div>
            <div className="project-card__controls">
                <div className="project-card__status-group">
                    <div
                        className="project-card__status-box"
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
                                className="project-card__empty-box"
                                style={emptyBoxStyle(2)}
                            ></div>
                        )}
                    </div>
                    <div className="project-card__status-label">
                        Fabric Ordered
                    </div>
                </div>
                <div className="project-card__status-group">
                    <div
                        className="project-card__status-box"
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
                                className="project-card__empty-box"
                                style={emptyBoxStyle(3)}
                            ></div>
                        )}
                    </div>
                    <div className="project-card__status-label">Fabric Cut</div>
                </div>
                <div className="project-card__status-group">
                    <div
                        className="project-card__status-box"
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
                                className="project-card__empty-box"
                                style={emptyBoxStyle(4)}
                            ></div>
                        )}
                    </div>
                    <div className="project-card__status-label">
                        Sewing Started
                    </div>
                </div>
                <button
                    className="button project-complete-button"
                    id="projectCompleteButton"
                    style={{}}
                >
                    Project Complete
                </button>
            </div>
            <div className="project-card__content">
                <div className="project-card__title">
                    <div>{project.name}</div>
                </div>
                <div className="project-card__property project-card__pattern">
                    Pattern: {project.pattern.name}
                </div>
                <div className="project-card__property project-card__fabric">
                    {project.fabric.length > 1
                        ? `Fabric: ${project.fabric[0].name} + ${
                              project.fabric.length - 1
                          } more`
                        : `Fabric: ${project.fabric[0].name}`}
                </div>
                <div className="project-card__property project-card__cost">
                    Approx. fabric cost: ${fabricCost().toFixed(2)}
                </div>
                <div className="project-card__size">
                    <div className="project-card__size-label">Size: </div>
                    <div className="project-card__size-icon">
                        {project.patternSize.size.abbreviation}
                    </div>
                </div>
                <div className="project-card__date project-card__property">
                    Start date: {dateFormatter(project.createDateTime)}
                </div>
            </div>
        </div>
    );
};
