import React, { useContext } from 'react';
import { FabricContext } from '../../providers/FabricProvider';

export const FabricCard = ({ fabric, modifying, setModifying }) => {
    const { deleteFabric, getAllFabric } = useContext(FabricContext);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this fabric?')) {
            deleteFabric(fabric.id)
                .then(getAllFabric)
                .then(() => {
                    setModifying(false);
                });
        }
    };

    return (
        <div className="fabric-card">
            <div
                className="fabric-card__top-row"
                style={
                    modifying
                        ? { justifyContent: 'space-between' }
                        : { justifyContent: 'center' }
                }
            >
                {modifying ? (
                    <div
                        className="fabric-card__delete-button"
                        onClick={handleDelete}
                    >
                        <i className="fas fa-trash fa-2x"></i>
                    </div>
                ) : null}
                <div className="fabric-card__title">{fabric.name}</div>
                {modifying ? (
                    <div className="fabric-card__edit-button">
                        <i className="fas fa-pencil-alt fa-2x"></i>
                    </div>
                ) : null}
            </div>
            <div className="fabric-card__body">
                <div className="fabric-card__image-container">
                    {fabric.images.length > 0 ? (
                        <img
                            className="fabric-card__image"
                            src={fabric.images[0].url}
                        />
                    ) : (
                        <img
                            className="fabric-card__image"
                            src="./patternPlaceholder.png"
                        />
                    )}
                </div>
                <div className="fabric-card__properties">
                    <div className="fabric-card__property">
                        Fabric type: {fabric.fabricType.name}
                    </div>
                    <div className="fabric-card__property">
                        Price/yd: {`$${fabric.pricePerYard.toFixed(2)}`}
                    </div>
                    <div className="fabric-card__property">
                        Yds in stock: {fabric.yardsInStock}
                    </div>
                    <div className="fabric-card__property">
                        <a
                            href={fabric.retailer.url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Retailer: {fabric.retailer.name}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
