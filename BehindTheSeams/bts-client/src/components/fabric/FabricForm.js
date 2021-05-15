import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FabricImageContext } from '../../providers/FabricImageProvider';
import { FabricContext } from '../../providers/FabricProvider';
import { FabricTypeContext } from '../../providers/FabricTypeProvider';
import { FileContext } from '../../providers/FileProvider';
import { RetailerContext } from '../../providers/RetailerProvider';
import '../../styles/Fabric.css';

export const FabricForm = () => {
    const [fabric, setFabric] = useState({
        name: '',
        url: '',
        retailerId: 0,
        fabricTypeId: 0,
        pricePerYard: 0,
        yardsInStock: 0,
        notes: '',
    });
    const [imageMethod, setImageMethod] = useState('none');
    const [images, setImages] = useState([{}]);

    const { getAllRetailers, retailers } = useContext(RetailerContext);
    const { getAllFabricTypes, fabricTypes } = useContext(FabricTypeContext);
    const { addFabric } = useContext(FabricContext);
    const { addFabricImage } = useContext(FabricImageContext);
    const { uploadImage } = useContext(FileContext);
    const history = useHistory();

    const handleClearForm = () => {
        setFabric({
            name: '',
            url: '',
            retailerId: 0,
            fabricTypeId: 0,
            pricePerYard: 0,
            yardsInStock: 0,
            notes: '',
        });
        setImageMethod('none');
        setImages([{}]);
    };

    const handleClickSave = () => {
        if (
            fabric.name.length < 1 ||
            fabric.retailerId < 1 ||
            fabric.fabricTypeId < 1
        ) {
            window.alert('Please fill out all required fields');
            return;
        }

        addFabric(fabric)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((createdFabric) => {
                if (images.length === 0 || imageMethod === 'none') {
                    handleClearForm();
                    history.push(`/fabric/${createdFabric.id}`);
                }
                let imagesToAdd = [];
                if (imageMethod === 'upload') {
                    let promises = images.map((i) => uploadImage(i));
                    Promise.all(promises)
                        .then((res) => Promise.all(res.map((r) => r.json())))
                        .then((parsed) => {
                            parsed.forEach((fi) => {
                                if (fi) {
                                    let [unused, path] =
                                        fi.outputPath.split('public\\');
                                    imagesToAdd.push({
                                        url: '\\' + path,
                                        fabricId: createdFabric.id,
                                    });
                                }
                            });
                            let fiPromises = imagesToAdd.map((image) =>
                                addFabricImage(image)
                            );
                            Promise.all(fiPromises).then(() => {
                                handleClearForm();
                                history.push(`/fabric/${createdFabric.id}`);
                            });
                        });
                } else if (imageMethod === 'links') {
                    images.forEach((image) => {
                        image.fabricId = createdFabric.id;
                        imagesToAdd.push(image);
                    });
                    let promises = imagesToAdd.map((image) =>
                        addFabricImage(image)
                    );
                    Promise.all(promises).then(() => {
                        handleClearForm();
                        history.push(`/fabric/${createdFabric.id}`);
                    });
                }
            });
    };

    useEffect(() => {
        getAllRetailers().then(getAllFabricTypes);
    }, []);

    return (
        <main className="fabric-form">
            <div className="fabric-form__title">New Fabric</div>
            <div className="fabric-form__form">
                <div className="fabric-form__form-group">
                    <label htmlFor="fabric-name">Fabric Name</label>
                    <input
                        name="fabric-name"
                        type="text"
                        autoComplete="off"
                        required
                        value={fabric.name}
                        onChange={(evt) => {
                            setFabric((prevState) => {
                                return { ...prevState, name: evt.target.value };
                            });
                        }}
                    />
                </div>
                <div className="fabric-form__form-group">
                    <label htmlFor="fabric-url">URL</label>
                    <input
                        name="fabric-url"
                        autoComplete="off"
                        type="text"
                        value={fabric.url}
                        onChange={(evt) => {
                            setFabric((prevState) => {
                                return { ...prevState, url: evt.target.value };
                            });
                        }}
                    />
                </div>
                <div className="fabric-form__form-group">
                    <label htmlFor="fabric-retailer">Retailer</label>
                    <select
                        name="fabric-retailer"
                        value={fabric.retailerId}
                        onChange={(evt) => {
                            setFabric((prevState) => {
                                return {
                                    ...prevState,
                                    retailerId: parseInt(evt.target.value),
                                };
                            });
                        }}
                    >
                        <option value="0">Select a Retailer</option>
                        {retailers.length > 0 &&
                            retailers
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((r) => {
                                    return (
                                        <option
                                            className="fabric-retailer__option"
                                            value={r.id}
                                            key={r.id}
                                        >
                                            {r.name}
                                        </option>
                                    );
                                })}
                    </select>
                </div>
                <div className="fabric-form__form-group">
                    <label htmlFor="fabric-fabricType">Fabric Type</label>
                    <select
                        name="fabric-fabricType"
                        value={fabric.fabricTypeId}
                        onChange={(evt) => {
                            setFabric((prevState) => {
                                return {
                                    ...prevState,
                                    fabricTypeId: parseInt(evt.target.value),
                                };
                            });
                        }}
                    >
                        <option value="0">Select a Fabric Type</option>
                        {fabricTypes.length > 0 &&
                            fabricTypes.map((ft) => {
                                return (
                                    <option
                                        className="fabric-fabricType__option"
                                        value={ft.id}
                                        key={ft.id}
                                    >
                                        {ft.name}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="fabric-form__form-subgroup">
                    <div className="fabric-form__form-group">
                        <label htmlFor="fabric-price">Price Per Yard</label>
                        <span className="dollar">
                            <input
                                type="number"
                                name="fabric-price"
                                step="any"
                                value={fabric.pricePerYard}
                                onChange={(evt) => {
                                    setFabric((prevState) => {
                                        return {
                                            ...prevState,
                                            pricePerYard: evt.target.value,
                                        };
                                    });
                                }}
                            />
                        </span>
                    </div>
                    <div className="fabric-form__form-group">
                        <label htmlFor="fabric-yards">Yards In Stock</label>
                        <input
                            type="number"
                            name="fabric-yards"
                            value={fabric.yardsInStock}
                            onChange={(evt) => {
                                setFabric((prevState) => {
                                    return {
                                        ...prevState,
                                        yardsInStock: evt.target.value,
                                    };
                                });
                            }}
                        />
                    </div>
                </div>
                {imageMethod === 'none' && (
                    <>
                        <div className="fabric-form__section-title">
                            Add Images
                        </div>
                        <div className="fabric-form__form-subgroup">
                            <button
                                className="button"
                                onClick={() => setImageMethod('links')}
                            >
                                Links
                            </button>
                            <div className="fabric-form__image-button-text">
                                OR
                            </div>
                            <button
                                className="button"
                                onClick={() => setImageMethod('upload')}
                            >
                                Upload
                            </button>
                        </div>
                    </>
                )}
                {imageMethod === 'upload' && (
                    <div className="fabric-form__section-title">
                        Add Images by Uploading
                    </div>
                )}
                {imageMethod === 'links' && (
                    <div className="fabric-form__section-title">
                        Add Images by Adding Links
                    </div>
                )}
                {imageMethod !== 'none' && (
                    <div className="fabric-form__image-form">
                        {imageMethod === 'upload' ? (
                            <div className="fabric-form__image-upload-form">
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
                                                                    let newState =
                                                                        [
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
                                <div className="add-button-group">
                                    <i
                                        className="fas fa-plus-circle fa-2x"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            setImages((prevState) => {
                                                return [...prevState, {}];
                                            });
                                        }}
                                    ></i>{' '}
                                    Upload another file
                                </div>
                            </div>
                        ) : (
                            <div className="fabric-form__image-link-form">
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
                                                                    url: evt
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
                                <div className="add-button-group">
                                    <i
                                        className="fas fa-plus-circle fa-2x"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            setImages((prevState) => {
                                                return [...prevState, {}];
                                            });
                                        }}
                                    ></i>{' '}
                                    Add another link
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <div className="fabric-form__section-title">Notes</div>
                <textarea
                    className="fabric-form__notes"
                    value={fabric.notes}
                    onChange={(evt) => {
                        setFabric((prevState) => {
                            return { ...prevState, notes: evt.target.value };
                        });
                    }}
                    rows="10"
                ></textarea>
                <div className="form-buttons">
                    <button className="button" onClick={handleClickSave}>
                        Submit
                    </button>
                    <button className="button" onClick={handleClearForm}>
                        Clear Form
                    </button>
                </div>
            </div>
        </main>
    );
};
