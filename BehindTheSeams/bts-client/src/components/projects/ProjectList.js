import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ProjectContext } from '../../providers/ProjectProvider';
import '../../styles/Project.css';
import { ProjectCard } from './ProjectCard';

export const ProjectList = () => {
    const [viewingActive, setViewingActive] = useState(true);
    const { projects, setProjects, getAllProjects } = useContext(
        ProjectContext
    );

    useEffect(() => {
        getAllProjects();
    }, []);

    if (projects.length < 1) {
        return null;
    }

    return (
        <main className="projects">
            <div className="projects__top-row">
                {viewingActive ? (
                    <h1>Active Projects</h1>
                ) : (
                    <h1>Finished Projects</h1>
                )}
                <button className="button">New Project</button>
                {viewingActive ? (
                    <button className="button">Finished Projects</button>
                ) : (
                    <button className="button">Active Projects</button>
                )}
            </div>
            <div className="projects__project-list">
                {projects.map((p) => (
                    <ProjectCard key={p.id} project={p} />
                ))}
            </div>
        </main>
    );
};
