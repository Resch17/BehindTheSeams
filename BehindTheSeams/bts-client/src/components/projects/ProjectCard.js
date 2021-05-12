import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ProjectContext } from '../../providers/ProjectProvider';
import '../../styles/Project.css';

export const ProjectCard = ({ project, setProjects }) => {
    const [statusId, setStatusId] = useState(project.projectStatusId);
    const { updateProject, getAllProjects } = useContext(ProjectContext);
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

    useEffect(() => {
        if (statusId > 0) {
            const newProject = { ...project };
            newProject.projectStatusId = statusId;
            if (newProject.projectStatusId === 5) {
                newProject.isComplete = true;
            }
            updateProject(newProject).then(getAllProjects).then(setProjects);
        }
    }, [statusId]);

    return (
        <div className="project-card">
            <div className="project-card__image-container">
                <Link to={`/project/${project.id}`}>
                    {project.pattern.images.length > 0 ? (
                        <img
                            className="project-card__image"
                            src={project.pattern.images[0].url}
                            alt={`${project.pattern.name}`}
                        />
                    ) : (
                        <img
                            className="project-card__image"
                            src="/assets/patternPlaceholder.png"
                            alt="Pattern placeholder"
                        />
                    )}
                </Link>
            </div>
            <div className="project-card__controls">
                {!project.isComplete && (
                    <>
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
                            <div className="project-card__status-label">
                                Fabric Cut
                            </div>
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
                    </>
                )}
            </div>
            <div className="project-card__content">
                <div className="project-card__title">
                    <div>
                        <Link to={`/project/${project.id}`}>
                            {project.name}
                        </Link>
                    </div>
                </div>
                <div className="project-card__property project-card__pattern">
                    <Link to={`/pattern/${project.pattern.id}`}>
                        Pattern: {project.pattern.name}
                    </Link>
                </div>
                <div className="project-card__property project-card__fabric">
                    {project.fabric.length > 0 ? (
                        <Link to={`/fabric/${project.fabric[0].id}`}>
                            {project.fabric.length > 1
                                ? `Fabric: ${project.fabric[0].name} + ${
                                      project.fabric.length - 1
                                  } more`
                                : `Fabric: ${project.fabric[0].name}`}
                        </Link>
                    ) : (
                        'No Fabric Selected'
                    )}
                </div>
                {project.fabric.length > 0 && (
                    <div className="project-card__property project-card__cost">
                        Approx. fabric cost: ${fabricCost().toFixed(2)}
                    </div>
                )}
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
