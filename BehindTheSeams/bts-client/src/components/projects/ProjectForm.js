import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CategoryContext } from '../../providers/CategoryProvider';
import { FabricContext } from '../../providers/FabricProvider';
import { PatternContext } from '../../providers/PatternProvider';
import { PatternSizeContext } from '../../providers/PatternSizeProvider';
import { ProjectFabricContext } from '../../providers/ProjectFabricProvider';
import { ProjectContext } from '../../providers/ProjectProvider';
import { FabricCard } from '../fabric/FabricCard';
import { PatternCard } from '../patterns/PatternCard';
import ClipLoader from 'react-spinners/ClipLoader';
import '../../styles/Project.css';

export const ProjectForm = () => {
    const [project, setProject] = useState({
        name: '',
        patternId: 0,
        patternSizeId: 0,
    });
    const [patterns, setPatterns] = useState([]);
    const [categories, setCategories] = useState([]);
    const [patternFilter, setPatternFilter] = useState(0);
    const [patternSearchTerms, setPatternSearchTerms] = useState('');
    const [fabricSearchTerms, setFabricSearchTerms] = useState('');
    const [fabrics, setFabrics] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [selectedPattern, setSelectedPattern] = useState({});
    const [selectedSize, setSelectedSize] = useState({ id: 0 });
    const [projectFabric, setProjectFabric] = useState([]);
    const [addingFabric, setAddingFabric] = useState(true);
    const [saving, setSaving] = useState(false);

    const { addProject } = useContext(ProjectContext);
    const { getAllPatterns, getPatternById } = useContext(PatternContext);
    const { getAllFabric } = useContext(FabricContext);
    const { addProjectFabric } = useContext(ProjectFabricContext);
    const { getPatternSizesByPatternId } = useContext(PatternSizeContext);
    const { getAllCategories } = useContext(CategoryContext);

    const history = useHistory();

    const handleClearForm = () => {
        setProject({ name: '', patternId: 0, patternSizeId: 0 });
        setSelectedSize({ id: 0 });
        setSelectedPattern({});
        setProjectFabric([]);
        setPatternFilter(0);
        setPatternSearchTerms('');
        getAllPatterns().then(setPatterns);
    };

    const handleClickSave = () => {
        if (
            project.name.length < 1 ||
            project.patternId < 0 ||
            project.patternSizeId < 0
        ) {
            window.alert('Please fill out all required fields');
            return;
        }
        setSaving(true);
        addProject(project)
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    return response.json();
                }
            })
            .then((createdProject) => {
                projectFabric.forEach((f) => {
                    addProjectFabric({
                        fabricId: f.id,
                        projectId: createdProject.id,
                    });
                });
                handleClearForm();
                setSaving(false);
                history.push(`/project/${createdProject.id}`);
            });
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

    useEffect(() => {
        if (fabricSearchTerms.length > 0) {
            let searchResults = [...fabrics];
            searchResults = searchResults.filter((f) => {
                if (
                    f.name
                        .toLowerCase()
                        .includes(fabricSearchTerms.toLowerCase()) ||
                    f.fabricType.name
                        .toLowerCase()
                        .includes(fabricSearchTerms.toLowerCase())
                ) {
                    return f;
                }
            });
            if (searchResults.length > 0) {
                setFabrics(searchResults);
            } else {
                getAllFabric().then((parsed) => {
                    setFabrics(parsed);
                    window.alert('No search results found');
                    setFabricSearchTerms('');
                });
            }
        } else {
            getAllFabric().then((parsed) => {
                setFabrics(parsed);
            });
        }
    }, [fabricSearchTerms]);

    useEffect(() => {
        if (patternSearchTerms.length > 0) {
            let searchResults = [...patterns];
            searchResults = searchResults.filter((p) =>
                p.name.toLowerCase().includes(patternSearchTerms.toLowerCase())
            );
            if (searchResults.length > 0) {
                setPatterns(searchResults);
            } else {
                getAllPatterns().then((parsed) => {
                    setPatterns(parsed);
                    window.alert('No search results found');
                    setPatternSearchTerms('');
                });
            }
        }
    }, [patternSearchTerms]);

    return (
        <>
            {saving ? (
                <div
                    style={{
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'var(--light-color1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ClipLoader color={'#2b4743'} loading={true} size={50} />
                </div>
            ) : (
                <main className="project-form">
                    <div className="project-form__title">New Project</div>
                    <div className="project-form__form-group">
                        <label htmlFor="project-name">Project Name</label>
                        <input
                            type="text"
                            autoComplete="off"
                            value={project.name}
                            required
                            onChange={(evt) => {
                                setProject((prevState) => {
                                    return {
                                        ...prevState,
                                        name: evt.target.value,
                                    };
                                });
                            }}
                        />
                    </div>
                    {project.patternId > 0 ? (
                        <div className="project-form__selected-pattern">
                            <div className="project-form__section-title">
                                Selected Pattern
                            </div>
                            <PatternCard
                                pattern={patterns.find(
                                    (p) => p.id === project.patternId
                                )}
                            />
                        </div>
                    ) : (
                        <>
                            <div className="project-form__section-title">
                                Select a Pattern
                            </div>
                            <div className="project-form__pattern-filter">
                                <div className="project-form__form-group">
                                    <label htmlFor="category-filter">
                                        Category
                                    </label>
                                    <select
                                        name="category-filter"
                                        value={patternFilter}
                                        onChange={(evt) => {
                                            setPatternFilter(
                                                parseInt(evt.target.value)
                                            );
                                        }}
                                    >
                                        <option value="0">
                                            Select a Category
                                        </option>
                                        {categories.length > 0 &&
                                            categories.map((c) => {
                                                return (
                                                    <option
                                                        key={c.id}
                                                        value={c.id}
                                                    >
                                                        {c.name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                                <div className="project-form__form-group">
                                    <label htmlFor="pattern-search">
                                        Search Patterns
                                    </label>
                                    <input
                                        type="search"
                                        name="pattern-search"
                                        autoComplete="off"
                                        value={patternSearchTerms}
                                        onChange={(evt) => {
                                            setPatternSearchTerms(
                                                evt.target.value
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    {project.patternId === 0 && (
                        <section className="project-form__patterns">
                            {project.patternId === 0 ? (
                                patterns.length > 0 ? (
                                    patterns
                                        .sort((a, b) =>
                                            a.name.localeCompare(b.name)
                                        )
                                        .map((pat) => {
                                            return (
                                                <PatternCard
                                                    key={pat.id}
                                                    pattern={pat}
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    projectUse={project}
                                                    setProjectPattern={
                                                        setProject
                                                    }
                                                />
                                            );
                                        })
                                ) : (
                                    <h1>No Patterns Found</h1>
                                )
                            ) : null}
                        </section>
                    )}
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
                                                <option
                                                    key={ps.id}
                                                    value={ps.id}
                                                >
                                                    {ps.size.abbreviation} |{' '}
                                                    {ps.yards} yards
                                                </option>
                                            );
                                        })}
                                    </select>
                                </>
                            )}
                        </section>
                    ) : null}
                    {selectedSize.id > 0 && selectedPattern && (
                        <section className="project-form__fabric">
                            {projectFabric.length === 0 ? (
                                <div className="project-form__section-title">
                                    Select Fabric
                                </div>
                            ) : (
                                <div className="project-form__selected-fabric">
                                    <div className="project-form__section-title">
                                        Selected Fabric
                                    </div>
                                    <div className="project-form__selected-fabric-list">
                                        {projectFabric.map((f) => {
                                            return (
                                                <FabricCard
                                                    key={f.id}
                                                    fabric={f}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                            {addingFabric && (
                                <>
                                    <div className="project-form__form-group">
                                        <label htmlFor="fabric-search">
                                            Search Fabric
                                        </label>
                                        <input
                                            type="search"
                                            autoComplete="off"
                                            name="fabric-search"
                                            value={fabricSearchTerms}
                                            onChange={(evt) => {
                                                setFabricSearchTerms(
                                                    evt.target.value
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="project-form__fabric-list">
                                        {fabrics.length > 0 ? (
                                            fabrics.map((f) => {
                                                if (
                                                    !projectFabric.find(
                                                        (pf) => pf.id === f.id
                                                    )
                                                ) {
                                                    return (
                                                        <FabricCard
                                                            key={f.id}
                                                            fabric={f}
                                                            projectUse={
                                                                projectFabric
                                                            }
                                                            setProjectFabric={
                                                                setProjectFabric
                                                            }
                                                            setFabricSearchTerms={
                                                                setFabricSearchTerms
                                                            }
                                                        />
                                                    );
                                                }
                                            })
                                        ) : (
                                            <div className="project-form__fabric-empty-message">
                                                No Fabric Found
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </section>
                    )}
                    <div className="project-form__buttons">
                        <button className="button" onClick={handleClickSave}>
                            Save Project
                        </button>
                        <button className="button" onClick={handleClearForm}>
                            Clear Form
                        </button>
                    </div>
                </main>
            )}
        </>
    );
};
