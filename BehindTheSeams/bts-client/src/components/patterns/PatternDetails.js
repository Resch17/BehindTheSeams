import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FileContext } from '../../providers/FileProvider';
import { PatternContext } from '../../providers/PatternProvider';
import { Slideshow } from '../Slideshow';

export const PatternDetails = () => {
    const [pattern, setPattern] = useState(null);
    const [editingNotes, setEditingNotes] = useState(false);
    const [updatedNotes, setUpdatedNotes] = useState('');
    const [deletingFiles, setDeletingFiles] = useState(false);
    const [addingFile, setAddingFile] = useState(false);
    const { getPatternById, updatePattern, deletePattern } =
        useContext(PatternContext);
    const [fileToUpload, setFileToUpload] = useState({ name: '' });
    const { deleteFile, uploadFile, addFile } = useContext(FileContext);
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

    const handleFileDelete = (fileId) => {
        if (
            window.confirm(
                'Are you sure you want to remove this file? This cannot be undone.'
            )
        ) {
            deleteFile(fileId).then(() => {
                getPatternById(id).then((parsed) => {
                    setPattern(parsed);
                    setDeletingFiles(false);
                });
            });
        } else {
            setDeletingFiles(false);
        }
    };

    const handleClickSaveFile = () => {
        if (fileToUpload.name.length > 0 && fileToUpload.file) {
            uploadFile(fileToUpload.file)
                .then((res) => {
                    if (!res.ok) {
                        setAddingFile(false);
                        throw Error();
                    }
                    return res.json();
                })
                .then((parsed) => {
                    let [unused, filePath] =
                        parsed.outputPath.split('public\\');
                    fileToUpload.path = '\\' + filePath;
                    fileToUpload.patternId = pattern.id;
                    addFile(fileToUpload).then(() => {
                        getPatternById(id).then((parsed) => {
                            setPattern(parsed);
                            setAddingFile(false);
                        });
                    });
                })
                .catch(() => {
                    window.alert(
                        'File upload failed. Is your file greater than 10Mb?'
                    );
                });
        }
    };

    useEffect(() => {
        if (id) {
            getPatternById(id)
                .then((parsed) => {
                    if (!parsed) {
                        throw new Error();
                    } else {
                        setPattern(parsed);
                    }
                })
                .catch(() => history.push('/patterns'));
        }
    }, [id]);

    useEffect(() => {
        if (pattern) {
            setUpdatedNotes(pattern.notes);
        }
    }, [pattern]);

    useEffect(() => {
        if (!addingFile) {
            setFileToUpload({ name: '' });
        }
    }, [addingFile]);

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
                        <img src="/assets/patternPlaceholder.png" alt="Pattern placeholder" />
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
                            {pattern.url !== '' ? (
                                <a
                                    href={pattern.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ fontWeight: 'bold' }}
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
                    <div className="pattern-details__files-container">
                        <div className="pattern-details__files-top-row">
                            <div className="pattern-details__deleteFile">
                                <i
                                    className="fas fa-trash fa-2x cursorPointer"
                                    style={
                                        deletingFiles
                                            ? {
                                                  color: 'var(--dark-color2)',
                                              }
                                            : {
                                                  color: 'var(--dark-color1)',
                                              }
                                    }
                                    onClick={() => {
                                        setDeletingFiles(!deletingFiles);
                                    }}
                                ></i>
                            </div>
                            <div className="pattern-details__files-title">
                                Files
                            </div>
                            <div className="pattern-details__addFile">
                                <i
                                    className="fas fa-plus-circle fa-2x cursorPointer"
                                    onClick={() => setAddingFile(!addingFile)}
                                    style={
                                        addingFile
                                            ? {
                                                  color: 'var(--dark-color2)',
                                              }
                                            : {
                                                  color: 'var(--dark-color1)',
                                              }
                                    }
                                ></i>
                            </div>
                        </div>
                        {pattern.files.length > 0 ? (
                            <div className="pattern-details__files">
                                {pattern.files.map((f) => {
                                    if (!deletingFiles) {
                                        return (
                                            <a
                                                key={f.id}
                                                className="pattern-details__file"
                                                href={f.path}
                                            >
                                                {f.name}
                                            </a>
                                        );
                                    } else {
                                        return (
                                            <div className="pattern-details__file-with-delete">
                                                <i
                                                    className="fas fa-times cursorPointer"
                                                    onClick={() =>
                                                        handleFileDelete(f.id)
                                                    }
                                                ></i>
                                                <div className="pattern-details__file">
                                                    {f.name}
                                                </div>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        ) : (
                            <div
                                className="no-files-message"
                                style={{ marginTop: '10px', fontSize: '18px' }}
                            >
                                No files associated with this pattern. Click{' '}
                                <i className="fas fa-plus-circle"></i> above to
                                upload some.
                            </div>
                        )}
                        {addingFile && (
                            <div className="pattern-details__file-form">
                                <h2 style={{ textAlign: 'center' }}>
                                    New File (10 mb size limit)
                                </h2>
                                <div className="file-upload-group">
                                    <label htmlFor="file-name">
                                        File Name{' '}
                                        <small>
                                            (e.g. "Instructions", "Projector
                                            File", etc)
                                        </small>
                                    </label>
                                    <input
                                        name="file-name"
                                        type="text"
                                        required
                                        autoComplete="off"
                                        value={fileToUpload.name}
                                        onChange={(evt) => {
                                            setFileToUpload((prevState) => {
                                                return {
                                                    ...prevState,
                                                    name: evt.target.value,
                                                };
                                            });
                                        }}
                                    />
                                    <input
                                        type="file"
                                        accept=".png, .jpg, .gif, .bmp, .pdf"
                                        name="file"
                                        placeholder="Choose file to upload"
                                        onChange={(evt) => {
                                            if (evt.target.files.length > 0) {
                                                setFileToUpload((prevState) => {
                                                    let newState = {
                                                        ...prevState,
                                                    };
                                                    newState.file =
                                                        evt.target.files;

                                                    return newState;
                                                });
                                            }
                                        }}
                                    />
                                    <div className="pattern-details__file-upload-buttons">
                                        <button
                                            className="button"
                                            onClick={handleClickSaveFile}
                                        >
                                            Save File
                                        </button>
                                        <button
                                            className="button"
                                            onClick={() => setAddingFile(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
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
                            cols="70"
                            rows="10"
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
