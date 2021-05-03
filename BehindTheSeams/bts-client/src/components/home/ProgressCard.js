import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

export const ProgressCard = ({ project }) => {
    const [statusId, setStatusId] = useState(project.projectStatusId);
    const history = useHistory();

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
        <div className="progress-card">
            <div className="progress-card__project-name">
                <Link to={`/project/${project.id}`}>{project.name}</Link>
            </div>
            <div className="progress-card__image-container">
                <Link to={`/project/${project.id}`}>
                    {project.pattern.images.length > 0 ? (
                        <img
                            className="progress-card__image"
                            src={project.pattern.images[0].url}
                            alt="pattern image"
                        />
                    ) : (
                        <img
                            className="progress-card__image"
                            src="/assets/patternPlaceholder.png"
                            alt="pattern image"
                        />
                    )}
                </Link>
            </div>
            <div className="progress-card__fabric">
                {project.fabric[0].name}
            </div>
            <div className="progress-card__bottom">
                <div className="progress-card__status-controls">
                    <div className="progress-card__status-group">
                        <div
                            className="progress-card__status-box"
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
                                    className="progress-card__empty-box"
                                    style={emptyBoxStyle(2)}
                                ></div>
                            )}
                        </div>
                        <div className="progress-card__status-label">
                            Fabric Ordered
                        </div>
                    </div>
                    <div className="progress-card__status-group">
                        <div
                            className="progress-card__status-box"
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
                                    className="progress-card__empty-box"
                                    style={emptyBoxStyle(3)}
                                ></div>
                            )}
                        </div>
                        <div className="progress-card__status-label">
                            Fabric Cut
                        </div>
                    </div>
                    <div className="progress-card__status-group">
                        <div
                            className="progress-card__status-box"
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
                                    className="progress-card__empty-box"
                                    style={emptyBoxStyle(4)}
                                ></div>
                            )}
                        </div>
                        <div className="progress-card__status-label">
                            Sewing Started
                        </div>
                    </div>
                </div>
                <div className="progress-card__size-icon">
                    {project.patternSize.size.abbreviation}
                </div>
            </div>
        </div>
    );
};
