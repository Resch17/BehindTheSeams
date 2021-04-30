import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FabricContext } from '../../providers/FabricProvider';

export const FabricCard = ({ fabric, modifying, setModifying }) => {
    const { deleteFabric, getAllFabric } = useContext(FabricContext);
    const history = useHistory();

    const handleDelete = () => {
        if (
            window.confirm(
                'Are you sure you want to delete this fabric? It will also be removed from any projects.'
            )
        ) {
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
                <div
                    className="fabric-card__title"
                    onClick={() => history.push(`/fabric/${fabric.id}`)}
                >
                    {fabric.name}
                </div>
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
                            onClick={() => history.push(`/fabric/${fabric.id}`)}
                            className="fabric-card__image"
                            src={fabric.images[0].url}
                        />
                    ) : (
                        <img
                            onClick={() => history.push(`/fabric/${fabric.id}`)}
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
                        {fabric.retailer.url !== '' ? (
                            <a
                                href={fabric.retailer.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Retailer: {fabric.retailer.name}
                            </a>
                        ) : (
                            `Retailer: ${fabric.retailer.name}`
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
