import React from 'react';

export const PatternCard = ({ pattern }) => {
    const dateFormatter = (dateTime) => {
        let date = new Date(dateTime);
        return date.toLocaleDateString('en-US');
    };

    return (
        <div className="pattern-card">
            <div className="pattern-card__title">{pattern.name}</div>
            <div className="pattern-card__body">
                <div className="pattern-card__image-container">
                    {pattern.images.length > 0 ? (
                        <img
                            className="pattern-card__image"
                            src={pattern.images[0].url}
                        />
                    ) : (
                        <img
                            className="pattern-card__image"
                            src="./patternPlaceholder.png"
                        />
                    )}
                </div>
                <div className="pattern-card__properties">
                    <div className="pattern-card__property">
                        Fabric type: {pattern.fabricType.name}
                    </div>
                    <div className="pattern-card__property">
                        Category: {pattern.category.name}
                    </div>
                    <div className="pattern-card__property">
                        <a href={pattern.publisher.url} target="_blank" rel="noreferrer">Publisher: {pattern.publisher.name}</a>
                    </div>
                    <div className="pattern-card__property">
                        Purchased: {dateFormatter(pattern.purchaseDate)}
                    </div>
                </div>
            </div>
            <div className="pattern-card__bottom-line">
                <div className="pattern-card__bottom-line-property">
                    <span>Sizes: </span>
                    {pattern.patternSizes
                        .map((ps) => ps.size.abbreviation)
                        .join(', ')}
                </div>
                <div className="pattern-card__bottom-line-property">
                    <span>Files: </span> {pattern.files.length}
                </div>
            </div>
        </div>
    );
};
