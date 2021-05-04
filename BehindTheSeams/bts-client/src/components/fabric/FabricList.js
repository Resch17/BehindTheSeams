import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FabricContext } from '../../providers/FabricProvider';
import '../../styles/Fabric.css';
import { FabricCard } from './FabricCard';

export const FabricList = () => {
    const { fabrics, setFabrics, getAllFabric } = useContext(FabricContext);
    const [modifying, setModifying] = useState(false);

    useEffect(() => {
        getAllFabric();
    }, []);

    if (fabrics.length < 1) {
        return null;
    }

    return (
        <main className="fabric">
            <div className="fabric__top-row">
                <h1>Fabric</h1>
                <button className="button">New Fabric</button>
                <button
                    className="button"
                    onClick={() => setModifying(!modifying)}
                >
                    Delete/Edit
                </button>
                <button className="button">Filter List</button>
            </div>
            <div className="fabric__fabric-list">
                {fabrics.map((f) => (
                    <FabricCard key={f.id} fabric={f} modifying={modifying} setModifying={setModifying} />
                ))}
            </div>
        </main>
    );
};
