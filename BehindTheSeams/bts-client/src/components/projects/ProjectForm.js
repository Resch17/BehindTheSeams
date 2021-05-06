import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CategoryContext } from '../../providers/CategoryProvider';
import { FabricContext } from '../../providers/FabricProvider';
import { PatternContext } from '../../providers/PatternProvider';
import { PatternSizeContext } from '../../providers/PatternSizeProvider';
import { ProjectFabricContext } from '../../providers/ProjectFabricProvider';
import { PatternCard } from '../patterns/PatternCard';

export const ProjectForm = () => {
    const [project, setProject] = useState({
        name: '',
        patternId: 0,
        patternSizeId: 0,
    });
    const [patterns, setPatterns] = useState([]);
    const [categories, setCategories] = useState([]);
    const [patternFilter, setPatternFilter] = useState(0);
    const [fabrics, setFabrics] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [selectedPattern, setSelectedPattern] = useState({});
    const [selectedSize, setSelectedSize] = useState({ id: 0 });
    const [projectFabricIds, setProjectFabricIds] = useState([]);
    const { getAllPatterns, getPatternById } = useContext(PatternContext);
    const { getAllFabric } = useContext(FabricContext);
    const { addProjectFabric } = useContext(ProjectFabricContext);
    const { getPatternSizesByPatternId } = useContext(PatternSizeContext);
    const { getAllCategories } = useContext(CategoryContext);

    const handleClearForm = () => {
        setProject({ name: '', patternId: 0, patternSizeId: 0 });
        setSelectedSize({ id: 0 });
        setSelectedPattern({});
        setProjectFabricIds([]);
        setPatternFilter(0);
    };

    useEffect(() => {
        getAllCategories()
            .then(setCategories)
            .then(getAllPatterns)
            .then(setPatterns)
            .then(getAllFabric)
            .then(setFabrics);
    }, []);

    useEffect(() => {
        if (project.patternId > 0) {
            setSelectedPattern(
                patterns.find((p) => p.id === project.patternId)
            );
            getPatternSizesByPatternId(project.patternId).then(setSizes);
        }
    }, [project.patternId]);

    useEffect(() => {
        if (project.patternSizeId > 0) {
            setSelectedSize(
                sizes.find((ps) => ps.id === project.patternSizeId)
            );
        }
    }, [project.patternSizeId]);

    useEffect(() => {
        if (patternFilter > 0) {
            getAllPatterns().then((parsed) => {
                setPatterns(
                    parsed.filter((p) => p.categoryId === patternFilter)
                );
            });
        } else {
            getAllPatterns().then(setPatterns);
        }
    }, [patternFilter]);

    return (
        <main className="project-form">
            <div className="project-form__title">New Project</div>
            <div className="project-form__form-group">
                <label htmlFor="project-name">Project Name</label>
                <input
                    type="text"
                    autoComplete="off"
                    required
                    onChange={(evt) => {
                        setProject((prevState) => {
                            return { ...prevState, name: evt.target.value };
                        });
                    }}
                />
            </div>
            {project.patternId > 0 ? (
                <div className="project-form__selected-pattern">
                    Selected pattern:
                </div>
            ) : (
                <>
                    <div className="project-form__section-title">
                        Select a Pattern
                    </div>
                    <div className="project-form__pattern-filter">
                        <label htmlFor="category-filter">Category</label>
                        <select
                            name="category-filter"
                            value={patternFilter}
                            onChange={(evt) => {
                                setPatternFilter(parseInt(evt.target.value));
                            }}
                        >
                            <option value="0">Select a Category</option>
                            {categories.length > 0 &&
                                categories.map((c) => {
                                    return (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                </>
            )}
            <section className="project-form__patterns">
                {project.patternId === 0 ? (
                    patterns.map((pat) => {
                        return (
                            <PatternCard
                                key={pat.id}
                                pattern={pat}
                                style={{ cursor: 'pointer' }}
                                projectUse={project}
                                setProjectPattern={setProject}
                            />
                        );
                    })
                ) : selectedPattern.images ? (
                    <PatternCard pattern={selectedPattern} />
                ) : null}
            </section>
            {project.patternId > 0 ? (
                <section className="project-form__sizes">
                    {project.patternSizeId > 0 ? (
                        <div className="project-form__selected-size">
                            {selectedSize.id > 0 &&
                                `Selected size: ${selectedSize.size.abbreviation}`}
                        </div>
                    ) : (
                        <>
                            <div className="project-form__section-title">
                                Select a Size
                            </div>
                            <select
                                className="project-form__size-select"
                                onChange={(evt) => {
                                    setProject((prevState) => {
                                        return {
                                            ...prevState,
                                            patternSizeId: parseInt(
                                                evt.target.value
                                            ),
                                        };
                                    });
                                }}
                            >
                                <option value="0">Select a Size</option>
                                {sizes.map((ps) => {
                                    return (
                                        <option key={ps.id} value={ps.id}>
                                            {ps.size.abbreviation} | {ps.yards}{' '}
                                            yards
                                        </option>
                                    );
                                })}
                            </select>
                        </>
                    )}
                </section>
            ) : null}
            <button className="button">Save Project</button>
            <button className="button" onClick={handleClearForm}>
                Clear Form
            </button>
        </main>
    );
};
