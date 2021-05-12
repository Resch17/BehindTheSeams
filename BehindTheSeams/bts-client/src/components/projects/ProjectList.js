import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ProjectContext } from '../../providers/ProjectProvider';
import '../../styles/Project.css';
import { ProjectCard } from './ProjectCard';

export const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [completeProjects, setCompleteProjects] = useState([]);
    const [viewingActive, setViewingActive] = useState(true);
    const { getAllProjects, getCompletedProjects } = useContext(ProjectContext);
    const history = useHistory();

    useEffect(() => {
        getAllProjects().then(setProjects);
    }, []);

    useEffect(() => {
        if (!viewingActive) {
            getCompletedProjects().then(setCompleteProjects);
        } else {
            getAllProjects().then(setProjects);
        }
    }, [viewingActive]);

    return (
        <main className="projects">
            <div className="projects__top-row">
                {viewingActive ? (
                    <h1>Active Projects</h1>
                ) : (
                    <h1>Finished Projects</h1>
                )}
                <button
                    className="button"
                    onClick={() => history.push('/project/add')}
                >
                    New Project
                </button>
                {viewingActive ? (
                    <button
                        className="button"
                        onClick={() => setViewingActive(false)}
                    >
                        Finished Projects
                    </button>
                ) : (
                    <button
                        className="button"
                        onClick={() => setViewingActive(true)}
                    >
                        Active Projects
                    </button>
                )}
            </div>
            <div className="projects__project-list">
                {viewingActive ? (
                    projects.length > 0 ? (
                        projects.map((p) => (
                            <ProjectCard
                                key={p.id}
                                project={p}
                                setProjects={setProjects}
                            />
                        ))
                    ) : (
                        <h1>No Projects Found</h1>
                    )
                ) : (
                    completeProjects.map((p) => (
                        <ProjectCard
                            key={p.id}
                            project={p}
                        />
                    ))
                )}
            </div>
        </main>
    );
};
