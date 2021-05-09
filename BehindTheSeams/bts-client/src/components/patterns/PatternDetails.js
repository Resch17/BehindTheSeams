import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { PatternContext } from '../../providers/PatternProvider';
import { Slideshow } from '../Slideshow';

export const PatternDetails = () => {
    const [pattern, setPattern] = useState(null);
    const [editingNotes, setEditingNotes] = useState(false);
    const [updatedNotes, setUpdatedNotes] = useState('');
    const { getPatternById, updatePattern, deletePattern } = useContext(
        PatternContext
    );
    const { id } = useParams();
    const history = useHistory();

    const dateFormatter = (dateTime) => {
        let date = new Date(dateTime);
        return date.toLocaleDateString('en-US');
    };

    const handleDelete = () => {
        if (
            window.confirm(
                'Are you sure you want to delete this pattern? All projects using this pattern will be deleted, as will any images and files associated with the pattern or projects!'
            )
        ) {
            if (
                window.confirm(
                    "Seriously, there's no going back. Are you REALLY sure?"
                )
            ) {
                deletePattern(pattern.id).then(() => {
                    history.push('/patterns');
                });
            }
        }
    };

    const handleUpdateNotes = () => {
        let newPattern = { ...pattern };
        newPattern.notes = updatedNotes;
        updatePattern(newPattern).then(() => {
            getPatternById(id).then((parsed) => {
                setPattern(parsed);
                setEditingNotes(false);
            });
        });
    };

    useEffect(() => {
        if (id) {
            getPatternById(id).then(setPattern);
        }
    }, []);

    useEffect(() => {
        if (pattern) {
            setUpdatedNotes(pattern.notes);
        }
    }, [pattern]);

    if (!pattern) {
        return null;
    }

    return (
        <main className="pattern-details">
            <div className="pattern-details__top-row">
                <div className="pattern-details__top-row-title">
                    {pattern.name}
                </div>
                <div className="pattern-details__top-row-buttons">
                    <button className="button">Edit Pattern</button>
                    <button className="button" onClick={handleDelete}>
                        Delete Pattern
                    </button>
                </div>
            </div>
            <section className="pattern-details__body">
                <div className="pattern-details__image-container">
                    {pattern.images.length > 0 ? (
                        <Slideshow
                            images={pattern.images}
                            containerWidth={400}
                        />
                    ) : (
                        <img src="/assets/patternPlaceholder.png" />
                    )}
                </div>
                <div className="pattern-details__content">
                    <div className="pattern-details__properties">
                        <div className="pattern-details__property">
                            Category: {pattern.category.name}
                        </div>
                        <div className="pattern-details__property">
                            Publisher: {pattern.publisher.name}
                        </div>
                        <div className="pattern-details__property">
                            Fabric type: {pattern.fabricType.name}
                        </div>
                        <div className="pattern-details__property">
                            Purchase date: {dateFormatter(pattern.purchaseDate)}
                        </div>
                        <div className="pattern-details__property">
                            {pattern.url != '' ? (
                                <a
                                    href={pattern.url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Purchase Link
                                </a>
                            ) : null}
                        </div>
                    </div>
                    <div className="pattern-details__sizes">
                        <div className="pattern-details__size-title">
                            Sizes & fabric requirements:
                        </div>
                        <div className="pattern-details__size-list">
                            {pattern.patternSizes.map((ps) => {
                                return (
                                    <div
                                        key={ps.id}
                                        className="pattern-details__pattern-size"
                                    >
                                        <div className="pattern-size-name">
                                            {ps.size.abbreviation}
                                        </div>
                                        <div className="pattern-size-yards">
                                            {ps.yards}yds
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {pattern.files.length > 0 ? (
                        <div className="pattern-details__files-container">
                            <div className="pattern-details__files-top-row">
                                <div className="pattern-details__deleteFile">
                                    <i className="fas fa-trash fa-2x cursorPointer"></i>
                                </div>
                                <div className="pattern-details__files-title">
                                    Files
                                </div>
                                <div className="pattern-details__addFile">
                                    <i className="fas fa-plus-circle fa-2x cursorPointer"></i>
                                </div>
                            </div>
                            <div className="pattern-details__files">
                                {pattern.files.map((f) => (
                                    <a
                                        key={f.id}
                                        className="pattern-details__file"
                                        href={f.path}
                                    >
                                        {f.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </section>
            <section className="pattern-details__notes">
                <div className="pattern-details__notes-top-row">
                    <div className="pattern-details__notes-title">Notes</div>
                    {!editingNotes && (
                        <i
                            className="fas fa-pencil-alt fa-2x cursorPointer"
                            onClick={() => setEditingNotes(true)}
                        ></i>
                    )}
                </div>
                {editingNotes ? (
                    <div className="pattern-details__notes-form">
                        <textarea
                            value={updatedNotes}
                            onChange={(evt) =>
                                setUpdatedNotes(evt.target.value)
                            }
                        ></textarea>
                        <div className="pattern-details__notes-form-buttons">
                            <button
                                className="button"
                                onClick={handleUpdateNotes}
                            >
                                Save Notes
                            </button>
                            <button
                                className="button"
                                onClick={() => {
                                    setEditingNotes(false);
                                    setUpdatedNotes(pattern.notes);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="pattern-details__notes-content">
                        {pattern.notes}
                    </div>
                )}
            </section>
        </main>
    );
};
