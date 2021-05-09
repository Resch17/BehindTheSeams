import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { PatternContext } from '../../providers/PatternProvider';

export const PatternCard = ({
    pattern,
    modifying,
    setModifying,
    projectUse,
    setProjectPattern,
    setPatterns
}) => {
    const { getAllPatterns, deletePattern } = useContext(PatternContext);
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
                deletePattern(pattern.id)
                    .then(getAllPatterns)
                    .then((parsed) => {
                        setPatterns(parsed)
                        setModifying(false);
                    });
            } else {
                setModifying(false);
            }
        } else {
            setModifying(false);
        }
    };

    return (
        <div className="pattern-card">
            {projectUse ? (
                <i
                    className="fas fa-plus-circle fa-2x pattern-add-button cursorPointer"
                    style={{ marginTop: '5px' }}
                    onClick={() => {
                        setProjectPattern((prevState) => {
                            return { ...prevState, patternId: pattern.id };
                        });
                    }}
                ></i>
            ) : null}
            <div
                className="pattern-card__top-row"
                style={
                    modifying
                        ? { justifyContent: 'space-between' }
                        : { justifyContent: 'center' }
                }
            >
                {modifying ? (
                    <div
                        className="pattern-card__delete-button"
                        onClick={handleDelete}
                    >
                        <i className="fas fa-trash fa-2x cursorPointer"></i>
                    </div>
                ) : null}
                <div
                    className="pattern-card__title"
                    onClick={() => history.push(`/pattern/${pattern.id}`)}
                >
                    {pattern.name}
                </div>
            </div>
            <div className="pattern-card__body">
                <div className="pattern-card__image-container">
                    {pattern.images.length > 0 ? (
                        <img
                            className="pattern-card__image"
                            src={pattern.images[0].url}
                            onClick={() =>
                                history.push(`/pattern/${pattern.id}`)
                            }
                        />
                    ) : (
                        <img
                            className="pattern-card__image"
                            src="/assets/patternPlaceholder.png"
                            onClick={() =>
                                history.push(`/pattern/${pattern.id}`)
                            }
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
                        <a
                            href={pattern.publisher.url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Publisher: {pattern.publisher.name}
                        </a>
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
