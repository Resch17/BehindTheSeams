import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FabricContext } from '../../providers/FabricProvider';
import { Slideshow } from '../Slideshow';

export const FabricDetails = () => {
    const [fabric, setFabric] = useState(null);
    const { getFabricById, deleteFabric } = useContext(FabricContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (id) {
            getFabricById(id).then(setFabric);
        }
    }, []);

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
                            Yards in stock: {fabric.yardsInStock}
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
                        </div>
                        <div className="fabric-details__notes-content">
                            {fabric.notes}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
