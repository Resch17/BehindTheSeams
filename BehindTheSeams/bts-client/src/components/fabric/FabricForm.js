import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FabricImageContext } from '../../providers/FabricImageProvider';
import { FabricContext } from '../../providers/FabricProvider';
import { FabricTypeContext } from '../../providers/FabricTypeProvider';
import { FileContext } from '../../providers/FileProvider';
import { PatternContext } from '../../providers/PatternProvider';
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

    const handleImageUpload = (image, createdFabricId) => {
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
                    return { url: '..\\' + path, fabricId: createdFabricId };
                }
            });
    };

    const handleClickSave = () => {
        if (
            fabric.name.length < 1 ||
            fabric.retailerId < 1 ||
            fabric.fabricTypeId < 1
        ) {
            window.alert('Please fill out all required fields forms');
            return;
        }

        addFabric(fabric)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((createdFabric) => {
                if (imageMethod === 'upload') {
                    images.forEach((image) => {
                        handleImageUpload(
                            image,
                            createdFabric.id
                        ).then((fabricImage) => addFabricImage(fabricImage));
                    });
                } else if (imageMethod === 'links') {
                    images.forEach((image) => {
                        image.fabricId = createdFabric.id;
                        addFabricImage(image);
                    });
                }
                handleClearForm();
                history.push(`/fabric/${createdFabric.id}`);
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
                            retailers.map((r) => {
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
                        <input
                            type="number"
                            name="fabric-price"
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
                <div className="fabric-form__section-title">Add Images</div>
                {imageMethod === 'none' && (
                    <div className="fabric-form__form-subgroup">
                        <button
                            className="button"
                            onClick={() => setImageMethod('links')}
                        >
                            Links
                        </button>
                        <div className="fabric-form__image-button-text">OR</div>
                        <button
                            className="button"
                            onClick={() => setImageMethod('upload')}
                        >
                            Upload
                        </button>
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
                <div className="fabric-form__section-title">Notes</div>
                <textarea
                    className="fabric-form__notes"
                    value={fabric.notes}
                    onChange={(evt) => {
                        setFabric((prevState) => {
                            return { ...prevState, notes: evt.target.value };
                        });
                    }}
                ></textarea>
                <button className="button" onClick={handleClickSave}>
                    Submit
                </button>
                <button className="button" onClick={handleClearForm}>
                    Clear Form
                </button>
            </div>
        </main>
    );
};
