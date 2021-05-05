import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PatternContext } from '../../providers/PatternProvider';
import { PublisherContext } from '../../providers/PublisherProvider';
import { FabricTypeContext } from '../../providers/FabricTypeProvider';
import { PatternImageContext } from '../../providers/PatternImageProvider';
import { SizeContext } from '../../providers/SizeProvider';
import { PatternSizeContext } from '../../providers/PatternSizeProvider';
import { FileContext } from '../../providers/FileProvider';
import { CategoryContext } from '../../providers/CategoryProvider';

export const PatternForm = () => {
    const [pattern, setPattern] = useState({
        url: '',
        name: '',
        publisherId: 0,
        fabricTypeId: 0,
        categoryId: 0,
        notes: '',
        purchaseDate: '',
    });
    const [imageMethod, setImageMethod] = useState('none');
    const [images, setImages] = useState([{}]);
    const [files, setFiles] = useState([{ name: '' }]);
    const [patternSizes, setPatternSizes] = useState([{}]);

    const { getAllPublishers, publishers } = useContext(PublisherContext);
    const { getAllFabricTypes, fabricTypes } = useContext(FabricTypeContext);
    const { getAllSizes, sizes } = useContext(SizeContext);
    const { getAllCategories, categories } = useContext(CategoryContext);

    const { addPattern } = useContext(PatternContext);
    const { addPatternImage } = useContext(PatternImageContext);
    const { addPatternSize } = useContext(PatternSizeContext);
    const { uploadImage, uploadFile, addFile } = useContext(FileContext);
    const history = useHistory();

    const handleClearForm = () => {
        setPattern({
            url: '',
            name: '',
            publisherId: 0,
            fabricTypeId: 0,
            categoryId: 0,
            notes: '',
            purchaseDate: '',
        });
        setPatternSizes([{ sizeId: 0, yards: 0 }]);
        setImageMethod('none');
        setImages([{}]);
        setFiles([{}]);
    };

    const handleImageUpload = (image, createdPatternId) => {
        return uploadImage(image)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Image upload failed');
                }
            })
            .then((parsed) => {
                if (parsed) {
                    let [unused, path] = parsed.outputPath.split('public\\');
                    return { url: '..\\' + path, patternId: createdPatternId };
                }
            });
    };

    const handleFileUpload = (file, createdPatternId) => {
        return uploadFile(file.file)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('File upload failed');
                }
            })
            .then((parsed) => {
                if (parsed) {
                    let [unused, filepath] = parsed.outputPath.split(
                        'public\\'
                    );
                    return {
                        path: '..\\' + filepath,
                        patternId: createdPatternId,
                        name: file.name,
                    };
                }
            });
    };

    const handleClickSave = () => {
        if (
            pattern.name.length < 1 ||
            pattern.fabricTypeId < 1 ||
            pattern.categoryId < 1 ||
            pattern.publisherId < 1
        ) {
            window.alert('Please fill out all required fields');
            return;
        }

        addPattern(pattern)
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    return response.json();
                }
            })
            .then((createdPattern) => {
                if (imageMethod === 'upload') {
                    images.forEach((image) => {
                        handleImageUpload(
                            image,
                            createdPattern.id
                        ).then((patternImage) => addPatternImage(patternImage));
                    });
                } else if (imageMethod === 'links') {
                    images.forEach((image) => {
                        image.patternId = createdPattern.id;
                        addPatternImage(image);
                    });
                }

                files.forEach((file) => {
                    handleFileUpload(
                        file,
                        createdPattern.id
                    ).then((patternFile) => addFile(patternFile));
                });

                patternSizes.forEach((patternSize) => {
                    patternSize.patternId = createdPattern.id;
                    addPatternSize(patternSize);
                });
                handleClearForm();
                history.push('/patterns');
            });
    };

    useEffect(() => {
        getAllPublishers()
            .then(getAllFabricTypes)
            .then(getAllCategories)
            .then(getAllSizes);
    }, []);

    return (
        <main className="pattern-form">
            <div className="pattern-form__title">New Pattern</div>
            <div className="pattern-form__form">
                <div className="pattern-form__form-group">
                    <label htmlFor="pattern-name">Pattern Name</label>
                    <input
                        name="pattern-name"
                        type="text"
                        autoComplete="off"
                        required
                        value={pattern.name}
                        onChange={(evt) => {
                            setPattern((prevState) => {
                                return { ...prevState, name: evt.target.value };
                            });
                        }}
                    />
                </div>
                <div className="pattern-form__form-group">
                    <label htmlFor="pattern-url">URL</label>
                    <input
                        name="pattern-url"
                        type="text"
                        autoComplete="off"
                        value={pattern.url}
                        onChange={(evt) => {
                            setPattern((prevState) => {
                                return { ...prevState, url: evt.target.value };
                            });
                        }}
                    />
                </div>
                <div className="pattern-form__form-group">
                    <label htmlFor="pattern-category">Category</label>
                    <select
                        name="pattern-category"
                        value={pattern.categoryId}
                        onChange={(evt) => {
                            setPattern((prevState) => {
                                return {
                                    ...prevState,
                                    categoryId: parseInt(evt.target.value),
                                };
                            });
                        }}
                    >
                        <option value="0">Select a Category</option>
                        {categories.length > 0 &&
                            categories.map((c) => {
                                return (
                                    <option
                                        key={c.id}
                                        value={c.id}
                                        className="pattern-category__option"
                                    >
                                        {c.name}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="pattern-form__form-group">
                    <label htmlFor="pattern-fabricType">Fabric Type</label>
                    <select
                        name="pattern-fabricType"
                        value={pattern.fabricTypeId}
                        onChange={(evt) => {
                            setPattern((prevState) => {
                                return {
                                    ...prevState,
                                    fabricTypeId: parseInt(evt.target.value),
                                };
                            });
                        }}
                    >
                        <option value="0">Select a Fabric Type</option>
                        {fabricTypes.length > 0 &&
                            fabricTypes.map((f) => {
                                return (
                                    <option
                                        key={f.id}
                                        value={f.id}
                                        className="pattern-fabricType__option"
                                    >
                                        {f.name}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="pattern-form__form-group">
                    <label htmlFor="pattern-publisher">Publisher</label>
                    <select
                        name="pattern-publisher"
                        value={pattern.publisherId}
                        onChange={(evt) => {
                            setPattern((prevState) => {
                                return {
                                    ...prevState,
                                    publisherId: parseInt(evt.target.value),
                                };
                            });
                        }}
                    >
                        <option value="0">Select a Publisher</option>
                        {publishers.length > 0 &&
                            publishers.map((p) => {
                                return (
                                    <option
                                        key={p.id}
                                        value={p.id}
                                        className="pattern-publisher__option"
                                    >
                                        {p.name}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="pattern-form__form-group">
                    <label htmlFor="pattern-purchaseDate">Purchase Date</label>
                    <input
                        type="date"
                        value={pattern.purchaseDate}
                        onChange={(evt) => {
                            setPattern((prevState) => {
                                return {
                                    ...prevState,
                                    purchaseDate: evt.target.value,
                                };
                            });
                        }}
                    />
                </div>
                <div className="pattern-form__size-form">
                    {patternSizes.map((ps, i) => {
                        return (
                            <div key={i} className="pattern-size">
                                <div className="size-group">
                                    <label htmlFor="size-select">Size</label>
                                    <select
                                        name="size-select"
                                        value={patternSizes[i].sizeId}
                                        onChange={(evt) => {
                                            setPatternSizes((prevState) => {
                                                let newState = [...prevState];
                                                newState[i] = {
                                                    ...newState[i],
                                                    sizeId: parseInt(
                                                        evt.target.value
                                                    ),
                                                };
                                                return newState;
                                            });
                                        }}
                                    >
                                        <option value="0">Select a Size</option>
                                        {sizes.map((s) => {
                                            return (
                                                <option key={s.id} value={s.id}>
                                                    {s.abbreviation}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="size-group">
                                    <label htmlFor="size-yards">
                                        Yards Required for Size
                                    </label>
                                    <input
                                        type="number"
                                        name="size-yards"
                                        value={patternSizes[i].yards}
                                        onChange={(evt) => {
                                            setPatternSizes((prevState) => {
                                                let newState = [...prevState];
                                                newState[i] = {
                                                    ...newState[i],
                                                    yards: evt.target.value,
                                                };
                                                return newState;
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                    <i
                        className="fas fa-plus-circle fa-2x"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setPatternSizes((prevState) => {
                                return [...prevState, {}];
                            });
                        }}
                    ></i>
                </div>
                <div className="pattern-form__section-title">Add Images</div>
                {imageMethod === 'none' && (
                    <div className="pattern-form__form-subgroup">
                        <button
                            className="button"
                            onClick={() => setImageMethod('links')}
                        >
                            Links
                        </button>
                        <div className="pattern-form__image-button-text">
                            OR
                        </div>
                        <button
                            className="button"
                            onClick={() => setImageMethod('upload')}
                        >
                            Upload
                        </button>
                    </div>
                )}
                {imageMethod !== 'none' && (
                    <div className="pattern-form__image-form">
                        {imageMethod === 'upload' ? (
                            <div className="pattern-form__image-upload-form">
                                {images.length > 0 &&
                                    images.map((image, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="image-upload-group"
                                            >
                                                <input
                                                    type="file"
                                                    accept=".png, .jpg, .gif, .bmp"
                                                    name="image"
                                                    placeholder="Choose image to upload"
                                                    onChange={(evt) => {
                                                        if (
                                                            evt.target.files
                                                                .length > 0
                                                        ) {
                                                            setImages(
                                                                (prevState) => {
                                                                    let newState = [
                                                                        ...prevState,
                                                                    ];

                                                                    newState[
                                                                        i
                                                                    ] =
                                                                        evt.target.files;
                                                                    return newState;
                                                                }
                                                            );
                                                        }
                                                    }}
                                                />
                                            </div>
                                        );
                                    })}
                                <i
                                    className="fas fa-plus-circle fa-2x"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        setImages((prevState) => {
                                            return [...prevState, {}];
                                        });
                                    }}
                                ></i>
                            </div>
                        ) : (
                            <div className="pattern-form__image-link-form">
                                {images.length > 0 &&
                                    images.map((image, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="image-link-group"
                                            >
                                                <label htmlFor="image-link-url">
                                                    Image URL
                                                </label>
                                                <input
                                                    type="url"
                                                    name="image-link-url"
                                                    autoComplete="off"
                                                    onChange={(evt) => {
                                                        setImages(
                                                            (prevState) => {
                                                                let newState = [
                                                                    ...prevState,
                                                                ];
                                                                newState[i] = {
                                                                    url:
                                                                        evt
                                                                            .target
                                                                            .value,
                                                                };
                                                                return newState;
                                                            }
                                                        );
                                                    }}
                                                />
                                            </div>
                                        );
                                    })}
                                <i
                                    className="fas fa-plus-circle fa-2x"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        setImages((prevState) => {
                                            return [...prevState, {}];
                                        });
                                    }}
                                ></i>
                            </div>
                        )}
                    </div>
                )}
                <div className="pattern-form__section-title">
                    Add Pattern Files
                </div>
                <div className="pattern-form__form-subgroup">
                    <div className="pattern-__file-upload-form">
                        {files.length > 0 &&
                            files.map((file, i) => {
                                return (
                                    <div key={i} className="file-upload-group">
                                        <label htmlFor="file-name">
                                            File Name
                                        </label>
                                        <input
                                            name="file-name"
                                            type="text"
                                            required
                                            autoComplete="off"
                                            value={files[i].name}
                                            onChange={(evt) => {
                                                setFiles((prevState) => {
                                                    let newState = [
                                                        ...prevState,
                                                    ];
                                                    newState[i] = {
                                                        ...newState[i],
                                                        name: evt.target.value,
                                                    };
                                                    return newState;
                                                });
                                            }}
                                        />
                                        <input
                                            type="file"
                                            accept=".png, .jpg, .gif, .bmp, .pdf"
                                            name="file"
                                            placeholder="Choose file to upload"
                                            onChange={(evt) => {
                                                if (
                                                    evt.target.files.length > 0
                                                ) {
                                                    setFiles((prevState) => {
                                                        let newState = [
                                                            ...prevState,
                                                        ];

                                                        newState[i] = {
                                                            ...newState[i],
                                                            file:
                                                                evt.target
                                                                    .files,
                                                        };
                                                        return newState;
                                                    });
                                                }
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        <i
                            className="fas fa-plus-circle fa-2x"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setFiles((prevState) => {
                                    return [...prevState, { name: '' }];
                                });
                            }}
                        ></i>
                    </div>
                </div>
            </div>
            <button className="button" onClick={handleClickSave}>
                Submit
            </button>
            <button className="button" onClick={handleClearForm}>
                Clear Form
            </button>
        </main>
    );
};
