import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FabricContext } from '../../providers/FabricProvider';
import { Slideshow } from '../Slideshow';

export const FabricDetails = () => {
    const [fabric, setFabric] = useState(null);
    const [editingStock, setEditingStock] = useState(false);
    const [updatedStock, setUpdatedStock] = useState(0);
    const [editingNotes, setEditingNotes] = useState(false);
    const [updatedNotes, setUpdatedNotes] = useState('');
    const { getFabricById, updateFabric, deleteFabric } = useContext(
        FabricContext
    );
    const { id } = useParams();
    const history = useHistory();

    const handleDelete = () => {
        if (
            window.confirm(
                'Are you sure you want to delete this fabric? It will also be removed from any projects.'
            )
        ) {
            deleteFabric(fabric.id).then(() => {
                history.push('/fabric');
            });
        }
    };

    const handleUpdateStock = () => {
        let newFabric = { ...fabric };
        newFabric.yardsInStock = updatedStock;
        updateFabric(newFabric).then(() => {
            getFabricById(id).then((parsed) => {
                setFabric(parsed);
                setEditingStock(false);
            });
        });
    };

    const handleUpdateNotes = () => {
        let newFabric = { ...fabric };
        newFabric.notes = updatedNotes;
        updateFabric(newFabric).then(() => {
            getFabricById(id).then((parsed) => {
                setFabric(parsed);
                setEditingNotes(false);
            });
        });
    };

    const editStockForm = () => {
        return (
            <div className="edit-stock-form">
                <label htmlFor="edit-stock-input">Yards in stock:</label>
                <input
                    className="edit-stock-input"
                    type="number"
                    value={updatedStock}
                    onChange={(evt) => {
                        setUpdatedStock(evt.target.value);
                    }}
                />
                <i className="fas fa-check" onClick={handleUpdateStock}></i>
                <i
                    className="fas fa-times"
                    onClick={() => {
                        setEditingStock(false);
                        setUpdatedStock(fabric.yardsInStock);
                    }}
                ></i>
            </div>
        );
    };

    useEffect(() => {
        if (id) {
            getFabricById(id).then(setFabric);
        }
    }, []);

    useEffect(() => {
        if (fabric) {
            setUpdatedStock(fabric.yardsInStock);
            setUpdatedNotes(fabric.notes);
        }
    }, [fabric]);

    if (!fabric) {
        return null;
    }

    return (
        <main className="fabric-details">
            <div className="fabric-details__top-row">
                <div className="fabric-details__top-row-title">
                    {fabric.name}
                </div>
                <div className="fabric-details__top-row-buttons">
                    <button className="button">Edit Fabric</button>
                    <button className="button" onClick={handleDelete}>
                        Delete Fabric
                    </button>
                </div>
            </div>
            <section className="fabric-details__body">
                <div className="fabric-details__image-container">
                    {fabric.images.length > 0 ? (
                        <Slideshow
                            images={fabric.images}
                            containerWidth={400}
                        />
                    ) : (
                        <img src="/assets/patternPlaceholder.png" />
                    )}
                </div>
                <div className="fabric-details__content">
                    <div className="fabric-details__properties">
                        <div className="fabric-details__property">
                            {editingStock ? (
                                editStockForm()
                            ) : (
                                <>
                                    Yards in stock: {fabric.yardsInStock}
                                    <i
                                        style={{ marginLeft: '1em' }}
                                        className="fas fa-pencil-alt cursorPointer edit-stock-button"
                                        onClick={() => setEditingStock(true)}
                                    ></i>
                                </>
                            )}
                        </div>
                        <div className="fabric-details__property">
                            Retailer: {fabric.retailer.name}
                        </div>
                        <div className="fabric-details__property">
                            Price per yard:{' '}
                            {`$${fabric.pricePerYard.toFixed(2)}`}
                        </div>
                        <div className="fabric-details__property">
                            Fabric type: {fabric.fabricType.name}
                        </div>
                        <div className="fabric-details__property">
                            {fabric.url ? (
                                <a
                                    href={fabric.url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Purchase Link
                                </a>
                            ) : null}
                        </div>
                    </div>
                    <div className="fabric-details__notes">
                        <div className="fabric-details__notes-top-row">
                            <div>Notes</div>
                            {!editingNotes && (
                                <i
                                    className="fas fa-pencil-alt cursorPointer"
                                    onClick={() => setEditingNotes(true)}
                                ></i>
                            )}
                        </div>
                        {editingNotes ? (
                            <div className="fabric-details__notes-form">
                                <textarea
                                    value={updatedNotes}
                                    onChange={(evt) =>
                                        setUpdatedNotes(evt.target.value)
                                    }
                                ></textarea>
                                <div className="fabric-details__notes-form-buttons">
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
                                            setUpdatedNotes(fabric.notes);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="fabric-details__notes-content">
                                {fabric.notes}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};
