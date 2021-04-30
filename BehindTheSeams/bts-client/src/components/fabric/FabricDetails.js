import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FabricContext } from '../../providers/FabricProvider';

export const FabricDetails = () => {
    const [fabric, setFabric] = useState(null);
    const { getFabricById } = useContext(FabricContext);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getFabricById(id).then(setFabric);
        }
    }, []);

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
                    <button className="button">Delete Fabric</button>
                </div>
            </div>
            <section className="fabric-details__body">
                <div className="fabric-details__image-container">
                    {fabric.images.length > 0 ? (
                        <img src={fabric.images[0].url} />
                    ) : (
                        <img src="./patternPlaceholder.png" />
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
