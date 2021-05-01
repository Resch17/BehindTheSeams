import React from 'react';
import { useHistory } from 'react-router-dom';

export const ProjectCard = ({ project }) => {
    const history = useHistory();

    const dateFormatter = (dateTime) => {
        let date = new Date(dateTime);
        return date.toLocaleDateString('en-US');
    };

    const fabricCost = () => {
        return project.fabric[0].pricePerYard * project.patternSize.yards;
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
                    <div className="project-card__status-box">
                        {project.projectStatusId >= 2 ? (
                            <i className="fas fa-check"></i>
                        ) : null}
                    </div>
                    <div className="project-card__status-label">
                        Fabric Ordered
                    </div>
                </div>
                <div className="project-card__status-group">
                    <div className="project-card__status-box">
                        {project.projectStatusId >= 3 ? (
                            <i className="fas fa-check"></i>
                        ) : null}
                    </div>
                    <div className="project-card__status-label">Fabric Cut</div>
                </div>
                <div className="project-card__status-group">
                    <div className="project-card__status-box">
                        {project.projectStatusId >= 4 ? (
                            <i className="fas fa-check"></i>
                        ) : null}
                    </div>
                    <div className="project-card__status-label">
                        Sewing Started
                    </div>
                </div>
                <button
                    className="button"
                    style={{
                        backgroundColor: 'var(--dark-color2)',
                        color: 'var(--light-color2)',
                        fontSize: '16px',
                    }}
                >
                    Project Complete
                </button>
            </div>
            <div className="project-card__content">
                <div className="project-card__title">{project.name}</div>
                <div className="project-card__properties">
                    <div className="project-card__properties-left">
                        <div className="project-card__property">
                            Pattern: {project.pattern.name}
                        </div>
                        <div className="project-card__property">
                            {project.fabric.length > 1
                                ? `Fabric: ${project.fabric[0].name} + ${
                                      project.fabric.length - 1
                                  } more`
                                : `Fabric: ${project.fabric[0].name}`}
                        </div>
                        <div className="project-card__property">
                            Approx. fabric cost: ${fabricCost().toFixed(2)}
                        </div>
                    </div>
                    <div className="project-card__properties-right">
                        <div className="project-card__size">
                            <div className="project-card__size-label">
                                Size:{' '}
                            </div>
                            <div className="project-card__size-icon">
                                {project.patternSize.size.abbreviation}
                            </div>
                        </div>
                        <div className="project-card__property--date">
                            {dateFormatter(project.createDateTime)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
