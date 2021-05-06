import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ProgressCard } from './ProgressCard';
import { ProjectContext } from '../../providers/ProjectProvider';
import '../../styles/Home.css';

export const Home = () => {
    const { projects, getAllProjects } = useContext(ProjectContext);
    const history = useHistory();

    const username = JSON.parse(localStorage.getItem('userProfile')).username;

    useEffect(() => {
        getAllProjects();
    }, []);

    return (
        <main className="home">
            <div className="home__heading">Welcome, {username}!</div>
            <section className="home__controls">
                <button
                    className="button"
                    onClick={() => history.push('/project/add')}
                >
                    Start a New Project
                </button>
                <div className="home__controls-text">or add a...</div>
                <button
                    className="button"
                    onClick={() => history.push('/pattern/add')}
                >
                    New Pattern
                </button>
                <button
                    className="button"
                    onClick={() => history.push('/fabric/add')}
                >
                    New Fabric
                </button>
            </section>
            <img src="/assets/thread.png" alt="page divider" />
            <section className="home__in-progress">
                <div className="home__in-progress-title">In Progress</div>
                <div className="home__in-progress-list">
                    {projects.length > 0 ? (
                        projects.map((p) => {
                            return <ProgressCard project={p} key={p.id} />;
                        })
                    ) : (
                        <h1>No Active Projects Found</h1>
                    )}
                </div>
            </section>
        </main>
    );
};
