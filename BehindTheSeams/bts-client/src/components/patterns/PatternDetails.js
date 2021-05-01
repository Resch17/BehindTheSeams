import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PatternContext } from '../../providers/PatternProvider';
import { Slideshow } from '../Slideshow';

export const PatternDetails = () => {
    const [pattern, setPattern] = useState(null);
    const { getPatternById } = useContext(PatternContext);
    const { id } = useParams();

    const dateFormatter = (dateTime) => {
        let date = new Date(dateTime);
        return date.toLocaleDateString('en-US');
    };

    useEffect(() => {
        if (id) {
            getPatternById(id).then(setPattern);
        }
    }, []);

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
                    <button className="button">Delete Pattern</button>
                </div>
            </div>
            <section className="pattern-details__body">
                <div className="pattern-details__image-container">
                    {pattern.images.length > 0 ? (
                        <Slideshow images={pattern.images} containerWidth={400} />
                    ) : (
                        <img src="./assets/patternPlaceholder.png" />
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
                                    <div key={ps.id} className="pattern-size">
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
                                    <i className="fas fa-trash fa-2x"></i>
                                </div>
                                <div className="pattern-details__files-title">
                                    Files
                                </div>
                                <div className="pattern-details__addFile">
                                    <i className="fas fa-plus-circle fa-2x"></i>
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
                </div>
                <div className="pattern-details__notes-content">
                    {pattern.notes}
                </div>
            </section>
        </main>
    );
};
